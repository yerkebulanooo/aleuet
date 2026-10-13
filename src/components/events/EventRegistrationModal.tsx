"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/providers/language-provider";

export interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
}: EventRegistrationModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? t.pages.events.interestSuccessTitle : t.pages.events.interestModalTitle}
      description={
        isSubmitted
          ? `${t.pages.events.interestSuccessDesc} (${eventTitle})`
          : `${t.pages.events.interestModalDesc} — ${eventTitle} (${eventDate})`
      }
    >
      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="mt-4 rounded-2xl bg-[#f0f1e8] dark:bg-[#232820] p-4 text-xs font-medium text-[#474c40] dark:text-[#c5cbbe]">
            <p className="flex items-center justify-center gap-1.5 font-bold mb-1">
              <Info className="h-4 w-4 text-[#3e5000] dark:text-[#d8f06a]" />
              <span>{t.common.mvpBannerBadge}</span>
            </p>
            <p>Бұл демонстрациялық пилоттық сценарий. Нақты деректер сыртқы серверге жіберілмейді.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="primary" size="md" onClick={handleClose}>
              {t.common.close}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Аты-жөніңіз / Имя и фамилия"
            placeholder="Есіміңізді жазыңыз..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Телефон нөмірі / Номер WhatsApp"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              icon={<Send className="h-4 w-4" />}
            >
              {t.pages.events.expressInterestBtn}
            </Button>
          </div>
          <p className="text-center text-[11px] text-[#71766a] dark:text-[#888e7f]">
            Пилоттық қатысу тегін. Кесте бекітілгенде алдын ала хабарлаймыз.
          </p>
        </form>
      )}
    </Modal>
  );
}

