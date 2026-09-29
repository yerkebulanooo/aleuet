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
    default: "bg-[#171914] text-white",
    lime: "bg-[#d8f06a] text-[#3e5000]",
    sky: "bg-[#a7dcff] text-[#004f77]",
    peach: "bg-[#ffd6a5] text-[#803900]",
    purple: "bg-[#e3dbff] text-[#412885]",
    outline: "border border-[#c9cbbf] bg-white text-[#171914]",
    success: "bg-[#cbf7d3] text-[#135924]",
    neutral: "bg-[#ebeee0] text-[#55594e]",
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
