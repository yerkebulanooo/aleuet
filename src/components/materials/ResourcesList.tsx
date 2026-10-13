"use client";

import React from "react";
import { FileText, CheckSquare, ExternalLink, Clock } from "lucide-react";
import { ResourceItem } from "@/types";
import { useLanguage } from "@/providers/language-provider";
import { Badge } from "@/components/ui/Badge";

export interface ResourcesListProps {
  resources: ResourceItem[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  const { t } = useLanguage();

  if (!resources || resources.length === 0) return null;

  const iconMap = {
    pdf: <FileText className="h-5 w-5 text-[#994400] dark:text-[#ffbe7a]" />,
    template: <FileText className="h-5 w-5 text-[#005580] dark:text-[#70c4ff]" />,
    checklist: <CheckSquare className="h-5 w-5 text-[#3e5000] dark:text-[#d8f06a]" />,
    link: <ExternalLink className="h-5 w-5 text-[#4f359b] dark:text-[#d4c7ff]" />,
  };

  return (
    <div className="rounded-[1.75rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-6 sm:p-8 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black tracking-tight text-[#171914] dark:text-[#f2f4ec]">
          {t.pages.material.resourcesTitle}
        </h3>
        <span className="rounded-full bg-[#ebeee0] dark:bg-[#282e23] px-3 py-1 text-xs font-bold text-[#55594e] dark:text-[#a0a696]">
          {resources.length} {t.pages.material.resourcesCount}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {resources.map((item) => {
          const isReady = item.isReady === true && item.url && item.url !== "#";

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[#eceee2] dark:border-[#2a3025] bg-[#fbfbf9] dark:bg-[#151813] p-4 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#20251c] shadow-2xs border border-[#eceee2] dark:border-[#2a3025]">
                  {iconMap[item.type] || <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171914] dark:text-[#f2f4ec]">
                    {item.title}
                  </h4>
                  {item.size && (
                    <p className="text-xs font-semibold text-[#71766a] dark:text-[#888e7f]">
                      {item.size}
                    </p>
                  )}
                </div>
              </div>

              <div>
                {isReady ? (
                  <a
                    href={item.url}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#171914] dark:bg-[#d8f06a] px-3.5 py-1.5 text-xs font-bold text-white dark:text-[#171914]"
                  >
                    <span>{t.pages.material.resourceDownloadDemo}</span>
                  </a>
                ) : (
                  <Badge variant="neutral" size="sm" className="gap-1 opacity-90">
                    <Clock className="h-3 w-3" />
                    <span>{t.pages.material.resourceInPrep}</span>
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


