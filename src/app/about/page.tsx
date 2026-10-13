"use client";

import React from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AboutSections } from "@/components/about/AboutSections";

export default function AboutPage() {
  const { t } = useLanguage();
  const d = t.aboutPage;

  return (
    <div className="space-y-12 pb-20 pt-6 sm:space-y-16 sm:pt-10">
      {/* 1. HERO */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <Badge variant="lime" size="sm" className="mb-4">
            <Sparkles className="h-3 w-3" />
            <span>{d.heroBadge}</span>
          </Badge>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#171914] dark:text-[#f2f4ec] sm:text-6xl">
            {d.heroTitle}
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#5c6055] dark:text-[#9ea594]">
            {d.heroText}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href="/materials/research-question-formulation"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              {t.hero.demoTrackBtn}
            </Button>
            <Button href="/catalog" variant="outline" size="lg">
              {t.nav.catalog}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. AUDIENCE */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div>
          <Badge variant="default" size="sm">{d.audienceTitle}</Badge>
          <h2 className="mt-2 text-2xl font-black text-[#171914] dark:text-[#f2f4ec] sm:text-3xl">
            {d.audienceSubtitle}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {d.audienceItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[2rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 shadow-2xs"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8f06a] text-[#171914] font-black text-xs">
                0{idx + 1}
              </span>
              <h3 className="mt-3 font-black text-base text-[#171914] dark:text-[#f2f4ec]">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5c6055] dark:text-[#9ea594]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div>
          <Badge variant="default" size="sm">{d.howItWorksTitle}</Badge>
          <h2 className="mt-2 text-2xl font-black text-[#171914] dark:text-[#f2f4ec] sm:text-3xl">
            {d.howItWorksSubtitle}
          </h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {d.steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#e2e4d8] dark:border-[#2e3528] bg-[#fbfbf9] dark:bg-[#151813] p-4"
            >
              <span className="text-xs font-black text-[#3e5000] dark:text-[#d8f06a]">{step.number}</span>
              <h3 className="mt-1.5 font-black text-sm text-[#171914] dark:text-[#f2f4ec]">{step.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#5c6055] dark:text-[#9ea594]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURRENT STAGE */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2.5rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8">
          <Badge variant="sky" size="sm">{d.currentStageTitle}</Badge>
          <h2 className="mt-2 text-2xl font-black text-[#171914] dark:text-[#f2f4ec] sm:text-3xl">
            {d.currentStageSubtitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {d.stageItems.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-[#f7f7f2] dark:bg-[#20251c] p-4 text-xs">
                <h3 className="font-black text-sm text-[#171914] dark:text-[#f2f4ec] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3e5000] dark:text-[#d8f06a] shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="mt-1 text-[#5c6055] dark:text-[#9ea594] pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSections />
    </div>
  );
}
