"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/providers/language-provider";

export interface ProductOrderFormProps {
  productTitle: string;
  price: string;
}

export function ProductOrderForm({ productTitle, price }: ProductOrderFormProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[2rem] border border-[#e2e4d8] dark:border-[#2e3528] bg-white dark:bg-[#191c16] p-7 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-xl font-black text-[#171914] dark:text-[#f2f4ec]">
          {t.pages.product.orderSuccessTitle}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[#5c6055] dark:text-[#9ea594]">
          {t.pages.product.orderSuccessDesc}
        </p>
        <div className="mt-4 rounded-xl bg-[#f0f1e8] dark:bg-[#242920] p-3 text-xs text-[#45493d] dark:text-[#c7cebe]">
          <p className="font-bold flex items-center justify-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>{t.common.hypothesisBadge}</span>
          </p>
          <p className="mt-0.5 text-[11px]">{t.pages.product.disclaimer}</p>
        </div>
        <div className="mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSubmitted(false);
              setName("");
              setPhone("");
              setNote("");
            }}
          >
            {t.pages.product.sendAnotherBtn}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2.5rem] border border-[#171914] dark:border-[#2e3528] bg-[#171914] dark:bg-[#151912] p-6 text-white sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#d8f06a] px-3 py-1 text-xs font-black text-[#171914]">
          {t.pages.product.hypothesisTag}
        </span>
        <span className="text-sm font-black text-[#d8f06a]">{price}</span>
      </div>

      <h3 className="mt-4 text-xl font-black tracking-tight">
        {t.pages.product.orderFormTitle}
      </h3>
      <p className="mt-1 text-xs text-white/70">
        {t.pages.product.orderFormDesc}
      </p>

      <form onSubmit={handleSubmit} aria-label={`${t.pages.product.orderFormTitle}: ${productTitle}`} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase text-white/70">
            Аты-жөніңіз / Имя и фамилия
          </label>
          <input
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#d8f06a] focus:outline-none focus:ring-2 focus:ring-[#d8f06a]"
            placeholder="Есіміңізді жазыңыз..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase text-white/70">
            Телефон / WhatsApp
          </label>
          <input
            type="tel"
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#d8f06a] focus:outline-none focus:ring-2 focus:ring-[#d8f06a]"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase text-white/70">
            Қызықтыратын тақырып немесе сұрақ
          </label>
          <textarea
            rows={2}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#d8f06a] focus:outline-none focus:ring-2 focus:ring-[#d8f06a]"
            placeholder="Зерттеу тақырыбыңыз немесе қызығушылығыңыз..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          fullWidth
          icon={<Send className="h-4 w-4" />}
        >
          {t.pages.product.submitApplicationBtn}
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/60">
          <ShieldCheck className="h-3.5 w-3.5 text-[#d8f06a]" />
          <span>{t.pages.product.disclaimer}</span>
        </div>
      </form>
    </div>
  );
}

