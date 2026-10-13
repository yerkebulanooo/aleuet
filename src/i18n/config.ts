export type Locale = "kk" | "ru" | "en";

export const defaultLocale: Locale = "kk";

export const supportedLocales: { code: Locale; label: string; fullLabel: string }[] = [
  { code: "kk", label: "ҚАЗ", fullLabel: "Қазақша" },
  { code: "ru", label: "РУС", fullLabel: "Русский" },
  { code: "en", label: "ENG", fullLabel: "English" },
];

export const LOCALE_STORAGE_KEY = "aleuet_locale";
