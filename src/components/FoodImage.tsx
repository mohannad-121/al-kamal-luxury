import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  zoom?: boolean;
}

/** Image with placeholder shimmer, correct cropping and lazy loading. */
export function FoodImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  zoom = true,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(110deg,var(--charcoal),var(--warm-charcoal),var(--charcoal))] transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100 animate-soft-pulse",
        )}
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-[1400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
          zoom && "group-hover:scale-[1.07]",
          imgClassName,
        )}
      />
    </div>
  );
}
