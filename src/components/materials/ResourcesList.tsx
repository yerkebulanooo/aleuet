"use client";

import React from "react";
import { Download, FileText, CheckSquare, ExternalLink } from "lucide-react";
import { ResourceItem } from "@/types";

export interface ResourcesListProps {
  resources: ResourceItem[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  if (!resources || resources.length === 0) return null;

  const iconMap = {
    pdf: <FileText className="h-5 w-5 text-[#994400]" />,
    template: <FileText className="h-5 w-5 text-[#005580]" />,
    checklist: <CheckSquare className="h-5 w-5 text-[#4d6300]" />,
    link: <ExternalLink className="h-5 w-5 text-[#4f359b]" />,
  };

  return (
    <div className="rounded-[1.75rem] border border-[#e2e4d8] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black tracking-tight text-[#171914]">
          Материалы и файлы для скачивания
        </h3>
        <span className="rounded-full bg-[#ebeee0] px-3 py-1 text-xs font-bold text-[#55594e]">
          {resources.length} шт
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {resources.map((item) => (
          <a
            key={item.id}
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              alert(`Демо-скачивание: ${item.title}`);
            }}
            className="group flex items-center justify-between rounded-2xl border border-[#eceee2] bg-[#fbfbf9] p-4 transition-all hover:border-[#171914] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
                {iconMap[item.type] || <FileText className="h-5 w-5 text-[#171914]" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#171914] group-hover:underline">
                  {item.title}
                </h4>
                {item.size && (
                  <p className="text-xs font-semibold text-[#71766a]">{item.size}</p>
                )}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#171914] border border-[#e2e4d8] group-hover:bg-[#171914] group-hover:text-white transition-colors">
              <Download className="h-4 w-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

