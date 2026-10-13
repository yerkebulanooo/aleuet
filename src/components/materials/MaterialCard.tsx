"use client";

import React from "react";
import Link from "next/link";
import { Clock, Play, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Material } from "@/types";
import { topics } from "@/data/topics";
import { Badge } from "@/components/ui/Badge";
import { cn, formatMinutes } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

export function MaterialCard({ material, variant = "standard" }: { material: Material; variant?: "standard" | "compact" }) {
  const { t, locale } = useLanguage();
  const topic = topics.find((item) => item.id === material.topicId);

  const topicTitle = topic
    ? (locale === "kk" ? topic.titleKk : locale === "ru" ? topic.titleRu : topic.titleEn) || topic.title
    : "";

  const levelLabels: Record<string, string> = {
    beginner: t.pages.catalog.levelBeginner,
    intermediate: t.pages.catalog.levelIntermediate,
    advanced: t.pages.catalog.levelAdvanced,
  };

  const statusLabels: Record<string, string> = {
    not_started: t.pages.catalog.statusNotStarted,
    in_progress: t.pages.catalog.statusInProgress,
    completed: t.pages.catalog.statusCompleted,
  };

  const topicAccentBg = topic?.accentBg || "bg-[#f0f1e8]";

  if (variant === "compact") {
    return (
      <Link
        href={`/materials/${material.slug}`}
        className="group flex items-center justify-between rounded-2xl border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-4 transition-all hover:border-[#171914] dark:hover:border-[#d8f06a]"
      >
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm", topicAccentBg)}>
            {material.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-[#135924]" />
            ) : (
              <Play className="h-4 w-4 text-[#171914]" />
            )}
          </div>
          <div>
            <h4 className="line-clamp-1 text-sm font-bold text-[#171914] dark:text-[#f2f4ec] group-hover:underline">
              {material.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#71766a] dark:text-[#9ea594]">
              <span>{formatMinutes(material.durationMinutes)}</span>
              <span>•</span>
              <span>+{material.xpReward} XP</span>
            </div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-[#71766a] dark:text-[#9ea594]" />
      </Link>
    );
  }

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#e5e7dc] dark:border-[#2e3528] bg-white dark:bg-[#191c16] transition-all hover:border-[#171914] dark:hover:border-[#d8f06a] hover:shadow-md">
      <div>
        <div className={cn("relative p-6", topicAccentBg)}>
          <div className="flex items-center justify-between">
            <Badge variant="default" size="sm">{topicTitle || "Курс"}</Badge>
            <div className="flex items-center gap-1 rounded-full bg-black/10 px-2 py-0.5 text-xs font-bold text-[#171914]">
              <Sparkles className="h-3 w-3" />
              <span>+{material.xpReward} XP</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs font-bold text-black/80">
            <span className="uppercase">{levelLabels[material.level]}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatMinutes(material.durationMinutes)}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-base font-black leading-snug tracking-tight text-[#171914] dark:text-[#f2f4ec] group-hover:text-[#3e5000] dark:group-hover:text-[#d8f06a]">
            <Link href={`/materials/${material.slug}`} className="focus-visible:underline">
              {material.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5c6055] dark:text-[#9ea594]">
            {material.subtitle}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#5c6055] dark:text-[#9ea594]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ebeee0] dark:bg-[#282e23] font-bold text-[10px] text-[#171914] dark:text-[#d8f06a]">
              {material.author.avatarInitials}
            </span>
            <span>{material.author.name}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f0f1e8] dark:border-[#272d22] bg-[#fbfbf9] dark:bg-[#151813] px-6 py-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#71766a] dark:text-[#9ea594]">
            {statusLabels[material.status]}
          </span>
          <Link
            href={`/materials/${material.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-[#171914] dark:text-[#d8f06a] hover:underline"
          >
            <span>{material.status === "completed" ? "Қайталау" : "Қарау"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

