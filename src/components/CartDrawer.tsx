import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { FoodImage } from "./FoodImage";
import { GoldButton } from "./GoldButton";
import { Price } from "./Price";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "@/hooks/use-lang";

export function CartDrawer() {
  const { L } = useLang();
  const cart = useCart();

  useEffect(() => {
    document.body.style.overflow = cart.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.open]);

  if (!cart.open) return null;

  return (
    <div className="fixed inset-0 z-[95]">
      <button
        aria-label={L("إغلاق السلة", "Close cart")}
        onClick={() => cart.setOpen(false)}
        className="absolute inset-0 bg-ink/85 backdrop-blur-md animate-in fade-in duration-400"
      />
      <aside className="absolute inset-y-0 end-0 flex w-full flex-col border-s border-gold/25 bg-[color:var(--ink)] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-lux)] animate-in slide-in-from-bottom-8 duration-500 sm:max-w-md sm:pb-0 sm:slide-in-from-bottom-0">
        <header className="flex items-center justify-between border-b border-border px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-5">
          <div>
            <p className="eyebrow">{L("السلة", "CART")}</p>
            <h2 className="mt-1 text-xl text-bone">{L("طلبك", "Your order")}</h2>
          </div>
          <button
            onClick={() => cart.setOpen(false)}
            className="grid h-10 w-10 place-items-center border border-gold/25 text-bone transition-colors hover:border-gold hover:text-gold"
            aria-label={L("إغلاق", "Close")}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border border-gold/25 text-gold">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-xl text-bone">{L("السلة فاضية", "Your cart is empty")}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {L("اختار اللي بدك إياه من المنيو.", "Choose what you want from the menu.")}
            </p>
            <Link to="/menu" onClick={() => cart.setOpen(false)} className="mt-7 w-full">
              <GoldButton className="w-full" size="lg">
                {L("تصفح المنيو", "Browse the menu")}
              </GoldButton>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <ul className="space-y-4">
                {cart.lines.map((line) => (
                  <li key={line.lineId} className="flex gap-3 border-b border-border/70 pb-4">
                    <FoodImage
                      src={line.image}
                      alt={L(line.nameAr, line.nameEn)}
                      className="h-20 w-20 shrink-0"
                      zoom={false}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-display text-sm text-bone">
                          {L(line.nameAr, line.nameEn)}
                        </p>
                        <button
                          onClick={() => cart.remove(line.lineId)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={L("حذف", "Remove")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {line.extras.length ? (
                        <p className="mt-1 text-[0.7rem] text-gold/80">
                          {line.extras.map((e) => L(e.nameAr, e.nameEn)).join(" · ")}
                        </p>
                      ) : null}
                      {line.note ? (
                        <p className="mt-1 line-clamp-1 text-[0.7rem] text-muted-foreground">
                          “{line.note}”
                        </p>
                      ) : null}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-gold/25">
                          <button
                            onClick={() => cart.setQty(line.lineId, line.qty - 1)}
                            className="grid h-8 w-8 place-items-center text-bone transition-colors hover:text-gold"
                            aria-label={L("تقليل الكمية", "Decrease quantity")}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums text-bone">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => cart.setQty(line.lineId, line.qty + 1)}
                            className="grid h-8 w-8 place-items-center text-bone transition-colors hover:text-gold"
                            aria-label={L("زيادة الكمية", "Increase quantity")}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm text-gold">
                          <Price value={line.unitPrice * line.qty} />
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-border bg-charcoal/40 px-4 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>{L("المجموع", "Subtotal")}</dt>
                  <dd>
                    <Price value={cart.subtotal} />
                  </dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>{L("التوصيل", "Delivery")}</dt>
                  <dd>
                    <Price value={cart.delivery} />
                  </dd>
                </div>
                {cart.discount > 0 ? (
                  <div className="flex justify-between text-gold">
                    <dt>{L("خصم تجريبي", "Demo discount")}</dt>
                    <dd>
                      − <Price value={cart.discount} />
                    </dd>
                  </div>
                ) : null}
                <div className="hairline my-3" />
                <div className="flex items-baseline justify-between">
                  <dt className="font-display text-base text-bone">{L("الإجمالي", "Total")}</dt>
                  <dd className="font-display text-xl text-gold">
                    <Price value={cart.total} />
                  </dd>
                </div>
              </dl>
              <Link to="/checkout" onClick={() => cart.setOpen(false)}>
                <GoldButton className="mt-5 w-full" size="lg">
                  {L("إتمام الطلب", "Checkout")}
                </GoldButton>
              </Link>
              <p className="mt-3 text-center text-[0.68rem] text-muted-foreground">
                {L("الأسعار تجريبية", "Demo prices")}
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
