import type { VideoAsset, VideoChapter } from "@/types";

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

/** Accepts a YouTube URL in any common form (watch, youtu.be, shorts, embed, live) or a bare 11-char id. */
export function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (YOUTUBE_ID.test(value)) return value;
  let url: URL;
  try { url = new URL(value.startsWith("http") ? value : `https://${value}`); } catch { return null; }
  const host = url.hostname.replace(/^www\.|^m\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = url.searchParams.get("v");
    const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
    if (!id && match) id = match[1];
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}

export function hasRealVideo(video: VideoAsset | undefined): video is VideoAsset & { provider: "youtube"; videoId: string } {
  return Boolean(video && video.provider === "youtube" && video.videoId && YOUTUBE_ID.test(video.videoId));
}

export function formatTimestamp(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** Chapters as editable text: one per line, "MM:SS Title" or "H:MM:SS Title". */
export function chaptersToText(chapters: VideoChapter[]) {
  return chapters.map((chapter) => `${formatTimestamp(chapter.timestamp)} ${chapter.title.replace(/^\d{1,2}:\d{2}(?::\d{2})?\s*[—-]?\s*/, "")}`).join("\n");
}

export function textToChapters(text: string): VideoChapter[] {
  return text.split("\n").flatMap((line) => {
    const match = line.trim().match(/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\s*[—-]?\s*(.+)$/);
    if (!match) return [];
    const [, h, m, s, title] = match;
    return [{ timestamp: Number(h ?? 0) * 3600 + Number(m) * 60 + Number(s), title: title.trim().slice(0, 200) }];
  }).sort((a, b) => a.timestamp - b.timestamp);
}
