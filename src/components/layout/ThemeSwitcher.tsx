"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex h-8 w-24 items-center justify-center rounded-full border border-[#d8dacb] dark:border-[#2e3528] bg-white/60 dark:bg-[#191c16]/60 text-xs",
          className
        )}
      >
        <span className="h-3.5 w-3.5 rounded-full bg-current opacity-20" />
      </div>
    );
  }

  const modes = [
    { id: "light", label: t.theme.light, icon: Sun },
    { id: "dark", label: t.theme.dark, icon: Moon },
    { id: "system", label: t.theme.system, icon: Laptop },
  ];

  return (
    <div
      role="group"
      aria-label={t.theme.toggleLabel}
      className={cn(
        "inline-flex items-center rounded-full border border-[#d8dacb] dark:border-[#2e3528] bg-white/80 dark:bg-[#191c16]/80 p-0.5 text-xs font-bold shadow-2xs backdrop-blur-xs",
        className
      )}
    >
      {modes.map((item) => {
        const Icon = item.icon;
        const isActive = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setTheme(item.id)}
            aria-pressed={isActive}
            aria-label={`${item.label} (${t.theme.toggleLabel})`}
            title={item.label}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] dark:focus-visible:ring-[#d8f06a]",
              isActive
                ? "bg-[#171914] dark:bg-[#d8f06a] text-[#d8f06a] dark:text-[#171914] shadow-xs"
                : "text-[#5c6055] dark:text-[#9ea594] hover:text-[#171914] dark:hover:text-[#f2f4ec] hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
