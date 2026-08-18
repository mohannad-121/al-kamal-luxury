import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/types";

interface LangCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggle: () => void;
  L: (ar: string, en: string) => string;
}

const Ctx = createContext<LangCtx | null>(null);
const KEY = "alkamal.lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem(KEY, lang);
  }, [lang]);

  const toggle = useCallback(() => setLang((p) => (p === "ar" ? "en" : "ar")), []);
  const L = useCallback((ar: string, en: string) => (lang === "ar" ? ar : en), [lang]);

  const value = useMemo<LangCtx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", toggle, L }),
    [lang, toggle, L],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
