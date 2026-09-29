import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import { materials } from "@/data/materials";
import { topics } from "@/data/topics";
import { products } from "@/data/products";
import { events } from "@/data/events";
import { VideoPlayerMock } from "@/components/materials/VideoPlayerMock";
import { LearningOutcomes } from "@/components/materials/LearningOutcomes";
import { ResourcesList } from "@/components/materials/ResourcesList";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatMinutes } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const material = materials.find((m) => m.slug === slug);

  if (!material) notFound();

  const topic = topics.find((t) => t.id === material.topicId);
  const nextMat = material.nextMaterialSlug ? materials.find((m) => m.slug === material.nextMaterialSlug) : null;
  const relProd = material.relatedProductSlug ? products[material.relatedProductSlug] : null;
  const relEvent = material.relatedEventSlug ? events.find((e) => e.slug === material.relatedEventSlug) : null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 sm:py-10 md:px-8">
      <div className="flex items-center justify-between text-xs font-bold text-[#71766a]">
        <div className="flex items-center gap-2">
          <Link href="/catalog" className="hover:text-[#171914]">Каталог</Link>
          <span>/</span>
          <Link href={`/catalog?topic=${topic?.id}`} className="hover:text-[#171914]">{topic?.title}</Link>
        </div>
        <Badge variant="lime" size="sm">+{material.xpReward} XP</Badge>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-black text-[#171914] sm:text-4xl md:text-5xl">{material.title}</h1>
        <p className="mt-2 text-base text-[#5c6055]">{material.subtitle}</p>
        <div className="mt-4 flex items-center gap-3 text-xs font-bold text-[#5c6055]">
          <span>{material.author.name} · {material.author.role}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {formatMinutes(material.durationMinutes)}</span>
        </div>
      </div>

      <div className="mt-8">
        <VideoPlayerMock video={material.video} title={material.title} initialProgressSeconds={material.lastWatchedSeconds || 0} />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-8">
          <div className="rounded-[1.75rem] border border-[#e2e4d8] bg-white p-6 sm:p-8">
            <h3 className="text-lg font-black text-[#171914]">О материале</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5c6055]">{material.summary}</p>
          </div>
          <LearningOutcomes outcomes={material.learningOutcomes} />
          <ResourcesList resources={material.resources} />
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-[#171914] p-6 text-white sm:p-7">
            <span className="rounded-full bg-[#d8f06a] px-3 py-1 text-xs font-black text-[#171914]">Шаг 2 · Проверка</span>
            <h3 className="mt-4 text-xl font-black">Подтвердите понимание</h3>
            <p className="mt-2 text-xs text-white/70">Ответьте на вопросы теста, чтобы закрепить материал и получить +{material.xpReward} XP.</p>
            <div className="mt-6">
              <Button href={`/materials/${material.slug}/assessment`} variant="accent" size="lg" fullWidth icon={<Sparkles className="h-4 w-4" />} iconPosition="right">
                Пройти проверку (+{material.xpReward} XP)
              </Button>
            </div>
          </div>

          {nextMat && (
            <div className="rounded-[2rem] border border-[#e2e4d8] bg-white p-6 sm:p-7">
              <p className="text-xs font-black uppercase text-[#71766a]">Следующий урок</p>
              <h4 className="mt-2 text-base font-black text-[#171914]">{nextMat.title}</h4>
              <div className="mt-4 flex items-center justify-between border-t border-[#f0f1e8] pt-4">
                <span className="text-xs font-bold text-[#71766a]">{formatMinutes(nextMat.durationMinutes)}</span>
                <Link href={`/materials/${nextMat.slug}`} className="flex items-center gap-1 text-xs font-bold text-[#171914] hover:underline">
                  <span>Перейти</span> <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {relEvent && (
            <div className="rounded-[2rem] border border-[#a7dcff] bg-[#eef7ff] p-6 text-[#171914]">
              <Badge variant="sky" size="sm">Практика к теме</Badge>
              <h4 className="mt-2 text-base font-black">{relEvent.title}</h4>
              <p className="mt-1 text-xs text-[#5c6055]">{relEvent.date} · {relEvent.city}</p>
              <div className="mt-4">
                <Button href={`/events/${relEvent.slug}`} variant="outline" size="sm" fullWidth>Узнать о воркшопе</Button>
              </div>
            </div>
          )}

          {relProd && (
            <div className="rounded-[2rem] border border-[#ffd6a5] bg-[#fff8f0] p-6 text-[#171914]">
              <Badge variant="peach" size="sm">{relProd.tag}</Badge>
              <h4 className="mt-2 text-base font-black">{relProd.title}</h4>
              <div className="mt-4">
                <Button href={`/products/${relProd.slug}`} variant="outline" size="sm" fullWidth>Подробнее о программе</Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
