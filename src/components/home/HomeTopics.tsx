"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { materials } from "@/data/materials";
import { topics } from "@/data/topics";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/providers/language-provider";

export function HomeTopics() {
  const { t, locale } = useLanguage();
  const mainMat = materials[0];

  return (
    <>
      {/* 2. DEMO LESSON */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-[2rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d8f06a] text-[#171914]">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <div>
              <Badge variant="lime" size="sm">{t.continueLearning.badge}</Badge>
              <h3 className="mt-1 text-xl font-black text-[#171914] dark:text-[#f2f4ec]">{mainMat.title}</h3>
              <p className="mt-0.5 text-xs text-[#5c6055] dark:text-[#9ea594]">{mainMat.subtitle}</p>
            </div>
          </div>
          <Button href={`/materials/${mainMat.slug}`} variant="primary" size="md" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
            {t.continueLearning.continueBtn}
          </Button>
        </div>
      </section>

      {/* 3. TOPICS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#71766a] dark:text-[#888e7f]">{t.topicsSection.badge}</p>
            <h2 className="mt-1 text-3xl font-black text-[#171914] dark:text-[#f2f4ec]">{t.topicsSection.title}</h2>
          </div>
          <Link href="/catalog" className="text-sm font-bold text-[#171914] dark:text-[#d8f06a] underline">
            {t.topicsSection.viewCatalog}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((item, idx) => {
            const title = (locale === "kk" ? item.titleKk : locale === "ru" ? item.titleRu : item.titleEn) || item.title;
            const desc = (locale === "kk" ? item.descriptionKk : locale === "ru" ? item.descriptionRu : item.descriptionEn) || item.description;
            return (
              <Link
                key={item.id}
                href={`/catalog?topic=${item.id}`}
                className={`${item.accentBg} dark:bg-[#1a2115] dark:border dark:border-[#2e3528] flex flex-col justify-between rounded-[2rem] p-6 transition-all hover:-translate-y-1`}
              >
                <div className="flex justify-between text-xs font-black text-[#171914] dark:text-[#d8f06a]">
                  <span>0{idx + 1}</span>
                  <span>{item.materialsCount} {t.topicsSection.materialsCount}</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-black text-[#171914] dark:text-[#f2f4ec]">{title}</h3>
                  <p className="mt-1.5 text-xs text-[#171914]/80 dark:text-[#9ea594]">{desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. RECOMMENDED */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#71766a] dark:text-[#888e7f]">{t.recommendedSection.badge}</p>
            <h2 className="mt-1 text-3xl font-black text-[#171914] dark:text-[#f2f4ec]">{t.recommendedSection.title}</h2>
          </div>
          <Link href="/catalog" className="text-sm font-bold underline">{t.recommendedSection.viewAll}</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.slice(0, 3).map((mat) => (
            <MaterialCard key={mat.id} material={mat} />
          ))}
        </div>
      </section>
    </>
  );
}
