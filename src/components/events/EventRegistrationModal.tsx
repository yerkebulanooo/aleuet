"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


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
  const [name, setName] = useState("Айдос Сарсенбаев");
  const [email, setEmail] = useState("aidos@example.com");
  const [phone, setPhone] = useState("+7 (777) 123-45-67");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? "Регистрация подтверждена!" : "Регистрация на событие"}
      description={
        isSubmitted
          ? `Вы успешно зарегистрированы на «${eventTitle}». Мы отправили билет и ссылку в календарь на почту ${email}.`
          : `Заполните данные для участия в «${eventTitle}» (${eventDate}).`
      }
    >
      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm font-bold text-[#171914]">
            Ждём вас на мероприятии!
          </p>
          <div className="mt-6 flex justify-center">
            <Button variant="primary" size="md" onClick={handleClose}>
              Понятно
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Ваше имя и фамилия"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email для билета"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Номер телефона (WhatsApp)"
            type="tel"
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
              Подтвердить регистрацию
            </Button>
          </div>
          <p className="text-center text-[11px] text-[#71766a]">
            Участие бесплатное. Количество мест в зале ограничено.
          </p>
        </form>
      )}
    </Modal>
  );
}
