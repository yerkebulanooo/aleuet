"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw, Filter, Sparkles, BookOpen } from "lucide-react";
import { materials } from "@/data/materials";
import { topics } from "@/data/topics";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") || "all";

  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(initialTopic);
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");

  const topicTabs = [
    { id: "all", label: "Все направления", count: materials.length },
    ...topics.map((t) => ({
      id: t.id,
      label: t.title,
      count: materials.filter((m) => m.topicId === t.id).length,
    })),
  ];

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!m.title.toLowerCase().includes(q) && !m.subtitle.toLowerCase().includes(q) && !m.author.name.toLowerCase().includes(q)) return false;
      }
      if (topic !== "all" && m.topicId !== topic) return false;
      if (level !== "all" && m.level !== level) return false;
      if (status !== "all" && m.status !== status) return false;
      return true;
    });
  }, [query, topic, level, status]);

  const reset = () => {
    setQuery("");
    setTopic("all");
    setLevel("all");
    setStatus("all");
  };

  const hasFilter = query.trim() !== "" || topic !== "all" || level !== "all" || status !== "all";

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f06a] px-3.5 py-1 text-xs font-black uppercase text-[#3e5000]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Каталог материалов</span>
        </div>
        <h1 className="mt-3 text-3xl font-black text-[#171914] sm:text-5xl">Библиотека практических лекций</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#5c6055] sm:text-base">
          Выбирайте тему, смотрите лекции и подтверждайте навыки на практике.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <Input
            placeholder="Поиск по названию или автору..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
          {hasFilter && (
            <Button variant="outline" size="md" onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
              Сбросить
            </Button>
          )}
        </div>

        <div className="overflow-x-auto pb-1">
          <Tabs tabs={topicTabs} activeTab={topic} onChange={setTopic} variant="pill" />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#71766a]">
            <Filter className="h-3.5 w-3.5" />
            <span>Уровень:</span>
          </div>
          {[
            { id: "all", label: "Все" },
            { id: "beginner", label: "Базовый" },
            { id: "intermediate", label: "Средний" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                level === l.id ? "bg-[#171914] text-white" : "bg-white text-[#5c6055] border border-[#e2e4d8]"
              }`}
            >
              {l.label}
            </button>
          ))}

          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#71766a] ml-2">
            <span>Статус:</span>
          </div>
          {[
            { id: "all", label: "Все" },
            { id: "in_progress", label: "В процессе" },
            { id: "completed", label: "Завершено" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                status === s.id ? "bg-[#171914] text-white" : "bg-white text-[#5c6055] border border-[#e2e4d8]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((mat) => (
              <MaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-[#e2e4d8] bg-white p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[#71766a]" />
            <h3 className="mt-4 text-2xl font-black text-[#171914]">Материалы не найдены</h3>
            <p className="mt-2 text-sm text-[#5c6055]">Попробуйте изменить запрос или сбросить фильтры.</p>
            <div className="mt-6 flex justify-center">
              <Button variant="primary" size="md" onClick={reset}>
                Сбросить фильтры
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Загрузка каталога...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
