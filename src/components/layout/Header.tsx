"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Sparkles, Menu, X, BookOpen, Compass, Calendar, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/data/user";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/catalog", label: "Каталог", icon: <Compass className="h-4 w-4" /> },
    { href: "/learning", label: "Моё обучение", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/events", label: "События", icon: <Calendar className="h-4 w-4" /> },
    { href: "/profile", label: "Профиль", icon: <UserIcon className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7dc] bg-[#f7f7f2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[#171914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] rounded-lg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#171914] text-xs font-black text-[#d8f06a] transition-transform group-hover:scale-105">
              AL
            </span>
            <span>ALEUET</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]",
                    isActive
                      ? "bg-[#171914] text-white"
                      : "text-[#555a4e] hover:bg-black/5 hover:text-[#171914]"
                  )}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak & XP pill */}
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-[#d8dacb] bg-white px-3 py-1.5 text-xs font-bold text-[#171914] shadow-xs transition-transform hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]"
            title="Ваш прогресс и серия"
          >
            <span className="flex items-center gap-1 text-[#d96500]">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{currentUser.streakDays} дн</span>
            </span>
            <span className="h-3 w-[1px] bg-[#d8dacb]" />
            <span className="flex items-center gap-1 text-[#4d6300]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{currentUser.currentXP} XP</span>
            </span>
          </Link>

          {/* User profile avatar link */}
          <Link
            href="/profile"
            className="hidden items-center gap-2 rounded-full bg-[#171914] pl-3 pr-1.5 py-1 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]"
          >
            <span>{currentUser.name.split(" ")[0]}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d8f06a] text-[10px] font-black text-[#171914]">
              {currentUser.avatarInitials}
            </span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8dacb] bg-white text-[#171914] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-[#e5e7dc] bg-[#f7f7f2] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Мобильное меню">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold transition-colors",
                    isActive
                      ? "bg-[#171914] text-white"
                      : "text-[#474c40] hover:bg-black/5"
                  )}
                >
                  <span className="shrink-0">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
