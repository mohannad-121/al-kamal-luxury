import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "relative inline-flex touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-[var(--control-radius)] border font-semibold tracking-[0.015em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/75 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:active:transform-none motion-reduce:transition-none motion-reduce:active:transform-none";

const variants: Record<Variant, string> = {
  gold: "border-gold-soft/55 bg-[linear-gradient(180deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_7px_18px_-14px_oklch(0.716_0.107_78.5/.8)] hover:border-gold-soft hover:brightness-[1.04] hover:shadow-[0_9px_22px_-15px_oklch(0.716_0.107_78.5/.75)]",
  outline:
    "border-gold/40 bg-transparent text-bone hover:border-gold/65 hover:bg-gold/[.07] hover:text-gold-soft",
  ghost: "border-transparent bg-transparent text-bone/75 hover:bg-gold/[.06] hover:text-gold-soft",
  dark: "border-gold/20 bg-charcoal text-bone hover:border-gold/40 hover:bg-warm-charcoal",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.78rem]",
  md: "h-11 px-5 text-[0.86rem]",
  lg: "h-13 px-7 text-[0.92rem] sm:px-8",
};

export const GoldButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "gold", size = "md", children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span className="flex items-center justify-center gap-2 [&_svg]:shrink-0">{children}</span>
    </button>
  ),
);
GoldButton.displayName = "GoldButton";
