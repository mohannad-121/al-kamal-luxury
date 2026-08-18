import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, Search, ShoppingBag, X } from "lucide-react";
import { GoldButton } from "./GoldButton";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "@/hooks/use-lang";
import { restaurant } from "@/config/restaurant";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", ar: "الرئيسية", en: "Home" },
  { to: "/menu", ar: "المنيو", en: "Menu" },
  { to: "/menu", hash: "popular", ar: "الأكثر طلباً", en: "Popular" },
  { to: "/", hash: "location", ar: "موقعنا", en: "Find us" },
] as const;

export function Navbar() {
  const { L, toggle, lang } = useLang();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b border-gold/15 bg-ink/90 backdrop-blur-xl transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none",
          scrolled ? "border-b border-gold/15 bg-ink/85 backdrop-blur-xl" : "lg:bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 pt-[env(safe-area-inset-top)] sm:h-[76px] sm:px-8 sm:pt-0">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold/50 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
              <span className="font-display text-sm">ك</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.95rem] text-bone">
                {L(restaurant.nameAr, restaurant.nameEn)}
              </span>
              <span className="block text-[0.6rem] tracking-[0.22em] text-gold/80">AL KAMAL</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.ar}`}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                className="relative py-1 text-[0.85rem] text-bone/75 transition-colors duration-400 hover:text-gold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
              >
                {L(l.ar, l.en)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/menu"
              className="grid h-10 w-10 place-items-center text-bone/70 transition-colors hover:text-gold sm:grid"
              aria-label={L("بحث", "Search")}
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center px-2 text-[0.72rem] tracking-widest text-bone/70 transition-colors hover:text-gold sm:w-auto sm:gap-1.5 sm:justify-start sm:flex"
              aria-label="switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === "ar" ? "EN" : "AR"}</span>
            </button>
            <button
              onClick={() => cart.setOpen(true)}
              className="relative grid h-10 w-10 place-items-center text-bone transition-colors hover:text-gold"
              aria-label={L("الطلب", "Cart")}
            >
              <ShoppingBag className="h-[19px] w-[19px]" />
              {cart.count > 0 ? (
                <span className="absolute -top-0.5 end-0 grid h-[18px] min-w-[18px] place-items-center bg-[image:var(--gradient-gold)] px-1 text-[0.62rem] font-bold text-ink animate-in zoom-in duration-300">
                  {cart.count}
                </span>
              ) : null}
            </button>
            <Link to="/menu" className="hidden md:block">
              <GoldButton size="sm">{L("اطلب الآن", "Order now")}</GoldButton>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="hidden h-10 w-10 place-items-center text-bone transition-colors hover:text-gold md:grid lg:hidden"
              aria-label={L("القائمة", "Menu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          className={cn(
            "hairline transition-opacity duration-700",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>

      {/* Full-screen premium mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[color:var(--ink)] animate-in fade-in duration-300 lg:hidden">
          <div className="flex h-[68px] items-center justify-between px-5">
            <span className="font-display text-lg text-gold">
              {L(restaurant.nameAr, restaurant.nameEn)}
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center border border-gold/30 text-bone"
              aria-label={L("إغلاق", "Close")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="hairline" />
          <nav className="flex flex-1 flex-col justify-center gap-1 px-7">
            {links.map((l, i) => (
              <Link
                key={`m-${l.to}-${l.ar}`}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between border-b border-border/60 py-5 animate-rise"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="font-display text-2xl text-bone transition-colors group-hover:text-gold">
                  {L(l.ar, l.en)}
                </span>
                <span className="text-[0.65rem] tracking-[0.25em] text-gold/50">0{i + 1}</span>
              </Link>
            ))}
            <Link
              to="/track-order"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center justify-between border-b border-border/60 py-5 animate-rise"
              style={{ animationDelay: "350ms" }}
            >
              <span className="font-display text-2xl text-bone group-hover:text-gold">
                {L("تتبع الطلب", "Track order")}
              </span>
              <span className="text-[0.65rem] tracking-[0.25em] text-gold/50">06</span>
            </Link>
          </nav>
          <div className="space-y-3 px-7 pb-10">
            <Link to="/menu" onClick={() => setMobileOpen(false)} className="block">
              <GoldButton className="w-full" size="lg">
                {L("اطلب الآن", "Order now")}
              </GoldButton>
            </Link>
            <button
              onClick={toggle}
              className="w-full border border-gold/30 py-3 text-sm text-bone/80 transition-colors hover:border-gold hover:text-gold"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
