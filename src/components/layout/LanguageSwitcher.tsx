"use client";

import React from "react";
import { useLanguage } from "@/providers/language-provider";
import { supportedLocales, Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Тіл таңдау / Выбор языка / Select language"
      className={cn(
        "inline-flex items-center rounded-full border border-[#d8dacb] dark:border-[#2e3528] bg-white/80 dark:bg-[#191c16]/80 p-0.5 text-xs font-black shadow-2xs backdrop-blur-xs",
        className
      )}
    >
      {supportedLocales.map((item) => {
        const isActive = locale === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code as Locale)}
            aria-pressed={isActive}
            aria-label={`${item.fullLabel} тіліне ауыстыру`}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] dark:focus-visible:ring-[#d8f06a]",
              isActive
                ? "bg-[#171914] dark:bg-[#d8f06a] text-white dark:text-[#171914] shadow-xs"
                : "text-[#5c6055] dark:text-[#9ea594] hover:text-[#171914] dark:hover:text-[#f2f4ec] hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
