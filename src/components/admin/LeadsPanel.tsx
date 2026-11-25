"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { getFirebaseClient } from "@/lib/firebase/client";
import type { Locale } from "@/i18n";
import type { Lead, LeadStatus } from "@/lib/leads";

const copy = {
  kk: { refresh: "Жаңарту", csv: "CSV жүктеу", empty: "Әзірге өтінім жоқ.", error: "Өтінімдерді жүктеу мүмкін болмады.", all: "Барлығы", product: "Өнім", event: "Іс-шара", new: "Жаңа", contacted: "Хабарласты", closed: "Жабық", confirmDelete: "Бұл өтінімді жоясыз ба?", target: "Неге", contact: "Байланыс", date: "Күні", status: "Күйі" },
  ru: { refresh: "Обновить", csv: "Скачать CSV", empty: "Заявок пока нет.", error: "Не удалось загрузить заявки.", all: "Все", product: "Продукт", event: "Событие", new: "Новая", contacted: "Связались", closed: "Закрыта", confirmDelete: "Удалить эту заявку?", target: "Куда", contact: "Контакты", date: "Дата", status: "Статус" },
  en: { refresh: "Refresh", csv: "Download CSV", empty: "No requests yet.", error: "Could not load requests.", all: "All", product: "Product", event: "Event", new: "New", contacted: "Contacted", closed: "Closed", confirmDelete: "Delete this request?", target: "For", contact: "Contact", date: "Date", status: "Status" },
} as const;

const statuses: LeadStatus[] = ["new", "contacted", "closed"];

function formatDate(lead: Lead, locale: Locale) {
  const date = lead.createdAt?.toDate();
  return date ? date.toLocaleString(locale === "en" ? "en-GB" : locale === "ru" ? "ru-RU" : "kk-KZ", { dateStyle: "short", timeStyle: "short" }) : "—";
}

function toCsv(rows: Lead[]) {
  const header = ["createdAt", "kind", "targetSlug", "targetTitle", "name", "phone", "email", "note", "locale", "status"];
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const lines = rows.map((row) => [row.createdAt?.toDate().toISOString() ?? "", row.kind, row.targetSlug, row.targetTitle, row.name, row.phone, row.email, row.note, row.locale, row.status].map(escape).join(","));
  return [header.join(","), ...lines].join("\n");
}

export function LeadsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | Lead["kind"]>("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setBusy(true); setError("");
    try {
      const { db } = getFirebaseClient();
      const snapshot = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
      setLeads(snapshot.docs.map((entry) => ({ ...entry.data(), id: entry.id }) as Lead));
    } catch { setError(t.error); } finally { setBusy(false); }
  }, [t.error]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function setStatus(id: string, status: LeadStatus) {
    setLeads((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    try { await updateDoc(doc(getFirebaseClient().db, "leads", id), { status }); }
    catch { setError(t.error); void load(); }
  }

  async function remove(id: string) {
    if (!window.confirm(t.confirmDelete)) return;
    try { await deleteDoc(doc(getFirebaseClient().db, "leads", id)); setLeads((rows) => rows.filter((row) => row.id !== id)); }
    catch { setError(t.error); }
  }

  function downloadCsv() {
    const blob = new Blob(["﻿" + toCsv(visible)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `aleuet-leads-${new Date().toISOString().slice(0, 10)}.csv`; link.click();
    URL.revokeObjectURL(url);
  }

  const visible = filter === "all" ? leads : leads.filter((lead) => lead.kind === filter);
  const newCount = leads.filter((lead) => lead.status === "new").length;

  return <section className="mt-5 rounded-2xl border border-[#e2e4d8] bg-white p-5 dark:border-[#2e3528] dark:bg-[#191c16]">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">{(["all", "product", "event"] as const).map((value) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${filter === value ? "bg-[#d8f06a] text-[#171914]" : "border border-[#e2e4d8] dark:border-[#394131]"}`}>{t[value]}{value === "all" && newCount > 0 ? ` · ${newCount} ${t.new.toLowerCase()}` : ""}</button>)}</div>
      <div className="flex gap-2">
        <button onClick={() => void load()} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full border border-[#d8dacb] px-3 py-1.5 text-xs font-bold disabled:opacity-50 dark:border-[#394131]"><RefreshCw className={`h-3.5 w-3.5 ${busy ? "animate-spin" : ""}`}/>{t.refresh}</button>
        <button onClick={downloadCsv} disabled={!visible.length} className="inline-flex items-center gap-1.5 rounded-full border border-[#d8dacb] px-3 py-1.5 text-xs font-bold disabled:opacity-50 dark:border-[#394131]"><Download className="h-3.5 w-3.5"/>{t.csv}</button>
      </div>
    </div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#a3241b]">{error}</p>}
    {!visible.length ? <p className="p-8 text-center text-sm text-[#71766a]">{busy ? "…" : t.empty}</p> : <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs uppercase text-[#71766a]"><tr><th className="py-2 pr-3">{t.date}</th><th className="py-2 pr-3">{t.target}</th><th className="py-2 pr-3">{t.contact}</th><th className="py-2 pr-3">{t.status}</th><th/></tr></thead>
        <tbody>{visible.map((lead) => <tr key={lead.id} className="border-t border-[#e2e4d8] align-top dark:border-[#2e3528]">
          <td className="py-3 pr-3 whitespace-nowrap text-xs text-[#5c6055] dark:text-[#9ea594]">{formatDate(lead, locale)}</td>
          <td className="py-3 pr-3"><span className="mr-1.5 rounded-full bg-[#f0f1e8] px-2 py-0.5 text-[10px] font-black uppercase dark:bg-[#292e24]">{t[lead.kind]}</span><span className="font-bold">{lead.targetTitle || lead.targetSlug}</span>{lead.note && <p className="mt-1 text-xs text-[#5c6055] dark:text-[#9ea594]">{lead.note}</p>}</td>
          <td className="py-3 pr-3"><p className="font-bold">{lead.name}</p><a href={`tel:${lead.phone}`} className="block text-xs underline">{lead.phone}</a>{lead.email && <a href={`mailto:${lead.email}`} className="block text-xs underline">{lead.email}</a>}</td>
          <td className="py-3 pr-3"><select value={lead.status} onChange={(event) => void setStatus(lead.id, event.target.value as LeadStatus)} className="rounded-lg border border-[#d8dacb] bg-white px-2 py-1 text-xs dark:border-[#394131] dark:bg-[#191c16]">{statuses.map((status) => <option key={status} value={status}>{t[status]}</option>)}</select></td>
          <td className="py-3 text-right"><button onClick={() => void remove(lead.id)} aria-label={t.confirmDelete} className="p-1 text-[#9b342a]"><Trash2 className="h-4 w-4"/></button></td>
        </tr>)}</tbody>
      </table>
    </div>}
  </section>;
}
