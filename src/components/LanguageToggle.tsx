"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/useLanguage";

export function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("local-books-lang") as Lang | null;
    const next = saved === "zh" ? "zh" : "en";
    setLang(next);
    document.documentElement.dataset.lang = next;
  }, []);

  const toggle = () => {
    const next = lang === "en" ? "zh" : "en";
    setLang(next);
    document.documentElement.dataset.lang = next;
    window.localStorage.setItem("local-books-lang", next);
    window.dispatchEvent(new Event("local-books-language-change"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[#15231d]/12 bg-white/55 px-3 text-sm font-black text-[#15231d]"
      aria-label="Switch language"
    >
      <Languages size={16} />
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
