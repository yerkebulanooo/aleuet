import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-tight rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary: "bg-[#171914] text-white hover:bg-[#32362c]",
      secondary: "bg-[#f0f1e8] text-[#171914] hover:bg-[#e4e6d8]",
      outline:
        "border border-[#c9cbbf] bg-white text-[#171914] hover:border-[#171914] hover:bg-[#fbfbf8]",
      accent: "bg-[#d8f06a] text-[#171914] hover:bg-[#cbf73f]",
      ghost: "text-[#171914] hover:bg-black/5",
      danger: "bg-[#ffe3e3] text-[#b31b1b] hover:bg-[#ffd1d1]",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth && "w-full",
      className
    );

    if (href && !disabled) {
      return (
        <Link href={href} className={combinedClassName}>
          {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
