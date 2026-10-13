"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { events } from "@/data/events";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/providers/language-provider";
import { EventRegistrationModal } from "@/components/events/EventRegistrationModal";

export function HomePromo() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const evt = events[0];
  const prod = products["research-accelerator"];

  return (
    <>
      {/* 5. PILOT EVENT */}
      {evt && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-[#1d211b] dark:bg-[#141712] border border-[#2e3528] text-white md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#a7dcff] dark:bg-[#0c2e42] p-7 text-[#171914] dark:text-[#d9efff] flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-[#171914] dark:bg-[#70c4ff] px-3 py-1 text-xs font-bold text-white dark:text-[#041f2e]">{t.pages.events.pilotBannerBadge}</span>
                <p className="mt-4 text-2xl font-black">{evt.date}</p>
                <p className="text-xs font-bold mt-1 opacity-80">{evt.city}</p>
              </div>
              <p className="mt-4 text-xs font-semibold">{t.pages.events.spotsLabel}: 40</p>
            </div>
            <div className="p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-white">{evt.title}</h3>
                <p className="mt-2 text-sm text-white/70">{evt.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button onClick={() => setIsOpen(true)} variant="accent" size="md">{t.pages.events.expressInterestBtn}</Button>
                <Link href="/events" className="text-xs font-bold text-white/80 underline">{t.nav.events}</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. PILOT PRODUCT */}
      {prod && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-[2.5rem] border-2 border-[#171914] dark:border-[#ffbe7a] bg-[#ffd6a5] dark:bg-[#2e1d0d] p-7 text-[#171914] dark:text-[#ffecd9] sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <Badge variant="default" size="sm">{prod.tag}</Badge>
              <h3 className="mt-3 text-2xl font-black sm:text-3xl">{prod.title}</h3>
              <p className="mt-2 text-sm opacity-90 max-w-xl">{prod.outcome}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="h-4 w-4 text-[#135924] dark:text-[#d8f06a]" />
                <span>{prod.pricing.price}</span>
              </div>
            </div>
            <Button href={`/products/${prod.slug}`} variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              {t.pages.events.detailsBtn}
            </Button>
          </div>
        </section>
      )}

      {evt && <EventRegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} eventTitle={evt.title} eventDate={evt.date} />}
    </>
  );
}
