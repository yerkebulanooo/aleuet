export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  const result: string[] = [];

  for (const item of classes) {
    if (!item) continue;
    if (typeof item === "string") {
      result.push(item);
    } else if (typeof item === "object") {
      for (const [key, value] of Object.entries(item)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(" ");
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${minutes} мин`;
  }
  if (remainingMinutes === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${remainingMinutes} мин`;
}

export function formatXP(xp: number): string {
  return `${xp.toLocaleString("ru-RU")} XP`;
}

