"use client";

import React from "react";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function AboutSections() {
  const { t } = useLanguage();
  const d = t.aboutPage;

  return (
    <>
      {/* 5. BUSINESS MODEL */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div>
          <Badge variant="peach" size="sm">{d.businessModelTitle}</Badge>
          <h2 className="mt-2 text-2xl font-black text-[#171914] dark:text-[#f2f4ec] sm:text-3xl">
            {d.businessModelSubtitle}
          </h2>
          <p className="mt-1 text-xs text-[#71766a] dark:text-[#888e7f] italic">{d.businessModelDisclaimer}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[d.freeTier, d.paidTier, d.partnerTier].map((tier, idx) => (
            <div key={idx} className="rounded-[2rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-5">
              <h3 className="font-black text-sm text-[#171914] dark:text-[#f2f4ec]">{tier.title}</h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[#5c6055] dark:text-[#9ea594]">
                {tier.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d8f06a] mt-1 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TEAM */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2.5rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8">
          <Badge variant="default" size="sm">{d.teamTitle}</Badge>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#171914] dark:bg-[#d8f06a] text-lg font-black text-[#d8f06a] dark:text-[#171914]">
              ЕБ
            </div>
            <div>
              <h3 className="text-xl font-black text-[#171914] dark:text-[#f2f4ec]">{d.founderName}</h3>
              <p className="text-xs font-bold text-[#3e5000] dark:text-[#d8f06a] mt-0.5">{d.founderRole}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#5c6055] dark:text-[#9ea594]">{d.founderDesc}</p>
              <p className="mt-2 text-[11px] text-[#71766a] dark:text-[#7f8677] italic">{d.founderNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CREATIVE SHIFT */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2.5rem] border-2 border-[#171914] dark:border-[#d8f06a] bg-[#d8f06a]/15 dark:bg-[#1a2115] p-6 sm:p-8">
          <Badge variant="lime" size="sm">{d.creativeShiftTitle}</Badge>
          <blockquote className="mt-3 text-base sm:text-lg font-bold leading-relaxed text-[#171914] dark:text-[#f2f4ec]">
            {d.creativeShiftQuote}
          </blockquote>
          <p className="mt-3 text-xs font-bold text-[#3e5000] dark:text-[#d8f06a]">
            {d.creativeShiftTrack}
          </p>
        </div>
      </section>

      {/* 8. FACTS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2.5rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8">
          <Badge variant="default" size="sm">{d.factsTitle}</Badge>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {d.facts.map((fact, idx) => (
              <div key={idx} className="rounded-xl border border-[#eceee2] dark:border-[#282e23] bg-[#fbfbf9] dark:bg-[#141712] p-3 text-xs">
                <span className="font-semibold text-[#71766a] dark:text-[#888e7f] block">{fact.label}</span>
                <span className="font-black text-[#171914] dark:text-[#f2f4ec] mt-0.5 block">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACTS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2.5rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Badge variant="neutral" size="sm">{d.contactsTitle}</Badge>
            <h2 className="mt-1 text-lg font-black text-[#171914] dark:text-[#f2f4ec]">{d.contactsSubtitle}</h2>
            <p className="mt-1 text-xs text-[#5c6055] dark:text-[#9ea594]">{d.contactNotice}</p>
          </div>
          <Button href="/" variant="primary" size="md">
            {d.backHomeBtn}
          </Button>
        </div>
      </section>
    </>
  );
}
