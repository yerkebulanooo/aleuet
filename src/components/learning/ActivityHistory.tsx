import React from "react";
import Link from "next/link";
import { CheckCircle2, Award, BookOpen, Sparkles } from "lucide-react";
import { ActivityHistoryItem } from "@/types";

export interface ActivityHistoryProps {
  items: ActivityHistoryItem[];
}

export function ActivityHistory({ items }: ActivityHistoryProps) {
  const iconMap = {
    completed_material: <CheckCircle2 className="h-4 w-4 text-[#135924]" />,
    passed_assessment: <Sparkles className="h-4 w-4 text-[#607800]" />,
    started_route: <BookOpen className="h-4 w-4 text-[#005580]" />,
    earned_achievement: <Award className="h-4 w-4 text-[#994400]" />,
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-2xl border border-[#e5e7dc] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-4 transition-all hover:border-[#171914] dark:hover:border-[#d8f06a]"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f1e8] dark:bg-[#252a20]">
              {iconMap[item.type]}
            </div>
            <div>
              <Link
                href={item.href}
                className="text-sm font-bold text-[#171914] dark:text-[#f2f4ec] hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-xs text-[#71766a] dark:text-[#9ea594]">{item.subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            {item.xpEarned && (
              <span className="text-xs font-black text-[#4d6300] dark:text-[#d8f06a]">
                +{item.xpEarned} XP
              </span>
            )}
            <p className="text-[11px] font-semibold text-[#8e9386] dark:text-[#737a6b]">
              {item.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
