"use client";

import { addDoc, collection, serverTimestamp, type Timestamp } from "firebase/firestore";
import { getFirebaseClient } from "@/lib/firebase/client";
import type { Locale } from "@/i18n";

export type LeadKind = "product" | "event";
export type LeadStatus = "new" | "contacted" | "closed";

export interface LeadInput {
  kind: LeadKind;
  targetSlug: string;
  targetTitle: string;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  locale: Locale;
}

export interface Lead extends Required<Omit<LeadInput, "locale">> {
  id: string;
  locale: Locale;
  uid: string;
  status: LeadStatus;
  createdAt: Timestamp | null;
}

/** Field limits mirror `validLead()` in firestore.rules — change both together. */
export const LEAD_LIMITS = { name: 120, phone: 40, email: 200, note: 1000, targetTitle: 200 } as const;

/** Writes a product application or event registration to `leads`. Works for guests and signed-in users. */
export async function submitLead(input: LeadInput): Promise<void> {
  const { auth, db } = getFirebaseClient();
  const clip = (value: string | undefined, max: number) => (value ?? "").trim().slice(0, max);
  await addDoc(collection(db, "leads"), {
    kind: input.kind,
    targetSlug: clip(input.targetSlug, 120),
    targetTitle: clip(input.targetTitle, LEAD_LIMITS.targetTitle),
    name: clip(input.name, LEAD_LIMITS.name),
    phone: clip(input.phone, LEAD_LIMITS.phone),
    email: clip(input.email, LEAD_LIMITS.email),
    note: clip(input.note, LEAD_LIMITS.note),
    locale: input.locale,
    uid: auth.currentUser?.uid ?? "",
    status: "new",
    createdAt: serverTimestamp(),
  });
}
