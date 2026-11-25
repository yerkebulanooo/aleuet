"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/providers/language-provider";
import { LEAD_LIMITS, submitLead } from "@/lib/leads";

export interface EventRegistrationModalProps {
  isOpen: boolean;
  eventSlug: string;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventSlug,
  eventTitle,
  eventDate,
}: EventRegistrationModalProps) {
  const { t, locale } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    try {
      await submitLead({ kind: "event", targetSlug: eventSlug, targetTitle: eventTitle, name, email, phone, locale });
      setIsSubmitted(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFailed(false);
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
            <p>{t.common.leadPrivacy}</p>
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
            maxLength={LEAD_LIMITS.name}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={LEAD_LIMITS.email}
            required
          />
          <Input
            label="Телефон нөмірі / Номер WhatsApp"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={LEAD_LIMITS.phone}
            required
          />
          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              disabled={sending}
              icon={<Send className="h-4 w-4" />}
            >
              {sending ? t.common.leadSending : t.pages.events.expressInterestBtn}
            </Button>
          </div>
          {failed && (
            <p role="alert" className="rounded-xl bg-[#fff0ee] p-3 text-center text-xs font-bold text-[#a3241b]">
              {t.common.leadError}
            </p>
          )}
          <p className="text-center text-[11px] text-[#71766a] dark:text-[#888e7f]">
            Пилоттық қатысу тегін. Кесте бекітілгенде алдын ала хабарлаймыз.
          </p>
        </form>
      )}
    </Modal>
  );
}

