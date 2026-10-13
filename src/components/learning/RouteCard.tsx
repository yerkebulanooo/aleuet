"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LearningRoute } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

export interface RouteCardProps {
  route: LearningRoute;
}

export function RouteCard({ route }: RouteCardProps) {
  const { isDemoMode } = useLanguage();
  const completed = isDemoMode ? route.completedMaterials : 0;
  const percent = Math.round((completed / route.totalMaterials) * 100);

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 transition-all hover:border-[#171914] dark:hover:border-[#d8f06a] hover:shadow-md sm:p-7">
      <div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold",
              route.accentBg,
              route.accentText
            )}
          >
            {route.topicTitle}
          </span>
          <span className="text-xs font-bold text-[#71766a] dark:text-[#9ea594]">
            {completed} / {route.totalMaterials}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-black text-[#171914] dark:text-[#f2f4ec]">{route.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-[#5c6055] dark:text-[#9ea594]">{route.description}</p>
      </div>

      <div className="mt-6 border-t border-[#f0f1e8] dark:border-[#272d22] pt-4">
        <div className="mb-3">
          <ProgressBar value={percent} size="sm" color="lime" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#5c6055] dark:text-[#9ea594]">{percent}%</span>
          <Link
            href={`/materials/${route.materialSlugs[0]}`}
            className="flex items-center gap-1.5 text-xs font-bold text-[#171914] dark:text-[#d8f06a] hover:underline"
          >
            <span>{percent === 100 ? "Қайталау" : "Бастау"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

