import { Locale, defaultLocale } from "./config";
import { Dictionary } from "./types";
import { kk } from "./dictionaries/kk";
import { ru } from "./dictionaries/ru";
import { en } from "./dictionaries/en";

export * from "./config";
export * from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  kk,
  ru,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
