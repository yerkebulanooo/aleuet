"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

/** Static content remains available until the one-time Firestore import is complete. */
export function usePublishedContent<T extends { slug: string }>(name: "materials" | "events", fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isFirebaseConfigured) { queueMicrotask(() => setReady(true)); return; }
    const { db } = getFirebaseClient();
    let initialized = false;
    let stopItems: (() => void) | undefined;
    const stopMeta = onSnapshot(doc(db, "contentMeta", name), (meta) => {
      if (!meta.exists() || meta.data().initialized !== true) { setItems(fallback); setReady(true); return; }
      initialized = true;
      stopItems?.();
      stopItems = onSnapshot(query(collection(db, name), where("publicationStatus", "==", "published")), (snapshot) => {
        setItems(snapshot.docs.map((entry) => ({ ...entry.data(), id: entry.id, slug: entry.id }) as unknown as T));
        setReady(true);
      }, () => { if (!initialized) setItems(fallback); });
    }, () => { if (!initialized) setItems(fallback); setReady(true); });
    return () => { stopMeta(); stopItems?.(); };
  }, [fallback, name]);
  return { items, ready };
}
