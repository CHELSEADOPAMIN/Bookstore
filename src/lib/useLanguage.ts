"use client";

import { useEffect, useState } from "react";

export type Lang = "en" | "zh";

export function getStoredLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("local-books-lang") === "zh" ? "zh" : "en";
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    setLang(getStoredLanguage());
    const update = () => setLang(getStoredLanguage());
    window.addEventListener("local-books-language-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("local-books-language-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return lang;
}
