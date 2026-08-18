import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "start",
  tone = "dark",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-gold/70" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-3xl leading-[1.25] sm:text-4xl md:text-5xl",
          tone === "light" ? "text-ink" : "text-bone",
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-[0.95rem] leading-relaxed",
            align === "center" && "mx-auto",
            tone === "light" ? "text-ink/70" : "text-muted-foreground",
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
