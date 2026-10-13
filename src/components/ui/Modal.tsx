"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[2rem] bg-white dark:bg-[#191c16] border border-transparent dark:border-[#2e3528] p-6 shadow-2xl transition-all sm:p-8",
          maxWidthStyles[maxWidth]
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-2xl font-black tracking-[-0.03em] text-[#171914] dark:text-[#f2f4ec]">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm leading-relaxed text-[#5c6055] dark:text-[#9ea594]">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Жабу / Закрыть"
            className="rounded-full p-2 text-[#71766a] dark:text-[#9ea594] transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#171914] dark:hover:text-[#f2f4ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171914] dark:focus-visible:ring-[#d8f06a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
