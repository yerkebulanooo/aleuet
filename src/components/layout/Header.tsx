"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Sparkles, Menu, X, BookOpen, Compass, Calendar, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { getUserProfile } from "@/data/user";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t, isDemoMode } = useLanguage();
  const user = getUserProfile(isDemoMode);

  const navLinks = [
    { href: "/catalog", label: t.nav.catalog, icon: <Compass className="h-4 w-4" /> },
    { href: "/learning", label: t.nav.learning, icon: <BookOpen className="h-4 w-4" /> },
    { href: "/events", label: t.nav.events, icon: <Calendar className="h-4 w-4" /> },
    { href: "/about", label: t.nav.about, icon: <Info className="h-4 w-4" /> },
    { href: "/profile", label: t.nav.profile, icon: <User className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7dc] dark:border-[#2e3528] bg-[#f7f7f2]/90 dark:bg-[#11130f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="group flex items-center gap-2 text-xl font-black tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#171914] dark:bg-[#d8f06a] text-xs font-black text-[#d8f06a] dark:text-[#171914]">
              AL
            </span>
            <span>ALEUET</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Басты навигация">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-black transition-colors",
                    active
                      ? "bg-[#171914] dark:bg-[#d8f06a] text-white dark:text-[#171914]"
                      : "text-[#555a4e] dark:text-[#9ea594] hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <div className="hidden sm:block"><ThemeSwitcher /></div>

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-[#d8dacb] dark:border-[#2e3528] bg-white dark:bg-[#191c16] px-3 py-1.5 text-xs font-bold"
          >
            {isDemoMode ? (
              <>
                <span className="flex items-center gap-1 text-[#d96500] dark:text-[#ffbe7a]">
                  <Flame className="h-3.5 w-3.5 fill-current" />
                  <span>{user.streakDays} {t.common.days}</span>
                </span>
                <span className="h-3 w-[1px] bg-[#d8dacb] dark:bg-[#2e3528]" />
                <span className="flex items-center gap-1 text-[#3e5000] dark:text-[#d8f06a]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{user.currentXP} XP</span>
                </span>
              </>
            ) : (
              <span className="text-[11px] font-bold text-[#555a4e] dark:text-[#9ea594]">{t.common.guestModeBadge}</span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Мәзір"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8dacb] dark:border-[#2e3528] bg-white dark:bg-[#191c16] md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-b border-[#e5e7dc] dark:border-[#2e3528] bg-[#f7f7f2] dark:bg-[#11130f] px-4 py-4 md:hidden">
          <div className="mb-3 flex items-center justify-between border-b border-[#e5e7dc] dark:border-[#2e3528] pb-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-bold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

