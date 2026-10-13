"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Flame, Play } from "lucide-react";
import { materials } from "@/data/materials";
import { getUserProfile } from "@/data/user";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/providers/language-provider";

export function HomeHero() {
  const { t, isDemoMode, setIsDemoMode } = useLanguage();
  const user = getUserProfile(isDemoMode);
  const mainDemoMaterial = materials[0];

  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f06a] dark:bg-[#d8f06a] px-3.5 py-1 text-xs font-black uppercase text-[#2c3a00]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.hero.badge}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight text-[#171914] dark:text-[#f2f4ec] sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-[#5c6055] dark:text-[#9ea594] sm:text-lg leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={`/materials/${mainDemoMaterial.slug}`}
              size="lg"
              variant="primary"
              icon={<Play className="h-4 w-4 fill-current" />}
            >
              {t.hero.demoTrackBtn}
            </Button>
            <Button href="/about" size="lg" variant="outline">
              {t.hero.aboutBtn}
            </Button>
          </div>
        </div>

        <aside className="rounded-[2.25rem] bg-[#d8f06a] dark:bg-[#1a2315] border border-transparent dark:border-[#d8f06a]/30 p-6 text-[#171914] dark:text-[#f2f4ec] shadow-sm sm:p-8 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#3e5000] dark:text-[#d8f06a]">
              {t.potential.title}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-white/70 dark:bg-black/30 px-2.5 py-1 text-xs font-black text-[#d96500] dark:text-[#ffbe7a]">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{user.streakDays} {t.common.days}</span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <div>
              <span className="text-5xl font-black tracking-tight sm:text-6xl">{user.currentXP}</span>
              <span className="ml-2 text-sm font-bold text-[#3e5000] dark:text-[#d8f06a]">XP</span>
            </div>
            <span className="text-xs font-bold text-[#3e5000] dark:text-[#d8f06a]">
              {user.level} {t.common.level}: {user.levelTitle}
            </span>
          </div>

          <div className="mt-4">
            <ProgressBar value={user.currentXP} max={user.nextLevelXP} size="md" color="dark" />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#3e5000] dark:text-[#c7cebe]">
            <span>
              {t.potential.nextLevelTo}: {user.nextLevelXP - user.currentXP} XP
            </span>
            <Link href="/profile" className="font-bold underline hover:text-[#171914] dark:hover:text-white">
              {t.potential.profileLink}
            </Link>
          </div>

          <div className="mt-5 border-t border-black/10 dark:border-white/10 pt-3 flex items-center justify-between text-[11px]">
            <span className="text-[#5c6055] dark:text-[#888e7f] italic">{t.potential.demoDisclaimer}</span>
            <button
              type="button"
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="font-bold underline text-[#171914] dark:text-[#d8f06a]"
            >
              {isDemoMode ? t.common.guestModeToggle : t.potential.guestAction}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
