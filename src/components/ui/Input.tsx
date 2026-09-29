import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#5c6055]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-4 text-[#71766a]">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-full border border-[#c9cbbf] bg-white px-5 py-3 text-sm font-medium text-[#171914] placeholder-[#8e9386] transition-all focus:border-[#171914] focus:outline-none focus:ring-2 focus:ring-[#171914] disabled:opacity-50",
              icon ? "pl-11" : "pl-5",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
