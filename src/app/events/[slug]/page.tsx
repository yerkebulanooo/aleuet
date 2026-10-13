"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { events } from "@/data/events";
import { materials } from "@/data/materials";
import { usePublishedContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EventRegistrationModal } from "@/components/events/EventRegistrationModal";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { items: visibleEvents, ready: eventsReady } = usePublishedContent("events", events);
  const { items: visibleMaterials } = usePublishedContent("materials", materials);
  const event = visibleEvents.find((e) => e.slug === slug);

  const [isOpen, setIsOpen] = useState(false);

  if (!event) {
    if (!eventsReady) return <div className="p-12 text-center">Жүктелуде…</div>;
    notFound();
  }

  const prepMaterials = event.relatedMaterialSlugs
    ? visibleMaterials.filter((m) => event.relatedMaterialSlugs?.includes(m.slug))
    : [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
      <div className="mb-6">
        <Link href="/events" className="inline-flex items-center gap-2 text-xs font-bold text-[#71766a] hover:text-[#171914]">
          <ArrowLeft className="h-4 w-4" />
          <span>Ко всем событиям</span>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={event.isOnline ? "purple" : "sky"} size="sm">{event.typeLabel}</Badge>
            <span className="text-xs font-bold text-[#55594e]">Мест: {event.spotsLeft} из {event.totalSpots}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black text-[#171914] sm:text-4xl">{event.title}</h1>

          <div className="mt-6 flex flex-wrap gap-4 rounded-2xl bg-white p-4 border border-[#e2e4d8] text-xs font-bold">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#71766a]" /><span>{event.date}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#71766a]" /><span>{event.time}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#71766a]" /><span>{event.city} ({event.venue})</span></div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
            <h3 className="text-lg font-black text-[#171914]">О событии</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c6055]">{event.description}</p>
          </div>

          {event.program && (
            <div className="mt-6 rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
              <h3 className="text-lg font-black text-[#171914]">Программа</h3>
              <div className="mt-4 space-y-4">
                {event.program.map((p, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="font-bold bg-[#f0f1e8] px-2.5 py-1 rounded-full">{p.time}</span>
                    <div><h4 className="font-black text-sm">{p.title}</h4><p className="text-[#5c6055]">{p.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {prepMaterials.length > 0 && (
            <div className="mt-6 rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
              <h3 className="text-lg font-black text-[#171914]">Подготовка к встрече</h3>
              <div className="mt-3 space-y-2">
                {prepMaterials.map((m) => (
                  <Link key={m.id} href={`/materials/${m.slug}`} className="flex justify-between items-center p-3 rounded-xl bg-[#f7f7f2] text-xs font-bold hover:bg-[#ebeee0]">
                    <span>{m.title}</span><ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2.5rem] bg-[#171914] p-6 text-white sm:p-8">
            <Badge variant="lime" size="sm">Бесплатно</Badge>
            <h3 className="mt-3 text-2xl font-black">Забронировать место</h3>
            <p className="mt-2 text-xs text-white/70">Осталось мест: {event.spotsLeft}</p>
            <div className="mt-6">
              <Button onClick={() => setIsOpen(true)} variant="accent" size="lg" fullWidth>
                Зарегистрироваться
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6">
            <p className="text-xs font-black uppercase text-[#71766a]">Спикер</p>
            <h4 className="mt-1 text-base font-black text-[#171914]">{event.speaker.name}</h4>
            <p className="text-xs font-bold text-[#607800]">{event.speaker.role}</p>
            <p className="mt-2 text-xs text-[#5c6055]">{event.speaker.bio}</p>
          </div>
        </aside>
      </div>

      <EventRegistrationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventTitle={event.title}
        eventDate={event.date}
      />
    </div>
  );
}
