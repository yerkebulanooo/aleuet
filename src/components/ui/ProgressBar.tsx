import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "dark" | "lime" | "sky" | "orange";
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "dark",
  showLabel = false,
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const fillColors = {
    dark: "bg-[#171914]",
    lime: "bg-[#8ba600]",
    sky: "bg-[#0077b6]",
    orange: "bg-[#d96500]",
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#5c6055]">
          <span>Прогресс</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "w-full overflow-hidden rounded-full bg-black/10",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            fillColors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
