"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Sparkles, Video } from "lucide-react";
import { VideoAsset } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

interface VideoProps {
  video: VideoAsset;
  title: string;
  initialProgressSeconds?: number;
  onProgressUpdate?: (seconds: number) => void;
  onComplete?: () => void;
}

export function VideoPlayerMock({
  video,
  title,
  initialProgressSeconds = 0,
  onProgressUpdate,
  onComplete,
}: VideoProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sec, setSec] = useState(initialProgressSeconds);
  const [isMuted, setIsMuted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(initialProgressSeconds >= video.durationSeconds && initialProgressSeconds > 0);


  const duration = video.durationSeconds;
  const pct = Math.min(100, (sec / duration) * 100);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSec((prev) => {
          if (prev + 5 >= duration) {
            setIsPlaying(false);
            setHasCompleted(true);
            onComplete?.();
            return duration;
          }
          const next = prev + 5;
          onProgressUpdate?.(next);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, onComplete, onProgressUpdate]);

  const seek = (s: number) => {
    const val = Math.max(0, Math.min(duration, s));
    setSec(val);
    onProgressUpdate?.(val);
    if (val >= duration) {
      setHasCompleted(true);
      setIsPlaying(false);
      onComplete?.();
    }
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[#141612] dark:bg-[#0d100c] border border-[#2e3528] text-white shadow-xl">
      <div className="relative flex aspect-video w-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-[#d8f06a]" />
              {t.pages.material.videoPlayerBadge}
            </span>
            <h2 className="mt-2 line-clamp-1 text-sm font-bold text-white sm:text-lg">{title}</h2>
          </div>
          {hasCompleted && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#d8f06a] px-3 py-1 text-xs font-bold text-[#171914]">
              <CheckCircle className="h-4 w-4" />
              <span>{t.pages.complete.badge}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center text-center px-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Пауза" : "Ойнату"}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f06a] text-[#171914] transition-all hover:scale-105 active:scale-95 sm:h-20 sm:w-20"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="ml-1 h-8 w-8 fill-current" />}
          </button>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-black/40 px-3 py-1 rounded-full">
            <Video className="h-3.5 w-3.5 text-[#d8f06a]" />
            <span>{t.pages.material.videoPlaceholderTitle}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              seek(Math.floor(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration));
            }}
            className="relative h-3 w-full cursor-pointer py-1"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#d8f06a]" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-white/80">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:text-white" aria-label="Ойнату">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button onClick={() => seek(0)} className="p-1 hover:text-white" aria-label="Басына">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-white" aria-label="Дыбыс">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <span>{fmt(sec)} / {fmt(duration)}</span>
            </div>
            <button
              onClick={() => seek(duration)}
              className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold hover:bg-white/25"
            >
              100% аяқтау (Демо)
            </button>
          </div>
        </div>
      </div>

      {video.chapters && video.chapters.length > 0 && (
        <div className="border-t border-white/10 bg-[#1c1f19] dark:bg-[#131611] p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-white/50">
            {t.pages.material.chaptersTitle}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {video.chapters.map((ch) => (
              <button
                key={ch.timestamp}
                onClick={() => seek(ch.timestamp)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2 text-left text-xs font-bold transition-all",
                  sec >= ch.timestamp ? "bg-[#d8f06a] text-[#171914]" : "bg-white/5 text-white/80 hover:bg-white/10"
                )}
              >
                <span className="line-clamp-1">{ch.title}</span>
                {sec >= ch.timestamp && <Sparkles className="ml-2 h-3 w-3 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
