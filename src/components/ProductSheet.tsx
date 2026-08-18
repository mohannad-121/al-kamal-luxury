import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { FoodImage } from "./FoodImage";
import { GoldButton } from "./GoldButton";
import { Price } from "./Price";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";
import type { CartExtra, Product } from "@/types";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductSheet({ product, onClose }: Props) {
  const { L } = useLang();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [chosen, setChosen] = useState<string[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    setQty(1);
    setChosen([]);
    setNote("");
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const extras: CartExtra[] = useMemo(
    () => (product?.extras ?? []).filter((e) => chosen.includes(e.id)),
    [product, chosen],
  );

  if (!product) return null;

  const unit = product.price - (product.discount ?? 0) + extras.reduce((s, e) => s + e.price, 0);

  const submit = () => {
    add({ product, qty, extras, ...(note.trim() ? { note: note.trim() } : {}) });
    toast.success(L("تمت الإضافة لطلبك", "Added to your order"), {
      description: L(product.nameAr, product.nameEn),
    });
    onClose();
    setTimeout(() => setOpen(true), 250);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <button
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/85 backdrop-blur-md animate-in fade-in duration-500"
      />
      <div
        className="relative z-10 flex max-h-[calc(100dvh-env(safe-area-inset-top))] w-full flex-col overflow-hidden rounded-t-2xl border border-gold/25 bg-[color:var(--ink)] shadow-[var(--shadow-lux)] sm:max-h-[88vh] sm:max-w-4xl sm:flex-row sm:rounded-none"
        style={{ animation: "sheet-up .6s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <button
          onClick={onClose}
          className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center border border-gold/30 bg-ink/70 text-bone backdrop-blur transition-colors hover:border-gold hover:text-gold"
          aria-label={L("إغلاق", "Close")}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-48 shrink-0 sm:h-auto sm:w-[45%]">
          <FoodImage
            src={product.image}
            alt={L(product.nameAr, product.nameEn)}
            className="h-full w-full"
            zoom={false}
            eager
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 veil sm:hidden" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-5 sm:p-8">
          <span className="eyebrow">{product.nameEn}</span>
          <h3 className="mt-2 text-2xl text-bone sm:text-3xl">
            {L(product.nameAr, product.nameEn)}
          </h3>
          <div className="mt-3 h-px w-14 bg-gold/60" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {L(product.descAr, product.descEn)}
          </p>

          {product.extras?.length ? (
            <div className="mt-7">
              <p className="text-xs tracking-[0.2em] text-gold/90">
                {L("إضافات اختيارية", "OPTIONAL EXTRAS")}
              </p>
              <div className="mt-3 grid gap-2">
                {product.extras.map((e) => {
                  const on = chosen.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() =>
                        setChosen((prev) => (on ? prev.filter((x) => x !== e.id) : [...prev, e.id]))
                      }
                      className={cn(
                        "flex items-center justify-between border px-4 py-3 text-sm transition-all duration-400",
                        on
                          ? "border-gold/70 bg-gold/10 text-gold-soft"
                          : "border-border bg-charcoal/60 text-bone/80 hover:border-gold/40",
                      )}
                    >
                      <span>{L(e.nameAr, e.nameEn)}</span>
                      <span className="text-xs">
                        + <Price value={e.price} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-7">
            <p className="text-xs tracking-[0.2em] text-gold/90">{L("ملاحظات", "NOTES")}</p>
            <textarea
              value={note}
              onChange={(ev) => setNote(ev.target.value)}
              rows={2}
              placeholder={L("مثلاً: بدون بصل، شطة على جنب", "e.g. no onion, chili aside")}
              className="mt-3 w-full resize-none border border-border bg-charcoal/60 px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold/60"
            />
          </div>

          <div className="sticky bottom-0 -mx-4 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border bg-ink/95 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:static sm:mx-0 sm:border-t sm:bg-transparent sm:p-0 sm:pt-6">
            <div className="flex items-center border border-gold/30">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-bone transition-colors hover:text-gold"
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-lg tabular-nums text-bone">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(30, q + 1))}
                className="grid h-11 w-11 place-items-center text-bone transition-colors hover:text-gold"
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <GoldButton
              size="lg"
              disabled={!product.available}
              onClick={submit}
              className="flex-1 min-w-[200px]"
            >
              {product.available ? (
                <>
                  {L("أضف للطلب", "Add to order")}
                  <span className="mx-1 opacity-40">•</span>
                  <Price value={unit * qty} />
                </>
              ) : (
                L("غير متوفر حالياً", "Currently unavailable")
              )}
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}
