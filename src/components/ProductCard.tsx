import { FoodImage } from "./FoodImage";
import { Price } from "./Price";
import { useLang } from "@/hooks/use-lang";
import { useProductSheet } from "@/hooks/use-product-sheet";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  product: Product;
  layout?: "tall" | "wide" | "feature";
  className?: string;
}

export function ProductCard({ product, layout = "tall", className }: Props) {
  const { L } = useLang();
  const { openProduct } = useProductSheet();
  const price = product.price - (product.discount ?? 0);

  const badge = (
    <>
      {product.popular ? (
        <span className="border border-gold/50 bg-ink/70 px-2.5 py-1 text-[0.62rem] tracking-[0.2em] text-gold backdrop-blur">
          {L("الأكثر طلبًا", "POPULAR")}
        </span>
      ) : null}
      {!product.available ? (
        <span className="border border-bone/30 bg-ink/80 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] text-bone/70 backdrop-blur">
          {L("غير متوفر", "NOT AVAILABLE")}
        </span>
      ) : null}
    </>
  );

  if (layout === "wide") {
    return (
      <button
        type="button"
        onClick={() => openProduct(product)}
        aria-label={L(`عرض ${product.nameAr}`, `View ${product.nameEn}`)}
        className={cn(
          "flex w-full items-stretch gap-4 border border-border bg-charcoal/40 p-3 text-start transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
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
      </button>
    );
  }

  if (layout === "feature") {
    return (
      <button
        type="button"
        onClick={() => openProduct(product)}
        aria-label={L(`عرض ${product.nameAr}`, `View ${product.nameEn}`)}
        className={cn(
          "relative block w-full overflow-hidden border border-gold/20 text-start transition-colors hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
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
          <span className="mt-4 block">
            <span className="text-lg text-gold">
              <Price value={price} />
            </span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openProduct(product)}
      aria-label={L(`عرض ${product.nameAr}`, `View ${product.nameEn}`)}
      className={cn(
        "group flex w-full flex-row border border-border bg-charcoal/40 p-3 text-start transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:flex-col sm:p-0",
        className,
      )}
    >
      <span className="relative block w-28 shrink-0 overflow-hidden sm:w-auto">
        <FoodImage
          src={product.image}
          alt={L(product.nameAr, product.nameEn)}
          className="h-full w-full aspect-square sm:aspect-[5/4]"
        />
        <span className="absolute start-3 top-3 flex flex-col items-start gap-1">{badge}</span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col px-4 py-1 sm:p-5">
        <span className="font-display text-lg leading-snug text-bone">
          {L(product.nameAr, product.nameEn)}
        </span>
        <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:mt-2">
          {L(product.descAr, product.descEn)}
        </span>
        <span className="mt-auto flex items-center justify-between pt-2 sm:pt-5">
          <span className="text-gold">
            <Price value={price} />
            {product.discount ? (
              <span className="ms-2 text-xs text-muted-foreground line-through">
                {product.price.toFixed(2)}
              </span>
            ) : null}
          </span>
        </span>
      </span>
    </button>
  );
}
