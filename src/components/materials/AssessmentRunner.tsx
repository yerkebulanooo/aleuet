"use client";

import React, { useState } from "react";
import { RotateCcw, Sparkles, Award, ArrowRight, ArrowLeft } from "lucide-react";
import { Assessment } from "@/types";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

export function AssessmentRunner({ assessment }: { assessment: Assessment }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const total = assessment.questions.length;
  const currentQ = assessment.questions[currentIdx];
  const selectedOptId = answers[currentIdx];

  const handleSelect = (id: string) => {
    if (!isSubmitted) setAnswers((p) => ({ ...p, [currentIdx]: id }));
  };

  const correctCount = assessment.questions.reduce((acc, q, idx) => {
    const sel = answers[idx];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return correctOpt && sel === correctOpt.id ? acc + 1 : acc;
  }, 0);

  const scorePct = Math.round((correctCount / total) * 100);
  const isPassed = scorePct >= assessment.passingScorePercent;

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-[#e2e4d8] bg-white p-6 sm:p-10 text-center">
        <div className={cn(
          "mx-auto flex h-20 w-20 items-center justify-center rounded-full",
          isPassed ? "bg-[#d8f06a] text-[#171914]" : "bg-[#ffd6a5] text-[#994400]"
        )}>
          {isPassed ? <Award className="h-10 w-10" /> : <RotateCcw className="h-10 w-10" />}
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-wider text-[#71766a]">Результат</p>
        <h2 className="mt-2 text-3xl font-black text-[#171914]">
          {isPassed ? "Тест успешно пройден!" : "Нужно повторить материал"}
        </h2>
        <p className="mt-3 text-sm text-[#5c6055]">
          {isPassed
            ? `Верно отвечено: ${correctCount} из ${total} (${scorePct}%). Знания подтверждены!`
            : `Набрано ${scorePct}% (${correctCount} из ${total}). Требуется минимум ${assessment.passingScorePercent}%.`}
        </p>
        <div className="mt-6 rounded-2xl bg-[#f7f7f2] p-4 text-left">
          <div className="flex justify-between text-xs font-bold text-[#171914] mb-2">
            <span>Результат: {scorePct}%</span>
            <span>Порог: {assessment.passingScorePercent}%</span>
          </div>
          <ProgressBar value={scorePct} size="md" color={isPassed ? "lime" : "orange"} />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {isPassed ? (
            <Button
              href={`/materials/${assessment.materialSlug}/complete`}
              size="lg"
              variant="accent"
              icon={<Sparkles className="h-5 w-5" />}
              iconPosition="right"
            >
              Получить награду (+{assessment.xpReward} XP)
            </Button>
          ) : (
            <>
              <Button onClick={() => { setAnswers({}); setIsSubmitted(false); setCurrentIdx(0); }} size="lg" variant="primary">
                Попробовать снова
              </Button>
              <Button href={`/materials/${assessment.materialSlug}`} size="lg" variant="outline">
                К лекции
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-[#e2e4d8] bg-white p-6 sm:p-10">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="uppercase text-[#71766a]">Вопрос {currentIdx + 1} из {total}</span>
        <span className="text-[#607800]">+{assessment.xpReward} XP</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={currentIdx + 1} max={total} size="sm" color="lime" />
      </div>
      <h2 className="mt-6 text-xl font-black text-[#171914]">{currentQ.question}</h2>
      <div className="mt-6 space-y-3" role="radiogroup">
        {currentQ.options.map((opt, i) => (
          <button
            key={opt.id}
            role="radio"
            aria-checked={selectedOptId === opt.id}
            onClick={() => handleSelect(opt.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left font-bold transition-all",
              selectedOptId === opt.id
                ? "border-[#171914] bg-[#f0f1e8] text-[#171914]"
                : "border-[#e2e4d8] bg-[#fbfbf9] text-[#171914] hover:border-[#171914]"
            )}
          >
            <span className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black",
              selectedOptId === opt.id ? "bg-[#171914] text-white" : "bg-black/5 text-[#55594e]"
            )}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-[#f0f1e8] pt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
          disabled={currentIdx === 0}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Назад
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            if (currentIdx < total - 1) setCurrentIdx((p) => p + 1);
            else setIsSubmitted(true);
          }}
          disabled={!selectedOptId}
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
        >
          {currentIdx === total - 1 ? "Завершить тест" : "Далее"}
        </Button>
      </div>
    </div>
  );
}
