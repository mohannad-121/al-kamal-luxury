import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (reducedMotion?.matches || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -2% 0px" },
    );

    const revealOnReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setShown(true);
        io.disconnect();
      }
    };

    reducedMotion?.addEventListener("change", revealOnReducedMotion);
    io.observe(el);
    return () => {
      reducedMotion?.removeEventListener("change", revealOnReducedMotion);
      io.disconnect();
    };
  }, []);

  const Tag = as as "div";
  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        shown && "reveal-in",
        className,
      )}
      style={{ transitionDelay: `${safeDelay}ms` }}
    >
      {children}
    </Tag>
  );
}
