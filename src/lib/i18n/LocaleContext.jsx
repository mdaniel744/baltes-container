"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  translate,
  translateCatalogValue,
} from "./messages";

const STORAGE_KEY = "baltes_locale";
const supportedCodes = new Set(SUPPORTED_LOCALES.map(({ code }) => code));
const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  const setLocale = useCallback((nextLocale) => {
    const safeLocale = supportedCodes.has(nextLocale)
      ? nextLocale
      : DEFAULT_LOCALE;
    setLocaleState(safeLocale);
    window.localStorage.setItem(STORAGE_KEY, safeLocale);
  }, []);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (storedLocale && supportedCodes.has(storedLocale)) {
      const frame = window.requestAnimationFrame(() => {
        setLocaleState(storedLocale);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (storedLocale) {
      window.localStorage.setItem(STORAGE_KEY, DEFAULT_LOCALE);
    }

    return undefined;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translate(locale, "meta.title");
  }, [locale]);

  const t = useCallback(
    (key, variables) => translate(locale, key, variables),
    [locale],
  );
  const catalogLabel = useCallback(
    (value) => translateCatalogValue(locale, value),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, catalogLabel }),
    [catalogLabel, locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}
