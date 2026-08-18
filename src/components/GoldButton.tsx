import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium tracking-wide transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  gold:
    "bg-[image:var(--gradient-gold)] text-ink hover:shadow-[var(--shadow-gold)] hover:brightness-110",
  outline:
    "border border-gold/45 text-bone hover:border-gold hover:bg-gold/10 hover:text-gold-soft",
  ghost: "text-bone/80 hover:text-gold",
  dark: "bg-charcoal text-bone border border-gold/20 hover:border-gold/50 hover:bg-warm-charcoal",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-6 text-[0.9rem]",
  lg: "h-14 px-9 text-[0.95rem]",
};

export const GoldButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "gold", size = "md", children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], "rounded-sm", className)}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  ),
);
GoldButton.displayName = "GoldButton";
