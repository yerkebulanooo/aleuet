"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ProductOrderFormProps {
  productTitle: string;
  price: string;
}

export function ProductOrderForm({ productTitle, price }: ProductOrderFormProps) {
  const [name, setName] = useState("Айдос Сарсенбаев");
  const [phone, setPhone] = useState("+7 (777) 123-45-67");
  const [note, setNote] = useState("Хочу подготовить исследование по экологии Алматы для конкурса Дарын.");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-black text-[#171914]">
          Заявка на курс «{productTitle}» принята!
        </h3>
        <p className="mt-2 text-sm text-[#5c6055]">
          Координатор свяжется с вами в течение 2 часов в WhatsApp по номеру {phone}.
        </p>
        <div className="mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsSubmitted(false)}
          >
            Отправить ещё одну заявку
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="rounded-[2.5rem] border border-[#171914] bg-[#171914] p-6 text-white sm:p-8">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#d8f06a] px-3 py-1 text-xs font-black text-[#171914]">
          Заявка на поток
        </span>
        <span className="text-xl font-black text-[#d8f06a]">{price}</span>
      </div>

      <h3 className="mt-4 text-2xl font-black tracking-tight">
        Забронировать место в программе
      </h3>
      <p className="mt-1 text-xs text-white/70">
        Оставьте контакты для бесплатной консультации с куратором перед оплатой.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase text-white/70">
            Имя и фамилия
          </label>
          <input
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#d8f06a] focus:outline-none focus:ring-2 focus:ring-[#d8f06a]"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase text-white/70">
            Цель или вопрос к ментору
          </label>
          <textarea
            rows={3}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#d8f06a] focus:outline-none focus:ring-2 focus:ring-[#d8f06a]"
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
          Отправить заявку
        </Button>

        <div className="flex items-center justify-center gap-2 text-center text-[11px] text-white/60">
          <ShieldCheck className="h-4 w-4 text-[#d8f06a]" />
          <span>Оплата только после собеседования и подтверждения темы</span>
        </div>
      </form>
    </div>
  );
}
