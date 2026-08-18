import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function formatPrice(value: number) {
  return value.toFixed(2);
}

export function Price({ value, className }: { value: number; className?: string }) {
  const { L } = useLang();
  return (
    <span className={cn("inline-flex items-baseline gap-1 tabular-nums", className)}>
      <span>{formatPrice(value)}</span>
      <span className="text-[0.7em] text-gold/80">{L("د.أ", "JOD")}</span>
    </span>
  );
}
