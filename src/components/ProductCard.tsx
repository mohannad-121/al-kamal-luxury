import { Plus } from "lucide-react";
import { FoodImage } from "./FoodImage";
import { Price } from "./Price";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  product: Product;
  onOpen: (p: Product) => void;
  layout?: "tall" | "wide" | "feature";
  className?: string;
}

export function ProductCard({ product, onOpen, layout = "tall", className }: Props) {
  const { L } = useLang();
  const price = product.price - (product.discount ?? 0);

  const badge = (
    <>
      {product.popular ? (
        <span className="border border-gold/50 bg-ink/70 px-2.5 py-1 text-[0.62rem] tracking-[0.2em] text-gold backdrop-blur">
          {L("الأكثر طلباً", "POPULAR")}
        </span>
      ) : null}
      {!product.available ? (
        <span className="border border-bone/30 bg-ink/80 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] text-bone/70 backdrop-blur">
          {L("غير متوفر", "SOLD OUT")}
        </span>
      ) : null}
    </>
  );

  const addBtn = (
    <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold/40 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
      <Plus className="h-4 w-4" />
    </span>
  );

  if (layout === "wide") {
    return (
      <button
        onClick={() => onOpen(product)}
        className={cn(
          "group flex w-full items-stretch gap-4 border border-border bg-charcoal/40 p-3 text-start transition-all duration-500 hover:border-gold/45 hover:bg-charcoal/70",
          className,
        )}
      >
        <FoodImage
          src={product.image}
          alt={L(product.nameAr, product.nameEn)}
          className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
        />
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <span className="flex flex-wrap items-center gap-2">
            <span className="truncate font-display text-base text-bone">
              {L(product.nameAr, product.nameEn)}
            </span>
            {badge}
          </span>
          <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {L(product.descAr, product.descEn)}
          </span>
          <span className="mt-1 text-gold">
            <Price value={price} />
          </span>
        </span>
        <span className="flex items-center pe-1">{addBtn}</span>
      </button>
    );
  }

  if (layout === "feature") {
    return (
      <button
        onClick={() => onOpen(product)}
        className={cn(
          "group relative block w-full overflow-hidden border border-gold/20 text-start",
          className,
        )}
      >
        <FoodImage
          src={product.image}
          alt={L(product.nameAr, product.nameEn)}
          className="aspect-[4/5] w-full sm:aspect-[16/12]"
        />
        <span className="pointer-events-none absolute inset-0 veil" />
        <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="flex flex-wrap items-center gap-2">{badge}</span>
          <span className="mt-3 block font-display text-2xl text-bone sm:text-3xl">
            {L(product.nameAr, product.nameEn)}
          </span>
          <span className="mt-2 block max-w-md text-sm text-bone/70">
            {L(product.descAr, product.descEn)}
          </span>
          <span className="mt-4 flex items-center justify-between">
            <span className="text-lg text-gold">
              <Price value={price} />
            </span>
            {addBtn}
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onOpen(product)}
      className={cn(
        "group flex w-full flex-col border border-border bg-charcoal/40 text-start transition-all duration-500 hover:border-gold/45",
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <FoodImage
          src={product.image}
          alt={L(product.nameAr, product.nameEn)}
          className="aspect-[5/4] w-full"
        />
        <span className="absolute start-3 top-3 flex flex-col items-start gap-1">{badge}</span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="font-display text-lg leading-snug text-bone">
          {L(product.nameAr, product.nameEn)}
        </span>
        <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {L(product.descAr, product.descEn)}
        </span>
        <span className="mt-auto flex items-center justify-between pt-5">
          <span className="text-gold">
            <Price value={price} />
            {product.discount ? (
              <span className="ms-2 text-xs text-muted-foreground line-through">
                {product.price.toFixed(2)}
              </span>
            ) : null}
          </span>
          {addBtn}
        </span>
      </span>
    </button>
  );
}
