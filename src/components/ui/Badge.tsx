import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "lime" | "sky" | "peach" | "purple" | "outline" | "success" | "neutral";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-bold tracking-tight rounded-full whitespace-nowrap";

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    default: "bg-[#171914] text-white dark:bg-[#d8f06a] dark:text-[#171914]",
    lime: "bg-[#d8f06a] text-[#3e5000] dark:bg-[#d8f06a]/20 dark:text-[#d8f06a]",
    sky: "bg-[#a7dcff] text-[#004f77] dark:bg-[#38a3e5]/20 dark:text-[#70c4ff]",
    peach: "bg-[#ffd6a5] text-[#803900] dark:bg-[#ffbe7a]/20 dark:text-[#ffbe7a]",
    purple: "bg-[#e3dbff] text-[#412885] dark:bg-[#b09aff]/20 dark:text-[#d4c7ff]",
    outline:
      "border border-[#c9cbbf] bg-white text-[#171914] dark:border-[#384132] dark:bg-[#191c16] dark:text-[#f2f4ec]",
    success: "bg-[#cbf7d3] text-[#135924] dark:bg-[#204a29]/40 dark:text-[#88e89c]",
    neutral: "bg-[#ebeee0] text-[#55594e] dark:bg-[#272c21] dark:text-[#a0a696]",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
