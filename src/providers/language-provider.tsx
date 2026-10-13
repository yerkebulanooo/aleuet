"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, defaultLocale, LOCALE_STORAGE_KEY } from "@/i18n/config";
import { Dictionary } from "@/i18n/types";
import { dictionaries, getDictionary } from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isDemoMode: boolean;
  setIsDemoMode: (enabled: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEMO_MODE_STORAGE_KEY = "aleuet_demo_mode";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isDemoMode, setIsDemoModeState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // Hydrate browser preferences after SSR to keep the first render consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    // 1. Determine initial locale
    try {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (savedLocale && (savedLocale === "kk" || savedLocale === "ru" || savedLocale === "en")) {
        setLocaleState(savedLocale);
      } else {
        const browserLang = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
        if (browserLang.startsWith("ru")) {
          setLocaleState("ru");
        } else if (browserLang.startsWith("en")) {
          setLocaleState("en");
        } else {
          setLocaleState("kk");
        }
      }
    } catch {
      setLocaleState(defaultLocale);
    }

    // 2. Determine initial demo mode status (default is false / Guest mode)
    try {
      const savedDemo = localStorage.getItem(DEMO_MODE_STORAGE_KEY);
      if (savedDemo !== null) {
        setIsDemoModeState(savedDemo === "true");
      }
    } catch {
      setIsDemoModeState(false);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // ignore
    }
  };

  const setIsDemoMode = (enabled: boolean) => {
    setIsDemoModeState(enabled);
    try {
      localStorage.setItem(DEMO_MODE_STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isMounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, isMounted]);

  const dictionary = dictionaries[locale] || getDictionary(defaultLocale);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: dictionary,
        isDemoMode,
        setIsDemoMode,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
