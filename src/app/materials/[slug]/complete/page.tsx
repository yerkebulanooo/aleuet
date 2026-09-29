import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Sparkles,
  Award,
  ArrowRight,
  Flame,
} from "lucide-react";
import { materials } from "@/data/materials";
import { topics } from "@/data/topics";
import { currentUser } from "@/data/user";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MaterialCompletePage({ params }: PageProps) {
  const { slug } = await params;
  const material = materials.find((m) => m.slug === slug);

  if (!material) {
    notFound();
  }

  const topic = topics.find((t) => t.id === material.topicId);
  const nextMaterial = material.nextMaterialSlug
    ? materials.find((m) => m.slug === material.nextMaterialSlug)
    : materials.find((m) => m.slug !== slug);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-16 md:px-8">
      <div className="overflow-hidden rounded-[2.5rem] border border-[#e2e4d8] bg-white p-7 text-center shadow-lg sm:p-12">
        {/* Animated celebration icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914] shadow-md">
          <Award className="h-12 w-12 stroke-[2.2]" />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0fbf2] px-3.5 py-1 text-xs font-black uppercase text-[#135924]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Урок и проверка знаний завершены</span>
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#171914] sm:text-5xl">
          Отличная работа!
        </h1>

        <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed text-[#5c6055] sm:text-base">
          Вы успешно изучили тему «{material.title}» и подтвердили свои знания в тесте.
        </p>

        {/* Reward stats cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#f7f7f2] p-5 text-center">
            <span className="text-xs font-bold text-[#71766a]">Начислено</span>
            <p className="mt-1 text-3xl font-black text-[#4d6300]">
              +{material.xpReward} XP
            </p>
            <p className="mt-1 text-[11px] text-[#71766a]">За лекцию и тест</p>
          </div>

          <div className="rounded-2xl bg-[#f7f7f2] p-5 text-center">
            <span className="text-xs font-bold text-[#71766a]">Серия дней</span>
            <p className="mt-1 flex items-center justify-center gap-1 text-3xl font-black text-[#d96500]">
              <Flame className="h-6 w-6 fill-current" />
              <span>{currentUser.streakDays}</span>
            </p>
            <p className="mt-1 text-[11px] text-[#71766a]">Дней в фокусе</p>
          </div>

          <div className="rounded-2xl bg-[#f7f7f2] p-5 text-center">
            <span className="text-xs font-bold text-[#71766a]">Трек</span>
            <p className="mt-1 text-2xl font-black text-[#171914]">
              {topic?.title || "Исследования"}
            </p>
            <p className="mt-1 text-[11px] font-bold text-[#135924]">
              +33% к прогрессу
            </p>
          </div>
        </div>

        {/* Progress in topic */}
        <div className="mt-8 rounded-2xl border border-[#e2e4d8] bg-[#fbfbf9] p-5 text-left">
          <div className="flex items-center justify-between text-xs font-bold text-[#171914]">
            <span>Прогресс направления «{topic?.title}»</span>
            <span>66%</span>
          </div>
          <div className="mt-2.5">
            <ProgressBar value={66} size="md" color="lime" />
          </div>
        </div>

        {/* Next recommended step */}
        {nextMaterial && (
          <div className="mt-8 rounded-2xl border-2 border-[#171914] bg-[#f0f1e8] p-6 text-left">
            <div className="flex items-center justify-between">
              <Badge variant="default" size="sm">
                Рекомендуемый следующий шаг
              </Badge>
              <span className="text-xs font-bold text-[#607800]">
                +{nextMaterial.xpReward} XP
              </span>
            </div>
            <h3 className="mt-3 text-lg font-black text-[#171914]">
              {nextMaterial.title}
            </h3>
            <p className="mt-1 text-xs text-[#5c6055]">
              {nextMaterial.subtitle}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <Button
                href={`/materials/${nextMaterial.slug}`}
                variant="primary"
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Перейти к следующему уроку
              </Button>
              <Link
                href="/learning"
                className="text-xs font-bold text-[#5c6055] hover:text-[#171914] underline"
              >
                Моё обучение
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/learning" variant="outline" size="md">
            В личный кабинет обучения
          </Button>
          <Button href="/catalog" variant="ghost" size="md">
            Вернуться в каталог
          </Button>
        </div>
      </div>
    </div>
  );
}
