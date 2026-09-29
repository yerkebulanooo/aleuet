import React from "react";
import Link from "next/link";
import { Clock, Play, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Material } from "@/types";
import { topics } from "@/data/topics";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn, formatMinutes } from "@/lib/utils";

export interface MaterialCardProps {
  material: Material;
  variant?: "standard" | "compact" | "featured";
}

export function MaterialCard({ material, variant = "standard" }: MaterialCardProps) {
  const topic = topics.find((t) => t.id === material.topicId);

  const levelLabels = {
    beginner: "Базовый",
    intermediate: "Средний",
    advanced: "Продвинутый",
  };

  const statusLabels = {
    not_started: "Не начато",
    in_progress: "В процессе",
    completed: "Завершено",
  };

  const topicAccentBg = topic?.accentBg || "bg-[#f0f1e8]";

  if (variant === "compact") {
    return (
      <Link
        href={`/materials/${material.slug}`}
        className="group flex items-center justify-between rounded-2xl border border-[#e2e4d8] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#171914] hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]"
      >
        <div className="flex items-center gap-3.5">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black text-sm",
              topicAccentBg
            )}
          >
            {material.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-[#135924]" />
            ) : (
              <Play className="h-4 w-4 text-[#171914] transition-transform group-hover:scale-110" />
            )}
          </div>
          <div>
            <h4 className="line-clamp-1 text-sm font-bold text-[#171914] group-hover:underline">
              {material.title}
            </h4>
            <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-[#71766a]">
              <span>{formatMinutes(material.durationMinutes)}</span>
              <span>•</span>
              <span>+{material.xpReward} XP</span>
            </div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-[#71766a] transition-transform group-hover:translate-x-1 group-hover:text-[#171914]" />
      </Link>
    );
  }

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#e5e7dc] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#171914] hover:shadow-md">
      <div>
        {/* Card Header Banner */}
        <div className={cn("relative p-6", topicAccentBg)}>
          <div className="flex items-center justify-between">
            <Badge variant="default" size="sm">
              {topic?.title || "Курс"}
            </Badge>
            <div className="flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-xs font-bold text-[#171914]">
              <Sparkles className="h-3 w-3" />
              <span>+{material.xpReward} XP</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-black/70">
              {levelLabels[material.level]}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-black/80">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatMinutes(material.durationMinutes)}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-lg font-black leading-tight tracking-tight text-[#171914] transition-colors group-hover:text-[#607800]">
            <Link
              href={`/materials/${material.slug}`}
              className="focus-visible:outline-none focus-visible:underline"
            >
              {material.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5c6055]">
            {material.subtitle}
          </p>

          <div className="mt-4 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ebeee0] text-[11px] font-bold text-[#171914]">
              {material.author.avatarInitials}
            </span>
            <span className="text-xs font-semibold text-[#5c6055]">
              {material.author.name}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-[#f0f1e8] bg-[#fbfbf9] px-6 py-4">
        {material.status === "in_progress" ? (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#171914]">
              <span>В процессе</span>
              <span>{material.progressPercent}%</span>
            </div>
            <ProgressBar value={material.progressPercent} size="sm" color="lime" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-xs font-bold",
                material.status === "completed"
                  ? "text-[#135924]"
                  : "text-[#71766a]"
              )}
            >
              {statusLabels[material.status]}
            </span>
            <Link
              href={`/materials/${material.slug}`}
              className="flex items-center gap-1 text-xs font-bold text-[#171914] hover:underline"
            >
              <span>{material.status === "completed" ? "Повторить" : "Смотреть"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
