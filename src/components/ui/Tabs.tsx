"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  if (variant === "pill") {
    return (
      <div
        role="tablist"
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-full bg-[#ebeee0] p-1.5 text-sm font-semibold text-[#5c6055]",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]",
                isActive
                  ? "bg-white text-[#171914] shadow-xs"
                  : "text-[#606557] hover:text-[#171914] hover:bg-black/5"
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    isActive ? "bg-[#d8f06a] text-[#3e5000]" : "bg-black/10 text-[#55594e]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      className={cn("flex border-b border-[#e2e4d8] gap-6 text-sm font-semibold", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative pb-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914]",
              isActive ? "text-[#171914]" : "text-[#71766a] hover:text-[#171914]"
            )}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    isActive ? "bg-[#171914] text-white" : "bg-[#ebeee0] text-[#55594e]"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </div>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#171914]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
