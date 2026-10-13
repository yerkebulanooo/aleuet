"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export interface LearningOutcomesProps {
  outcomes: string[];
}

export function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-[1.75rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8 transition-colors">
      <h3 className="text-lg font-black tracking-tight text-[#171914] dark:text-[#f2f4ec]">
        {t.pages.material.outcomesTitle}
      </h3>
      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <p className="text-sm font-semibold leading-snug text-[#373b32] dark:text-[#c7cebe]">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

