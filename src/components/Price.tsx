import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";
import type { Lang } from "@/types";

const priceFormatters: Record<Lang, Intl.NumberFormat> = {
  ar: new Intl.NumberFormat("ar-JO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  en: new Intl.NumberFormat("en-JO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

export function formatPrice(value: number, lang: Lang = "en") {
  return priceFormatters[lang].format(value);
}

export function Price({ value, className }: { value: number; className?: string }) {
  const { L, lang, dir } = useLang();
  return (
    <span className={cn("inline-flex items-baseline gap-1 tabular-nums", className)} dir={dir}>
      <bdi dir="auto">{formatPrice(value, lang)}</bdi>
      <span className="text-[0.7em] text-gold/80">
        <bdi dir="auto">{L("د.أ", "JOD")}</bdi>
      </span>
    </span>
  );
}
