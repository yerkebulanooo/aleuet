"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle, PlayCircle } from "lucide-react";
import type { VideoChapter } from "@/types";
import { cn } from "@/lib/utils";
import { formatTimestamp } from "@/lib/video";
import { useLanguage } from "@/providers/language-provider";

/** Minimal subset of the YouTube IFrame Player API that we use. */
interface YTPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  destroy(): void;
}
interface YTNamespace {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    host?: string;
    playerVars?: Record<string, string | number>;
    events?: { onReady?: () => void; onStateChange?: (event: { data: number }) => void };
  }) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}
declare global {
  interface Window { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previous?.(); if (window.YT) resolve(window.YT); };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => { apiPromise = null; reject(new Error("YouTube API failed to load")); };
    document.head.appendChild(script);
  });
  return apiPromise;
}

/** A lecture counts as watched once the viewer reaches this share of its length. */
export const WATCHED_THRESHOLD = 0.9;
const REPORT_INTERVAL_MS = 5000;

export interface YouTubePlayerProps {
  videoId: string;
  title: string;
  chapters: VideoChapter[];
  startSeconds?: number;
  completed?: boolean;
  /** Called every few seconds while playing, on pause and on unmount. */
  onProgress?: (positionSeconds: number, durationSeconds: number) => void;
  /** Called once when the viewer passes WATCHED_THRESHOLD or the video ends. */
  onWatched?: () => void;
}

export function YouTubePlayer({ videoId, title, chapters, startSeconds = 0, completed = false, onProgress, onWatched }: YouTubePlayerProps) {
  const { t } = useLanguage();
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const callbacks = useRef({ onProgress, onWatched });
  const watchedSent = useRef(completed);
  const [position, setPosition] = useState(startSeconds);
  const [failed, setFailed] = useState(false);
  const domId = useId();

  useEffect(() => { callbacks.current = { onProgress, onWatched }; }, [onProgress, onWatched]);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const host = hostRef.current;
    if (!host) return;
    const mount = document.createElement("div");
    host.appendChild(mount);

    const report = () => {
      const player = playerRef.current;
      if (!player) return;
      const current = player.getCurrentTime();
      const duration = player.getDuration();
      if (!Number.isFinite(current) || !duration) return;
      setPosition(current);
      callbacks.current.onProgress?.(current, duration);
      if (!watchedSent.current && current / duration >= WATCHED_THRESHOLD) {
        watchedSent.current = true;
        callbacks.current.onWatched?.();
      }
    };

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(mount, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { rel: 0, playsinline: 1, modestbranding: 1, start: Math.floor(startSeconds) },
        events: {
          onStateChange: ({ data }) => {
            window.clearInterval(timer);
            if (data === YT.PlayerState.PLAYING) timer = window.setInterval(report, REPORT_INTERVAL_MS);
            if (data === YT.PlayerState.PAUSED) report();
            if (data === YT.PlayerState.ENDED) {
              report();
              if (!watchedSent.current) { watchedSent.current = true; callbacks.current.onWatched?.(); }
            }
          },
        },
      });
    }).catch(() => { if (!cancelled) setFailed(true); });

    const onHide = () => { if (document.visibilityState === "hidden") report(); };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onHide);
      try { report(); playerRef.current?.destroy(); } catch { /* player already gone */ }
      playerRef.current = null;
      mount.remove();
    };
    // startSeconds is read only when the player is created; changing it must not reload the video.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const seek = (seconds: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(seconds, true);
    player.playVideo();
    setPosition(seconds);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#2e3528] bg-[#141612] text-white shadow-xl dark:bg-[#0d100c]">
      <div className="relative aspect-video w-full bg-black">
        <div ref={hostRef} id={domId} aria-label={title} className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" />
        {failed && (
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer" className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm font-bold">
            <PlayCircle className="h-12 w-12 text-[#d8f06a]" />
            YouTube
          </a>
        )}
        {completed && (
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#d8f06a] px-3 py-1 text-xs font-bold text-[#171914]">
            <CheckCircle className="h-4 w-4" />
            <span>{t.pages.complete.badge}</span>
          </div>
        )}
      </div>

      {chapters.length > 0 && (
        <div className="border-t border-white/10 bg-[#1c1f19] p-5 dark:bg-[#131611]">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-white/50">{t.pages.material.chaptersTitle}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {chapters.map((chapter, index) => {
              const next = chapters[index + 1]?.timestamp ?? Infinity;
              const active = position >= chapter.timestamp && position < next;
              return (
                <button
                  key={`${chapter.timestamp}-${index}`}
                  onClick={() => seek(chapter.timestamp)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3.5 py-2 text-left text-xs font-bold transition-all",
                    active ? "bg-[#d8f06a] text-[#171914]" : "bg-white/5 text-white/80 hover:bg-white/10",
                  )}
                >
                  <span className="shrink-0 tabular-nums opacity-70">{formatTimestamp(chapter.timestamp)}</span>
                  <span className="line-clamp-1">{chapter.title.replace(/^\d{1,2}:\d{2}(?::\d{2})?\s*[—-]?\s*/, "")}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
