"use client";

import React, { useState } from "react";
import { Award, Flame, Sparkles } from "lucide-react";
import { currentUser } from "@/data/user";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";



export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Обзор" },
    { id: "achievements", label: "Достижения", count: currentUser.achievements.length },
    { id: "works", label: "Работы", count: currentUser.savedWorks.length },
    { id: "settings", label: "Настройки" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <div className="rounded-[2.5rem] bg-[#171914] p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8f06a] text-lg font-black text-[#171914]">
              {currentUser.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{currentUser.name}</h1>
                <Badge variant="lime" size="sm">Ур. {currentUser.level}</Badge>
              </div>
              <p className="text-xs text-white/70">{currentUser.grade} · {currentUser.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-center text-xs font-bold text-[#ffd6a5]">
              <Flame className="h-3.5 w-3.5 fill-current text-[#d96500]" />
              <span>{currentUser.streakDays} дн</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-center text-xs font-bold text-[#d8f06a]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{currentUser.currentXP} XP</span>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="flex justify-between text-xs font-bold text-white/80 mb-1.5">
            <span>{currentUser.levelTitle}</span>
            <span>{currentUser.currentXP}/{currentUser.nextLevelXP} XP</span>
          </div>
          <ProgressBar value={currentUser.currentXP} max={currentUser.nextLevelXP} size="sm" color="lime" />
        </div>
      </div>

      <div className="mt-6 border-b border-[#e2e4d8]">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />
      </div>

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {currentUser.topicsProgress.map((tp) => (
              <div key={tp.topicId} className="rounded-2xl border border-[#e2e4d8] bg-white p-4">
                <div className="flex justify-between mb-2 text-sm font-bold">
                  <span>{tp.topicTitle}</span>
                  <span className="text-xs text-[#5c6055]">{tp.completedCount}/{tp.totalCount}</span>
                </div>
                <ProgressBar value={tp.percent} size="sm" color="lime" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentUser.achievements.map((ach) => (
              <div key={ach.id} className="rounded-2xl border border-[#e2e4d8] bg-white p-4">
                <div className="flex justify-between items-center">
                  <Award className="h-6 w-6 text-[#4d6300]" />
                  <Badge variant={ach.unlockedAt ? "success" : "neutral"} size="sm">{ach.unlockedAt ? "Получено" : "Закрыто"}</Badge>
                </div>
                <h4 className="mt-2 font-black text-sm">{ach.title}</h4>
                <p className="text-xs text-[#5c6055]">{ach.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "works" && (
          <div className="space-y-3">
            {currentUser.savedWorks.map((w) => (
              <div key={w.id} className="rounded-2xl border border-[#e2e4d8] bg-white p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">{w.title}</h4>
                    <p className="text-xs text-[#5c6055]">{w.materialTitle} · {w.date}</p>
                  </div>
                  <Badge variant="success" size="sm">{w.statusLabel}</Badge>
                </div>
                {w.feedback && <p className="mt-2 text-xs bg-[#f7f7f2] p-2 rounded-lg">{w.feedback}</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="rounded-2xl border border-[#e2e4d8] bg-white p-5 space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2"><span>Язык интерфейса</span><span className="font-bold">Русский</span></div>
            <div className="flex justify-between border-b pb-2"><span>Уведомления</span><span className="font-bold text-[#3e5000]">Включены</span></div>
            <div className="flex justify-between"><span>Приватность</span><span className="font-bold">Только менторы</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
