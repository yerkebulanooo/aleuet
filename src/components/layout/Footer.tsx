import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#e2e4d8] bg-[#f0f1e8] pb-24 pt-12 text-[#171914] md:pb-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171914] text-xs font-black text-[#d8f06a]">
                AL
              </span>
              <span>ALEUET</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c6055]">
              Образовательная медиаплатформа для старшеклассников и молодых людей.
              Превращай интерес в проверяемые знания и реальные проекты.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#607800]">
              <Sparkles className="h-4 w-4" />
              <span>Прототип P0 · Продуктовая спецификация v2.0</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a]">
              Обучение
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              <li>
                <Link href="/catalog" className="text-[#3c4036] hover:text-[#171914]">
                  Каталог материалов
                </Link>
              </li>
              <li>
                <Link href="/learning" className="text-[#3c4036] hover:text-[#171914]">
                  Мои маршруты
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/research-question-formulation"
                  className="text-[#3c4036] hover:text-[#171914]"
                >
                  Исследования
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/student-portfolio-strategy"
                  className="text-[#3c4036] hover:text-[#171914]"
                >
                  Карьера и портфолио
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a]">
              Экосистема
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              <li>
                <Link href="/events" className="text-[#3c4036] hover:text-[#171914]">
                  События и воркшопы
                </Link>
              </li>
              <li>
                <Link
                  href="/products/research-accelerator"
                  className="text-[#3c4036] hover:text-[#171914]"
                >
                  Интенсив по исследованиям
                </Link>
              </li>
              <li>
                <Link
                  href="/products/portfolio-mentorship"
                  className="text-[#3c4036] hover:text-[#171914]"
                >
                  Менторство портфолио
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-[#3c4036] hover:text-[#171914]">
                  Мой профиль и XP
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#71766a]">
              Контакты
            </h4>
            <p className="mt-4 text-sm text-[#5c6055]">
              Алматы / Астана, Казахстан
            </p>
            <p className="mt-2 text-sm text-[#5c6055]">
              hello@aleuet.kz
            </p>
            <p className="mt-4 text-xs text-[#8a8f82]">
              © 2026 Aleuet. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
