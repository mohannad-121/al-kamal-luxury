import { Link, useRouterState } from "@tanstack/react-router";
import { Clock3, House, MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { L } = useLang();
  const cart = useCart();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname === "/admin") return null;

  const itemClass = (active: boolean) =>
    cn(
      "relative flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.62rem] font-medium transition-colors",
      active ? "bg-gold/12 text-gold" : "text-bone/60 active:bg-gold/8 active:text-gold",
    );

  return (
    <nav
      aria-label={L("التنقل الرئيسي", "Main navigation")}
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-gold/20 bg-ink/95 px-2 pt-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] shadow-[0_-14px_38px_rgba(0,0,0,.28)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-1">
        <Link to="/" className={itemClass(pathname === "/")}>
          <House className="h-5 w-5" />
          <span>{L("الرئيسية", "Home")}</span>
        </Link>
        <Link to="/menu" className={itemClass(pathname === "/menu")}>
          <UtensilsCrossed className="h-5 w-5" />
          <span>{L("المنيو", "Menu")}</span>
        </Link>
        <button
          type="button"
          onClick={() => cart.setOpen(true)}
          className={itemClass(cart.open)}
          aria-label={L("السلة", "Cart")}
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cart.count > 0 ? (
              <span className="absolute -end-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.56rem] font-bold text-ink">
                {cart.count}
              </span>
            ) : null}
          </span>
          <span>{L("السلة", "Cart")}</span>
        </button>
        <Link to="/track-order" className={itemClass(pathname === "/track-order")}>
          <Clock3 className="h-5 w-5" />
          <span>{L("تتبع", "Track")}</span>
        </Link>
        <Link to="/" hash="location" className={itemClass(false)}>
          <MapPin className="h-5 w-5" />
          <span>{L("موقعنا", "Location")}</span>
        </Link>
      </div>
    </nav>
  );
}
