"use client";

import React, { useState } from "react";
import { BookOpen, Compass, CheckCircle2, Clock } from "lucide-react";
import { materials } from "@/data/materials";
import { learningRoutes } from "@/data/routes";
import { currentUser } from "@/data/user";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { RouteCard } from "@/components/learning/RouteCard";
import { ActivityHistory } from "@/components/learning/ActivityHistory";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/providers/language-provider";

export default function LearningPage() {
  const { t } = useLanguage();
  const d = t.pages.learning;
  const [activeTab, setActiveTab] = useState("current");

  const inProgressMaterials = materials.filter((m) => m.status === "in_progress");
  const completedMaterials = materials.filter((m) => m.status === "completed");

  const tabs = [
    { id: "current", label: d.tabInProgress, count: inProgressMaterials.length },
    { id: "routes", label: d.tabRoutes, count: learningRoutes.length },
    { id: "completed", label: d.tabCompleted, count: completedMaterials.length },
    { id: "history", label: d.tabHistory },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
      {/* Header with quick stats */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d8f06a] px-3.5 py-1 text-xs font-black uppercase text-[#3e5000]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{d.badge}</span>
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171914] sm:text-4xl">
            {d.title}
          </h1>
          <p className="mt-1 text-sm text-[#5c6055]">
            {d.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            href="/catalog"
            variant="outline"
            size="md"
            icon={<Compass className="h-4 w-4" />}
          >
            {d.findCourseBtn}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-8 border-b border-[#e2e4d8]">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />
      </div>

      {/* Tab Contents */}
      <div className="mt-8">
        {/* TAB 1: In Progress */}
        {activeTab === "current" && (
          <div>
            {inProgressMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgressMaterials.map((mat) => (
                  <MaterialCard key={mat.id} material={mat} />
                ))}
              </div>
            ) : (
              <div className="rounded-[2.5rem] border border-[#e2e4d8] bg-white p-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-[#71766a]" />
                <h3 className="mt-4 text-xl font-black text-[#171914]">
                  {d.emptyInProgressTitle}
                </h3>
                <p className="mt-2 text-sm text-[#5c6055]">
                  {d.emptyInProgressDesc}
                </p>
                <div className="mt-6 flex justify-center">
                  <Button href="/catalog" variant="primary" size="md">
                    {d.goToCatalogBtn}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Learning Routes */}
        {activeTab === "routes" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learningRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}

        {/* TAB 3: Completed */}
        {activeTab === "completed" && (
          <div>
            {completedMaterials.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completedMaterials.map((mat) => (
                  <MaterialCard key={mat.id} material={mat} />
                ))}
              </div>
            ) : (
              <div className="rounded-[2.5rem] border border-[#e2e4d8] bg-white p-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#71766a]" />
                <h3 className="mt-4 text-xl font-black text-[#171914]">
                  Пока нет завершённых материалов
                </h3>
                <p className="mt-2 text-sm text-[#5c6055]">
                  Пройдите лекцию до конца и сдайте проверочный тест.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button href="/catalog" variant="primary" size="md">
                    Выбрать материал
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: History */}
        {activeTab === "history" && (
          <div className="mx-auto max-w-3xl">
            <ActivityHistory items={currentUser.activityHistory} />
          </div>
        )}
      </div>
    </div>
  );
}
