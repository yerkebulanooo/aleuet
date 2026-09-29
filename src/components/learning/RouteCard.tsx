import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LearningRoute } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";


export interface RouteCardProps {
  route: LearningRoute;
}

export function RouteCard({ route }: RouteCardProps) {
  const percent = Math.round((route.completedMaterials / route.totalMaterials) * 100);

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#e2e4d8] bg-white p-6 transition-all hover:border-[#171914] hover:shadow-md sm:p-7">
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
          <span className="text-xs font-bold text-[#71766a]">
            {route.completedMaterials} из {route.totalMaterials} пройдено
          </span>
        </div>

        <h3 className="mt-4 text-xl font-black text-[#171914]">{route.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-[#5c6055]">{route.description}</p>
      </div>

      <div className="mt-6 border-t border-[#f0f1e8] pt-4">
        <div className="mb-3">
          <ProgressBar value={percent} size="sm" color="lime" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#5c6055]">{percent}% завершено</span>
          <Link
            href={`/materials/${route.materialSlugs[0]}`}
            className="flex items-center gap-1.5 text-xs font-bold text-[#171914] hover:underline"
          >
            <span>{percent === 100 ? "Повторить трек" : "Продолжить"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
