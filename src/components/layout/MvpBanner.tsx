"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export function MvpBanner() {
  const { t, isDemoMode, setIsDemoMode } = useLanguage();

  return (
    <aside
      aria-label="MVP status banner"
      className="border-b border-[#e2e4d8] dark:border-[#2e3528] bg-[#f0f1e8]/90 dark:bg-[#1a1e17]/90 px-4 py-2 text-xs transition-colors"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#d8f06a] dark:bg-[#d8f06a] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#2c3a00]">
            <Sparkles className="h-3 w-3" />
            {t.common.mvpBannerBadge}
          </span>
          <span className="text-[#5c6055] dark:text-[#a0a897] font-medium text-[11.5px]">
            {t.common.mvpBannerText}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="rounded-full border border-[#c9cbbf] dark:border-[#384132] bg-white dark:bg-[#232820] px-2.5 py-0.5 text-[11px] font-bold text-[#171914] dark:text-[#f2f4ec] hover:border-[#171914] dark:hover:border-[#d8f06a] transition-colors"
          >
            {isDemoMode ? t.common.guestModeToggle : t.common.demoModeToggle}
          </button>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 font-bold text-[#171914] dark:text-[#d8f06a] hover:underline"
          >
            <span>{t.nav.about}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
