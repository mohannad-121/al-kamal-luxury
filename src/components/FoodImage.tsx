import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  eager?: boolean;
  zoom?: boolean;
}

/** Image with placeholder shimmer, correct cropping and lazy loading. */
export function FoodImage({
  src,
  alt,
  className,
  imgClassName,
  imgStyle,
  eager = false,
  zoom = true,
}: Props) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const loaded = loadedSrc === src;

  // With SSR, an image can finish downloading before React hydrates and
  // attaches onLoad. Check the cached-image state as well so it never remains
  // transparent on the first local page load.
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src]);

  return (
    <div className={cn("group/image relative overflow-hidden bg-charcoal", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,var(--charcoal)_8%,var(--warm-charcoal)_48%,var(--charcoal)_92%)] transition-opacity duration-700 motion-reduce:animate-none motion-reduce:transition-none",
          loaded ? "opacity-0" : "animate-soft-pulse opacity-100",
        )}
      />
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        style={imgStyle}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setLoadedSrc(src)}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform,filter] duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:transition-none",
          loaded ? "scale-100 opacity-100 saturate-100" : "scale-[1.025] opacity-0 saturate-[0.88]",
          zoom && "group-hover/image:scale-[1.055] group-hover/image:saturate-[1.06]",
          imgClassName,
        )}
      />
    </div>
  );
}
