"use client";

import React, { useState } from "react";
import { MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { events } from "@/data/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function EventsPage() {

  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((e) => {
    if (filter === "workshop") return e.type === "workshop";
    if (filter === "webinar") return e.type === "webinar";
    if (filter === "offline") return !e.isOnline;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#a7dcff] px-3.5 py-1 text-xs font-black uppercase text-[#004f77]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>События и встречи</span>
        </div>
        <h1 className="mt-3 text-3xl font-black text-[#171914] sm:text-5xl">
          Практические воркшопы и митапы
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#5c6055] sm:text-base">
          Живые встречи с экспертами, разбор ваших проектов и обратная связь в Алматы, Астане и онлайн.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { id: "all", label: "Все события" },
          { id: "workshop", label: "Воркшопы" },
          { id: "webinar", label: "Вебинары" },
          { id: "offline", label: "Офлайн в Казахстане" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === f.id
                ? "bg-[#171914] text-white"
                : "bg-white text-[#5c6055] border border-[#e2e4d8] hover:border-[#171914]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex flex-col justify-between rounded-[2rem] border border-[#e2e4d8] bg-white p-6 transition-all hover:border-[#171914] hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge variant={evt.isOnline ? "purple" : "sky"} size="sm">
                  {evt.typeLabel}
                </Badge>
                <span className="text-xs font-bold text-[#71766a]">
                  Осталось {evt.spotsLeft} мест
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#171914]">{evt.dateDay}</span>
                <span className="text-sm font-bold text-[#71766a]">{evt.dateMonth}</span>
              </div>

              <h3 className="mt-2 text-lg font-black text-[#171914]">
                {evt.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-[#5c6055]">
                {evt.description}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-[#f0f1e8] pt-3 text-xs font-semibold text-[#5c6055]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#71766a]" />
                  <span>{evt.city} · {evt.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#71766a]" />
                  <span>Спикер: {evt.speaker.name}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <Button
                href={`/events/${evt.slug}`}
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Подробнее и регистрация
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
