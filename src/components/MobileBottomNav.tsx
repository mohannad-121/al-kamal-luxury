import { Link, useRouterState } from "@tanstack/react-router";
import { House, MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { L } = useLang();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname.startsWith("/admin")) return null;

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
        <Link to="/order-now" className={itemClass(pathname === "/order-now")}>
          <ShoppingBag className="h-5 w-5" />
          <span>{L("اطلب", "Order")}</span>
        </Link>
        <Link to="/" hash="location" className={itemClass(false)}>
          <MapPin className="h-5 w-5" />
          <span>{L("موقعنا", "Location")}</span>
        </Link>
      </div>
    </nav>
  );
}
