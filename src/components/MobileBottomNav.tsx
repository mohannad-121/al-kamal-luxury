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
      "relative flex min-h-12 flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-[var(--control-radius)] px-1 text-[0.61rem] font-medium transition-[background-color,color] duration-200 ease-out active:bg-gold/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-soft/70 motion-reduce:transition-none",
      active
        ? "bg-gold/[.09] text-gold-soft"
        : "text-bone/58 hover:bg-gold/[.05] hover:text-bone/85",
    );

  return (
    <nav
      aria-label={L("التنقل الرئيسي", "Main navigation")}
      className="fixed inset-x-0 bottom-0 z-[75] border-t border-gold/20 bg-ink/[.96] px-2 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,.24)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-1">
        <Link
          to="/"
          className={itemClass(pathname === "/")}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <House aria-hidden="true" className="h-[19px] w-[19px]" />
          <span>{L("الرئيسية", "Home")}</span>
        </Link>
        <Link
          to="/menu"
          className={itemClass(pathname === "/menu")}
          aria-current={pathname === "/menu" ? "page" : undefined}
        >
          <UtensilsCrossed aria-hidden="true" className="h-[19px] w-[19px]" />
          <span>{L("المنيو", "Menu")}</span>
        </Link>
        <Link
          to="/order-now"
          className={itemClass(pathname === "/order-now")}
          aria-current={pathname === "/order-now" ? "page" : undefined}
        >
          <ShoppingBag aria-hidden="true" className="h-[19px] w-[19px]" />
          <span>{L("اطلب", "Order")}</span>
        </Link>
        <Link to="/" hash="location" className={itemClass(false)}>
          <MapPin aria-hidden="true" className="h-[19px] w-[19px]" />
          <span>{L("موقعنا", "Location")}</span>
        </Link>
      </div>
    </nav>
  );
}
