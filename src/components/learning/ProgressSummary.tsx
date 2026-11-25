"use client";

import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useLearnerProgress } from "@/lib/progress";
import { useLanguage } from "@/providers/language-provider";

const copy = {
  kk: { xp: "Жиналған XP", completed: "Аяқталған", inProgress: "Оқылуда", guest: "Прогресс осы құрылғыда сақталады. Аккаунтқа кірсеңіз, ол аккаунтқа көшеді." },
  ru: { xp: "Набрано XP", completed: "Завершено", inProgress: "В процессе", guest: "Прогресс сохраняется на этом устройстве. После входа он перенесётся в аккаунт." },
  en: { xp: "XP earned", completed: "Completed", inProgress: "In progress", guest: "Progress is saved on this device and moves to your account when you sign in." },
} as const;

/** Real XP and material counts for the current learner (account or guest device). */
export function ProgressSummary({ showGuestNote = false }: { showGuestNote?: boolean }) {
  const { locale } = useLanguage();
  const t = copy[locale];
  const { progress, totalXp, ready, signedIn } = useLearnerProgress();
  const completed = progress.filter((entry) => entry.status === "completed").length;
  const inProgress = progress.filter((entry) => entry.status === "in_progress").length;
  const stats = [
    { label: t.xp, value: totalXp, icon: <Sparkles className="h-4 w-4" /> },
    { label: t.completed, value: completed, icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: t.inProgress, value: inProgress, icon: <Clock className="h-4 w-4" /> },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#e2e4d8] bg-white p-4 dark:border-[#2e3528] dark:bg-[#191c16]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#71766a]">{stat.icon}<span>{stat.label}</span></div>
            <p className="mt-1 text-2xl font-black text-[#171914] dark:text-[#f2f4ec]">{ready ? stat.value : "…"}</p>
          </div>
        ))}
      </div>
      {showGuestNote && ready && !signedIn && <p className="mt-2 text-xs text-[#71766a]">{t.guest}</p>}
    </div>
  );
}
