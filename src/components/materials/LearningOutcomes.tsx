import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface LearningOutcomesProps {
  outcomes: string[];
}

export function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  return (
    <div className="rounded-[1.75rem] border border-[#e2e4d8] bg-white p-6 sm:p-8">
      <h3 className="text-lg font-black tracking-tight text-[#171914]">
        Чему вы научитесь в этой лекции
      </h3>
      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <p className="text-sm font-semibold leading-snug text-[#373b32]">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
