"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/catalog", label: "Каталог", icon: Compass },
    { href: "/learning", label: "Обучение", icon: BookOpen },
    { href: "/events", label: "События", icon: Calendar },
    { href: "/profile", label: "Профиль", icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e4d8] bg-[#f7f7f2]/95 px-2 py-2 backdrop-blur-md md:hidden"
      aria-label="Нижняя мобильная навигация"
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
                "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]",
                isActive
                  ? "text-[#171914]"
                  : "text-[#71766a] hover:text-[#171914]"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                  isActive ? "bg-[#d8f06a] text-[#171914]" : "text-inherit"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
