import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "white" | "dark" | "lime" | "sky" | "peach" | "outline";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hoverable?: boolean;
}

export function Card({
  className,
  variant = "white",
  padding = "md",
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-[1.75rem] transition-all duration-200 relative overflow-hidden";

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const variantStyles = {
    default: "bg-[#f0f1e8] text-[#171914]",
    white: "bg-white text-[#171914] border border-[#eceee2] shadow-sm",
    dark: "bg-[#171914] text-white",
    lime: "bg-[#d8f06a] text-[#171914]",
    sky: "bg-[#a7dcff] text-[#171914]",
    peach: "bg-[#ffd6a5] text-[#171914]",
    outline: "border-2 border-[#e0e2d5] bg-transparent text-[#171914]",
  };

  const hoverStyles = hoverable
    ? "hover:-translate-y-1 hover:shadow-md cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        paddingStyles[padding],
        variantStyles[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
