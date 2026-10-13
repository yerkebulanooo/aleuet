"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, Calendar, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/catalog", label: t.nav.catalog, icon: Compass },
    { href: "/learning", label: t.nav.learning, icon: BookOpen },
    { href: "/events", label: t.nav.events, icon: Calendar },
    { href: "/about", label: t.nav.about, icon: Info },
    { href: "/profile", label: t.nav.profile, icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e4d8] dark:border-[#2e3528] bg-[#f7f7f2]/95 dark:bg-[#11130f]/95 px-1 py-1.5 backdrop-blur-md md:hidden transition-colors"
      aria-label="Төменгі мобильді навигация"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] dark:focus-visible:ring-[#d8f06a]",
                isActive
                  ? "text-[#171914] dark:text-[#d8f06a]"
                  : "text-[#71766a] dark:text-[#9ea594] hover:text-[#171914] dark:hover:text-[#f2f4ec]"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                  isActive ? "bg-[#d8f06a] dark:bg-[#d8f06a] text-[#171914]" : "text-inherit"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="line-clamp-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

