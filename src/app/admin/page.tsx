"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getIdTokenResult } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import { LoaderCircle, ShieldCheck, ShieldX, Plus, Save, Trash2, Upload } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { useLanguage } from "@/providers/language-provider";
import { getFirebaseClient } from "@/lib/firebase/client";
import { materials as initialMaterials } from "@/data/materials";
import { events as initialEvents } from "@/data/events";
import type { EventItem, Material } from "@/types";

type Kind = "materials" | "events";
type Entry = (Material | EventItem) & { publicationStatus: "draft" | "published" };

async function ensureStarterContent(db: ReturnType<typeof getFirebaseClient>["db"]) {
  const batch = writeBatch(db);
  for (const [name, rows] of [["materials", initialMaterials], ["events", initialEvents]] as const) {
    const meta = await getDoc(doc(db, "contentMeta", name));
    if (meta.exists()) continue;
    const existing = await getDocs(collection(db, name));
    const existingIds = new Set(existing.docs.map((item) => item.id));
    for (const row of rows) if (!existingIds.has(row.slug)) batch.set(doc(db, name, row.slug), { ...row, publicationStatus: "published", createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    batch.set(doc(db, "contentMeta", name), { initialized: true, updatedAt: serverTimestamp() });
  }
  await batch.commit();
}

const copy = {
  kk: { title: "Әкімші бөлімі", loading: "Рөл тексерілуде…", denied: "Бұл бөлім тек әкімші аккаунттарына арналған.", back: "Профильге қайту", signIn: "Әкімші аккаунтымен кіріңіз.", materials: "Материалдар", events: "Іс-шаралар", add: "Жаңа қосу", seed: "Бастапқы деректерді көшіру", seedDone: "Дайын материалдар мен іс-шаралар Firestore-ға көшірілді.", titleField: "Атауы", desc: "Қысқаша сипаттама", slug: "Сілтеме атауы (slug)", status: "Жариялау күйі", draft: "Жоба", published: "Жарияланған", save: "Сақтау", saved: "Сақталды", remove: "Жою", error: "Әрекетті орындау мүмкін болмады. Қайта кіріп көріңіз.", empty: "Әзірге жазба жоқ.", confirmDelete: "Бұл жазбаны жоясыз ба?", intro: "Контентті басқарыңыз. Жарияланған жазбалар сайтта көрінеді.", loadingData: "Контент жүктелуде…" },
  ru: { title: "Раздел администратора", loading: "Проверяем роль…", denied: "Этот раздел доступен только администраторам.", back: "Вернуться в профиль", signIn: "Войдите под аккаунтом администратора.", materials: "Материалы", events: "События", add: "Добавить", seed: "Импортировать исходный контент", seedDone: "Материалы и события перенесены в Firestore.", titleField: "Название", desc: "Краткое описание", slug: "Адрес (slug)", status: "Статус публикации", draft: "Черновик", published: "Опубликовано", save: "Сохранить", saved: "Сохранено", remove: "Удалить", error: "Не удалось выполнить действие. Проверьте вход и повторите.", empty: "Записей пока нет.", confirmDelete: "Удалить эту запись?", intro: "Управляйте контентом. Опубликованные записи видны на сайте.", loadingData: "Загружаем контент…" },
  en: { title: "Admin area", loading: "Checking role…", denied: "This area is restricted to administrators.", back: "Back to profile", signIn: "Sign in with an administrator account.", materials: "Materials", events: "Events", add: "Add new", seed: "Import starter content", seedDone: "Starter materials and events were copied to Firestore.", titleField: "Title", desc: "Short description", slug: "URL slug", status: "Publication status", draft: "Draft", published: "Published", save: "Save", saved: "Saved", remove: "Delete", error: "Could not complete the action. Check your sign-in and retry.", empty: "No entries yet.", confirmDelete: "Delete this entry?", intro: "Manage content. Published entries are visible on the site.", loadingData: "Loading content…" },
} as const;

function starter(kind: Kind, slug: string): Entry {
  if (kind === "materials") {
    return { ...(initialMaterials[0] as Material), id: slug, slug, title: "", subtitle: "", summary: "", topicId: "research", learningOutcomes: [], resources: [], video: { durationSeconds: 0, chapters: [] }, status: "not_started", progressPercent: 0, xpReward: 0, publicationStatus: "draft" };
  }
  return { ...(initialEvents[0] as EventItem), id: slug, slug, title: "", description: "", date: "", dateDay: "—", dateMonth: "", time: "", program: [], publicationStatus: "draft" };
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { locale } = useLanguage();
  const router = useRouter();
  const t = copy[locale];
  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [kind, setKind] = useState<Kind>("materials");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    getIdTokenResult(user, true).then((token) => { if (!cancelled) setAdmin(token.claims.role === "admin"); }).catch(() => { if (!cancelled) setAdmin(false); }).finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [loading, router, user]);

  const load = useCallback(async () => {
    if (!admin) return;
    setBusy(true); setError("");
    try {
      const { db } = getFirebaseClient();
      const snapshot = await getDocs(collection(db, kind));
      const rows = snapshot.docs.map((item) => ({ ...item.data(), slug: item.id } as Entry)).sort((a, b) => a.title.localeCompare(b.title));
      setEntries(rows);
      setSelected((current) => rows.some((row) => row.slug === current) ? current : rows[0]?.slug ?? "");
    } catch { setError(t.error); } finally { setBusy(false); }
  }, [admin, kind, t.error]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function importStarterContent() {
    setBusy(true); setError("");
    try {
      const { db } = getFirebaseClient();
      await ensureStarterContent(db); setNotice(t.seedDone); await load();
    } catch { setError(t.error); } finally { setBusy(false); }
  }

  function newEntry() {
    const slug = `new-${Date.now().toString(36)}`;
    setEntries((rows) => [starter(kind, slug), ...rows]); setSelected(slug); setNotice("");
  }

  async function saveEntry() {
    const row = entries.find((entry) => entry.slug === selected);
    if (!row || !user) return;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || !row.title.trim()) { setError(t.error); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const { db } = getFirebaseClient();
      await ensureStarterContent(db);
      const reference = doc(db, kind, row.slug);
      const previous = await getDoc(reference);
      const { publicationStatus, ...content } = row;
      await setDoc(reference, { ...content, publicationStatus, updatedAt: serverTimestamp(), updatedBy: user.uid, ...(!previous.exists() ? { createdAt: serverTimestamp(), createdBy: user.uid } : {}) });
      await setDoc(doc(db, "contentMeta", kind), { initialized: true, updatedAt: serverTimestamp() }, { merge: true });
      setNotice(t.saved); await load();
    } catch { setError(t.error); } finally { setBusy(false); }
  }

  async function removeEntry() {
    if (!selected || !window.confirm(t.confirmDelete)) return;
    setBusy(true); setError("");
    try { const { db } = getFirebaseClient(); await deleteDoc(doc(db, kind, selected)); setSelected(""); setNotice(""); await load(); }
    catch { setError(t.error); } finally { setBusy(false); }
  }

  function updateField(field: "title" | "subtitle" | "summary" | "description" | "date" | "time" | "city" | "venue", value: string) {
    setEntries((rows) => rows.map((row) => row.slug === selected ? { ...row, [field]: value } as Entry : row));
  }

  if (loading || (user && checking)) return <div className="flex min-h-[55vh] items-center justify-center"><LoaderCircle className="h-7 w-7 animate-spin"/></div>;
  if (!user || !admin) return <main className="mx-auto flex min-h-[55vh] max-w-4xl items-center justify-center px-5"><section className="w-full max-w-xl rounded-3xl border border-[#e2e4d8] bg-white p-8 text-center dark:border-[#2e3528] dark:bg-[#191c16]"><ShieldX className="mx-auto h-10 w-10 text-[#9b342a]"/><h1 className="mt-4 text-2xl font-black">{t.title}</h1><p className="mt-3 text-sm text-[#5c6055] dark:text-[#9ea594]">{!user ? t.signIn : t.denied}</p><Link href="/profile" className="mt-6 inline-flex rounded-full bg-[#171914] px-5 py-3 text-sm font-bold text-white">{t.back}</Link></section></main>;

  const active = entries.find((entry) => entry.slug === selected);
  const isMaterial = kind === "materials";
  return <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-[#5e740b]"><ShieldCheck className="h-5 w-5"/><span className="text-xs font-black uppercase">Aleuet</span></div><h1 className="mt-2 text-3xl font-black">{t.title}</h1><p className="mt-1 text-sm text-[#5c6055] dark:text-[#9ea594]">{t.intro}</p></div><button onClick={importStarterContent} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-[#d8dacb] px-4 py-2 text-sm font-bold disabled:opacity-50"><Upload className="h-4 w-4"/>{t.seed}</button></header>
    <div className="mt-6 flex gap-2">{(["materials", "events"] as const).map((tab) => <button key={tab} onClick={() => { setKind(tab); setSelected(""); setNotice(""); }} className={`rounded-full px-4 py-2 text-sm font-bold ${kind === tab ? "bg-[#171914] text-white" : "border border-[#e2e4d8] bg-white dark:bg-[#191c16]"}`}>{t[tab]}</button>)}</div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#a3241b]">{error}</p>}{notice && <p role="status" className="mt-4 rounded-xl bg-[#eff5d8] p-3 text-sm font-bold text-[#4d6300]">{notice}</p>}
    <div className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
      <aside className="rounded-2xl border border-[#e2e4d8] bg-white p-3 dark:border-[#2e3528] dark:bg-[#191c16]"><button onClick={newEntry} className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d8f06a] px-4 py-3 text-sm font-black text-[#171914]"><Plus className="h-4 w-4"/>{t.add}</button>{busy && !entries.length ? <p className="p-3 text-sm">{t.loadingData}</p> : entries.length ? entries.map((row) => <button key={row.slug} onClick={() => { setSelected(row.slug); setNotice(""); }} className={`mb-1 block w-full rounded-xl px-3 py-3 text-left ${row.slug === selected ? "bg-[#f0f1e8] dark:bg-[#292e24]" : "hover:bg-[#f7f7f2] dark:hover:bg-[#23271f]"}`}><span className="block truncate text-sm font-bold">{row.title || row.slug}</span><span className="mt-1 block text-xs text-[#71766a]">{row.publicationStatus === "published" ? t.published : t.draft}</span></button>) : <p className="p-3 text-sm text-[#71766a]">{t.empty}</p>}</aside>
      <section className="rounded-2xl border border-[#e2e4d8] bg-white p-5 dark:border-[#2e3528] dark:bg-[#191c16]">{active ? <div className="space-y-4">
        <label className="block text-sm font-bold">{t.titleField}<input maxLength={180} value={active.title} onChange={(event) => updateField("title", event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal dark:border-[#394131]"/></label>
        <label className="block text-sm font-bold">{t.slug}<input readOnly value={active.slug} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-[#f7f7f2] px-4 py-3 font-mono text-sm font-normal dark:border-[#394131] dark:bg-[#11130f]"/></label>
        <label className="block text-sm font-bold">{t.desc}<textarea maxLength={5000} rows={5} value={isMaterial ? (active as Material).summary : (active as EventItem).description} onChange={(event) => updateField(isMaterial ? "summary" : "description", event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal dark:border-[#394131]"/></label>
        {isMaterial && <label className="block text-sm font-bold">Подзаголовок<input maxLength={300} value={(active as Material).subtitle} onChange={(event) => updateField("subtitle", event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal dark:border-[#394131]"/></label>}
        {!isMaterial && <div className="grid gap-4 sm:grid-cols-2">{(["date", "time", "city", "venue"] as const).map((field) => <label key={field} className="block text-sm font-bold">{{ date: "Күні / дата", time: "Уақыты / время", city: "Қала / город", venue: "Өтетін орны / место" }[field]}<input maxLength={180} value={(active as EventItem)[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-transparent px-4 py-3 font-normal dark:border-[#394131]"/></label>)}</div>}
        <label className="block text-sm font-bold">{t.status}<select value={active.publicationStatus} onChange={(event) => setEntries((rows) => rows.map((row) => row.slug === selected ? { ...row, publicationStatus: event.target.value as Entry["publicationStatus"] } : row))} className="mt-1.5 w-full rounded-xl border border-[#d8dacb] bg-white px-4 py-3 dark:border-[#394131] dark:bg-[#191c16]"><option value="draft">{t.draft}</option><option value="published">{t.published}</option></select></label>
        <div className="flex flex-wrap justify-between gap-3 border-t border-[#e2e4d8] pt-4 dark:border-[#2e3528]"><button onClick={removeEntry} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-[#ecc7c2] px-4 py-2 text-sm font-bold text-[#9b342a] disabled:opacity-50"><Trash2 className="h-4 w-4"/>{t.remove}</button><button onClick={saveEntry} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-[#171914] px-5 py-2 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4"/>{busy ? "…" : t.save}</button></div>
      </div> : <p className="p-8 text-center text-sm text-[#71766a]">{t.empty}</p>}</section>
    </div>
  </main>;
}
