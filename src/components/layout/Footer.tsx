"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#e2e4d8] dark:border-[#2e3528] bg-[#f0f1e8] dark:bg-[#151813] pb-24 pt-12 text-[#171914] dark:text-[#f2f4ec] md:pb-12 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171914] dark:bg-[#d8f06a] text-xs font-black text-[#d8f06a] dark:text-[#171914]">
                AL
              </span>
              <span>ALEUET</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c6055] dark:text-[#9ea594]">
              {t.footer.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#3e5000] dark:text-[#d8f06a]">
              <Sparkles className="h-4 w-4" />
              <span>{t.footer.mvpStatus}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a] dark:text-[#888e7f]">
              {t.footer.learningNavTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              <li>
                <Link href="/catalog" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.footer.catalogLink}
                </Link>
              </li>
              <li>
                <Link href="/learning" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.footer.learningLink}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.footer.aboutLink}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a] dark:text-[#888e7f]">
              {t.footer.ecosystemNavTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              <li>
                <Link href="/events" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.footer.eventsLink}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.footer.profileLink}
                </Link>
              </li>
              <li>
                <Link href="/products/research-accelerator" className="text-[#3c4036] dark:text-[#c5cbbe] hover:underline">
                  {t.hero.demoTrackBtn}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a] dark:text-[#888e7f]">
              {t.footer.contactsNavTitle}
            </h4>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#5c6055] dark:text-[#9ea594]">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{t.footer.location}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#5c6055] dark:text-[#9ea594]">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{t.footer.contactNote}</span>
            </div>
            <p className="mt-4 text-xs text-[#8a8f82] dark:text-[#747b6c]">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

