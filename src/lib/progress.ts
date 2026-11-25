"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, onSnapshot, runTransaction, serverTimestamp, setDoc, writeBatch, type Timestamp } from "firebase/firestore";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";
import { useAuth } from "@/providers/auth-provider";
import type { MaterialStatus } from "@/types";

/**
 * Learning progress. Signed-in users: `users/{uid}/progress/{materialSlug}` and the XP ledger
 * `users/{uid}/xp/{entryId}`. Guests: the same shapes in localStorage, moved to Firestore on sign-in.
 * Field sets mirror `validProgress()` / `validXp()` in firestore.rules — change both together.
 */
export interface MaterialProgress {
  materialSlug: string;
  status: MaterialStatus;
  positionSeconds: number;
  durationSeconds: number;
  watched: boolean;
  /** Best score in percent; -1 when the test was never taken. */
  assessmentScore: number;
  assessmentPassed: boolean;
}

export interface XpEntry {
  id: string;
  amount: number;
  reason: "assessment";
  materialSlug: string;
  createdAt?: Timestamp | null;
}

export const MAX_XP_PER_ENTRY = 1000;
const GUEST_PROGRESS_KEY = "aleuet_guest_progress";
const GUEST_XP_KEY = "aleuet_guest_xp";
const GUEST_EVENT = "aleuet-guest-progress";
const WRITE_INTERVAL_MS = 15000;

export function emptyProgress(materialSlug: string): MaterialProgress {
  return { materialSlug, status: "not_started", positionSeconds: 0, durationSeconds: 0, watched: false, assessmentScore: -1, assessmentPassed: false };
}

function deriveStatus(progress: MaterialProgress): MaterialStatus {
  if (progress.assessmentPassed) return "completed";
  if (progress.watched || progress.positionSeconds > 0 || progress.assessmentScore >= 0) return "in_progress";
  return "not_started";
}

function clean(progress: MaterialProgress): MaterialProgress {
  const next: MaterialProgress = {
    materialSlug: progress.materialSlug,
    positionSeconds: Math.max(0, Math.min(86400, Math.round(progress.positionSeconds))),
    durationSeconds: Math.max(0, Math.min(86400, Math.round(progress.durationSeconds))),
    watched: progress.watched,
    assessmentScore: Math.max(-1, Math.min(100, Math.round(progress.assessmentScore))),
    assessmentPassed: progress.assessmentPassed,
    status: "not_started",
  };
  return { ...next, status: deriveStatus(next) };
}

export const xpEntryId = (reason: XpEntry["reason"], materialSlug: string) => `${reason}-${materialSlug}`;

// ---------- guest storage ----------

function readGuest<T>(key: string): Record<string, T> {
  try { return JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, T>; } catch { return {}; }
}
function writeGuest<T>(key: string, value: Record<string, T>) {
  try { localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new Event(GUEST_EVENT)); } catch { /* storage unavailable: progress is kept for this page only */ }
}

// ---------- writes ----------

async function writeProgress(uid: string | null, progress: MaterialProgress) {
  const value = clean(progress);
  if (!uid) {
    writeGuest(GUEST_PROGRESS_KEY, { ...readGuest<MaterialProgress>(GUEST_PROGRESS_KEY), [value.materialSlug]: value });
    return;
  }
  const { db } = getFirebaseClient();
  await setDoc(doc(db, "users", uid, "progress", value.materialSlug), { ...value, updatedAt: serverTimestamp() });
}

/** Grants XP once per entry id. Returns true if this call granted it. */
export async function awardXp(uid: string | null, entry: Omit<XpEntry, "createdAt">): Promise<boolean> {
  const amount = Math.max(0, Math.min(MAX_XP_PER_ENTRY, Math.round(entry.amount)));
  if (!uid) {
    const ledger = readGuest<XpEntry>(GUEST_XP_KEY);
    if (ledger[entry.id]) return false;
    writeGuest(GUEST_XP_KEY, { ...ledger, [entry.id]: { ...entry, amount } });
    return true;
  }
  const { db } = getFirebaseClient();
  const reference = doc(db, "users", uid, "xp", entry.id);
  return runTransaction(db, async (transaction) => {
    if ((await transaction.get(reference)).exists()) return false;
    transaction.set(reference, { amount, reason: entry.reason, materialSlug: entry.materialSlug, createdAt: serverTimestamp() });
    return true;
  });
}

/** Moves guest progress and XP into the signed-in account. Existing account data wins. */
export async function migrateGuestProgress(uid: string) {
  const progress = readGuest<MaterialProgress>(GUEST_PROGRESS_KEY);
  const xp = readGuest<XpEntry>(GUEST_XP_KEY);
  if (!Object.keys(progress).length && !Object.keys(xp).length) return;
  const { db } = getFirebaseClient();
  const batch = writeBatch(db);
  for (const item of Object.values(progress)) {
    const reference = doc(db, "users", uid, "progress", item.materialSlug);
    if (!(await getDoc(reference)).exists()) batch.set(reference, { ...clean(item), updatedAt: serverTimestamp() });
  }
  for (const [id, item] of Object.entries(xp)) {
    const reference = doc(db, "users", uid, "xp", id);
    if (!(await getDoc(reference)).exists()) batch.set(reference, { amount: Math.min(MAX_XP_PER_ENTRY, item.amount), reason: item.reason, materialSlug: item.materialSlug, createdAt: serverTimestamp() });
  }
  await batch.commit();
  try { localStorage.removeItem(GUEST_PROGRESS_KEY); localStorage.removeItem(GUEST_XP_KEY); } catch { /* ignore */ }
}

// ---------- hooks ----------

/** Progress for one material, with throttled position saving. */
export function useMaterialProgress(materialSlug: string) {
  const { user, loading } = useAuth();
  const uid = user?.uid ?? null;
  const [progress, setProgress] = useState<MaterialProgress>(() => emptyProgress(materialSlug));
  const [ready, setReady] = useState(false);
  const latest = useRef(progress);
  const lastWrite = useRef(0);

  const apply = useCallback((next: MaterialProgress) => { latest.current = next; setProgress(next); }, []);

  useEffect(() => {
    if (loading) return;
    lastWrite.current = 0;
    if (!uid || !isFirebaseConfigured) {
      const sync = () => { apply(readGuest<MaterialProgress>(GUEST_PROGRESS_KEY)[materialSlug] ?? emptyProgress(materialSlug)); setReady(true); };
      sync();
      window.addEventListener(GUEST_EVENT, sync);
      return () => window.removeEventListener(GUEST_EVENT, sync);
    }
    const { db } = getFirebaseClient();
    return onSnapshot(doc(db, "users", uid, "progress", materialSlug), (snapshot) => {
      apply(snapshot.exists() ? clean({ ...emptyProgress(materialSlug), ...(snapshot.data() as Partial<MaterialProgress>), materialSlug }) : emptyProgress(materialSlug));
      setReady(true);
    }, () => setReady(true));
  }, [apply, loading, materialSlug, uid]);

  const update = useCallback(async (change: Partial<MaterialProgress>, force: boolean) => {
    const next = clean({ ...latest.current, ...change, materialSlug });
    apply(next);
    const now = Date.now();
    if (!force && now - lastWrite.current < WRITE_INTERVAL_MS) return;
    lastWrite.current = now;
    try { await writeProgress(uid, next); } catch { lastWrite.current = 0; }
  }, [apply, materialSlug, uid]);

  const savePosition = useCallback((positionSeconds: number, durationSeconds: number) => {
    const nearEnd = durationSeconds > 0 && durationSeconds - positionSeconds < 10;
    return update({ positionSeconds: nearEnd ? 0 : positionSeconds, durationSeconds }, false);
  }, [update]);

  const markWatched = useCallback(() => update({ watched: true }, true), [update]);

  /** Saves the test result (best score wins) and grants XP once on the first pass. */
  const recordAssessment = useCallback(async (scorePercent: number, passed: boolean, xpReward: number) => {
    const current = latest.current;
    await update({ assessmentScore: Math.max(current.assessmentScore, scorePercent), assessmentPassed: current.assessmentPassed || passed }, true);
    if (!passed) return false;
    try { return await awardXp(uid, { id: xpEntryId("assessment", materialSlug), amount: xpReward, reason: "assessment", materialSlug }); }
    catch { return false; }
  }, [materialSlug, uid, update]);

  return { progress, ready: ready && !loading, signedIn: Boolean(uid), savePosition, markWatched, recordAssessment };
}

/** All progress records and the XP ledger of the current learner. */
export function useLearnerProgress() {
  const { user, loading } = useAuth();
  const uid = user?.uid ?? null;
  const [progress, setProgress] = useState<MaterialProgress[]>([]);
  const [xp, setXp] = useState<XpEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!uid || !isFirebaseConfigured) {
      const sync = () => {
        setProgress(Object.values(readGuest<MaterialProgress>(GUEST_PROGRESS_KEY)).map(clean));
        setXp(Object.entries(readGuest<XpEntry>(GUEST_XP_KEY)).map(([id, entry]) => ({ ...entry, id })));
        setReady(true);
      };
      sync();
      window.addEventListener(GUEST_EVENT, sync);
      return () => window.removeEventListener(GUEST_EVENT, sync);
    }
    const { db } = getFirebaseClient();
    let pending = 2;
    const done = () => { pending -= 1; if (pending <= 0) setReady(true); };
    const stopProgress = onSnapshot(collection(db, "users", uid, "progress"), (snapshot) => {
      setProgress(snapshot.docs.map((entry) => clean({ ...emptyProgress(entry.id), ...(entry.data() as Partial<MaterialProgress>), materialSlug: entry.id })));
      done();
    }, done);
    const stopXp = onSnapshot(collection(db, "users", uid, "xp"), (snapshot) => {
      setXp(snapshot.docs.map((entry) => ({ ...(entry.data() as Omit<XpEntry, "id">), id: entry.id })));
      done();
    }, done);
    return () => { stopProgress(); stopXp(); };
  }, [loading, uid]);

  const totalXp = xp.reduce((sum, entry) => sum + entry.amount, 0);
  return { progress, xp, totalXp, ready: ready && !loading, signedIn: Boolean(uid) };
}

/** Overlays the learner's real progress on catalog materials (status and percent shown on cards). */
export function withProgress<T extends { slug: string; status: MaterialStatus; progressPercent: number }>(items: T[], progress: MaterialProgress[]): T[] {
  const bySlug = new Map(progress.map((entry) => [entry.materialSlug, entry]));
  return items.map((item) => {
    const entry = bySlug.get(item.slug);
    if (!entry) return { ...item, status: "not_started", progressPercent: 0 };
    const watchedPercent = entry.watched ? 100 : entry.durationSeconds ? Math.round((entry.positionSeconds / entry.durationSeconds) * 100) : 0;
    return { ...item, status: entry.status, progressPercent: entry.status === "completed" ? 100 : Math.min(99, watchedPercent) };
  });
}
