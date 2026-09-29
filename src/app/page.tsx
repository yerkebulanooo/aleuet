import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, Play, CheckCircle2 } from "lucide-react";
import { materials } from "@/data/materials";
import { topics } from "@/data/topics";
import { events } from "@/data/events";
import { products } from "@/data/products";
import { currentUser } from "@/data/user";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Home() {
  const inProgress = materials.find((m) => m.status === "in_progress") || materials[0];
  const featuredEvent = events[0];
  const featuredProduct = products["research-accelerator"];

  return (
    <div className="space-y-16 pb-16 pt-6 sm:space-y-20 sm:pt-10">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f06a] px-3.5 py-1 text-xs font-black uppercase text-[#3e5000]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Образовательная платформа</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#171914] sm:text-6xl lg:text-7xl">
              Превращай интерес в реальные навыки
            </h1>
            <p className="mt-6 max-w-xl text-base text-[#5c6055] sm:text-lg">
              Полноформатные лекции, прикладная проверка понимания и конкретный следующий шаг.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`/materials/${inProgress.slug}`} size="lg" variant="primary" icon={<Play className="h-4 w-4 fill-current" />}>
                Продолжить обучение
              </Button>
              <Button href="/catalog" size="lg" variant="outline">
                Открыть каталог
              </Button>
            </div>
          </div>

          <aside className="rounded-[2.25rem] bg-[#d8f06a] p-6 text-[#171914] shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#4d6300]">Твой потенциал</span>
              <div className="flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-black text-[#d96500]">
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>{currentUser.streakDays} дней</span>
              </div>
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-5xl font-black sm:text-6xl">{currentUser.currentXP}</span>
                <span className="ml-2 text-sm font-bold text-[#4d6300]">XP</span>
              </div>
              <span className="text-xs font-bold text-[#4d6300]">Уровень {currentUser.level}: {currentUser.levelTitle}</span>
            </div>
            <div className="mt-4">
              <ProgressBar value={currentUser.currentXP} max={currentUser.nextLevelXP} size="md" color="dark" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#4d6300]">
              <span>До ур. {currentUser.level + 1}: {currentUser.nextLevelXP - currentUser.currentXP} XP</span>
              <Link href="/profile" className="font-bold underline hover:text-[#171914]">Профиль</Link>
            </div>
          </aside>
        </div>
      </section>
      {/* CONTINUE */}
      {inProgress && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6 shadow-xs sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d8f06a] text-[#171914]">
                  <Play className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <Badge variant="lime" size="sm">Текущий урок · {inProgress.progressPercent}%</Badge>
                  <h3 className="mt-1 text-xl font-black text-[#171914] sm:text-2xl">{inProgress.title}</h3>
                  <p className="mt-1 text-xs text-[#5c6055]">{inProgress.subtitle}</p>
                </div>
              </div>
              <Button href={`/materials/${inProgress.slug}`} variant="primary" size="md" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                Продолжить
              </Button>
            </div>
            <div className="mt-6">
              <ProgressBar value={inProgress.progressPercent} size="sm" color="lime" />
            </div>
          </div>
        </section>
      )}

      {/* TOPICS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#71766a]">Направления</p>
            <h2 className="mt-1 text-3xl font-black text-[#171914]">С чего начнём?</h2>
          </div>
          <Link href="/catalog" className="text-sm font-bold text-[#171914] underline hover:text-[#607800]">
            Весь каталог
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, idx) => (
            <Link
              key={t.id}
              href={`/catalog?topic=${t.id}`}
              className={`${t.accentBg} flex flex-col justify-between rounded-[2rem] p-6 transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-center justify-between text-xs font-black opacity-80">
                <span>0{idx + 1}</span>
                <span>{t.materialsCount} материалов</span>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-black text-[#171914]">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#171914]/80">{t.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#71766a]">Рекомендации</p>
            <h2 className="mt-1 text-3xl font-black text-[#171914]">Материалы для старта</h2>
          </div>
          <Link href="/catalog" className="text-sm font-bold underline">Все материалы</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.slice(0, 3).map((mat) => (
            <MaterialCard key={mat.id} material={mat} />
          ))}
        </div>
      </section>

      {/* EVENT */}
      {featuredEvent && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-[#1d211b] text-white md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-between bg-[#a7dcff] p-7 text-[#171914] sm:p-9">
              <div>
                <span className="rounded-full bg-[#171914] px-3 py-1 text-xs font-bold text-white">{featuredEvent.typeLabel}</span>
                <p className="mt-8 text-5xl font-black sm:text-6xl">{featuredEvent.dateDay}</p>
                <p className="text-lg font-black">{featuredEvent.dateMonth} · {featuredEvent.city}</p>
              </div>
              <p className="mt-6 text-xs font-semibold text-[#171914]/80">Осталось мест: {featuredEvent.spotsLeft}</p>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase text-white/60">Ближайшее событие</p>
                <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">{featuredEvent.title}</h3>
                <p className="mt-3 text-sm text-white/70">{featuredEvent.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={`/events/${featuredEvent.slug}`} variant="accent" size="md">
                  Записаться на воркшоп
                </Button>
                <Link href="/events" className="text-xs font-bold text-white/80 hover:text-white underline">Все события</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT */}
      {featuredProduct && (
        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-[2.5rem] border-2 border-[#171914] bg-[#ffd6a5] p-7 text-[#171914] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div>
                <Badge variant="default" size="sm">{featuredProduct.tag}</Badge>
                <h3 className="mt-3 text-2xl font-black sm:text-4xl">{featuredProduct.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#171914]/80">{featuredProduct.outcome}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#135924]" /> Ментор: {featuredProduct.expert.name}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#135924]" /> {featuredProduct.pricing.price}</span>
                </div>
              </div>
              <div className="flex lg:justify-end">
                <Button href={`/products/${featuredProduct.slug}`} variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Подробнее о программе
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
