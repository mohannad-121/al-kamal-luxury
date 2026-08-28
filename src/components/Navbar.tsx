import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, Search, X } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { restaurant } from "@/config/restaurant";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", ar: "الرئيسية", en: "Home" },
  { to: "/menu", ar: "المنيو", en: "Menu" },
  { to: "/order-now", ar: "اطلب الآن", en: "Order now" },
  { to: "/", hash: "popular", ar: "الأكثر طلبًا", en: "Popular" },
  { to: "/", hash: "location", ar: "موقعنا", en: "Find us" },
] as const;

const navControl =
  "grid h-11 w-11 touch-manipulation place-items-center rounded-[var(--control-radius)] border border-transparent text-bone/70 transition-[background-color,border-color,color] duration-200 ease-out hover:border-gold/25 hover:bg-gold/[.06] hover:text-gold-soft active:bg-gold/[.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none";

export function Navbar() {
  const { L, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuTrigger = menuTriggerRef.current;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuTrigger?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b border-gold/10 bg-ink/75 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none",
          scrolled
            ? "border-gold/20 bg-ink/[.95] shadow-[0_10px_28px_-22px_rgba(0,0,0,.9)]"
            : "lg:border-transparent lg:bg-transparent lg:backdrop-blur-none",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:h-[76px] sm:gap-5 sm:px-8 sm:pt-0">
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-[var(--control-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-3 focus-visible:ring-offset-ink sm:gap-3"
            aria-label={L("مطعم الكمال - الرئيسية", "Al Kamal Restaurant - Home")}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[var(--control-radius)] border border-gold/30 bg-ink/75 p-1 transition-colors duration-200 group-hover:border-gold/55 motion-reduce:transition-none">
              <img src="/favicon.svg" alt="" className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[0.9rem] text-bone sm:text-[0.95rem]">
                {L(restaurant.nameAr, restaurant.nameEn)}
              </span>
              <span className="mt-0.5 block text-[0.56rem] tracking-[0.18em] text-gold/75 sm:text-[0.6rem] sm:tracking-[0.22em]">
                {L("الرصيفة", "RUSSEIFA")}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-4 lg:flex"
            aria-label={L("التنقل الرئيسي", "Primary navigation")}
          >
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.ar}`}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                aria-current={pathname === l.to && !("hash" in l) ? "page" : undefined}
                className={cn(
                  "relative rounded-[var(--control-radius)] px-2 py-2.5 text-[0.84rem] transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-center after:bg-gold after:transition-transform after:duration-200 hover:text-gold-soft hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 motion-reduce:transition-none motion-reduce:after:transition-none",
                  pathname === l.to && !("hash" in l)
                    ? "text-gold-soft after:scale-x-100"
                    : "text-bone/72 after:scale-x-0",
                )}
              >
                {L(l.ar, l.en)}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <Link
              to="/menu"
              className={navControl}
              aria-label={L("البحث في المنيو", "Search the menu")}
            >
              <Search aria-hidden="true" className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={toggle}
              className={cn(navControl, "sm:w-auto sm:grid-cols-[auto_auto] sm:gap-1.5 sm:px-3")}
              aria-label={L("تغيير اللغة", "Change language")}
            >
              <Globe aria-hidden="true" className="h-4 w-4" />
              <span className="hidden text-[0.7rem] font-medium tracking-[0.12em] sm:inline">
                {lang === "ar" ? "EN" : "AR"}
              </span>
            </button>
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(navControl, "text-bone lg:hidden")}
              aria-label={L("فتح القائمة", "Open menu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          className={cn(
            "hairline transition-opacity duration-700 motion-reduce:transition-none",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>

      {/* Full-screen premium mobile menu */}
      {mobileOpen ? (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label={L("القائمة الرئيسية", "Main menu")}
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden overscroll-contain bg-ink animate-in fade-in duration-200 motion-reduce:animate-none lg:hidden"
        >
          <div className="relative flex min-h-[72px] items-center justify-between px-5 pt-[env(safe-area-inset-top)] sm:px-7">
            <span className="font-display text-lg text-gold-soft">
              {L(restaurant.nameAr, restaurant.nameEn)}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className={cn(navControl, "border-gold/25 text-bone")}
              aria-label={L("إغلاق القائمة", "Close menu")}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <div className="hairline opacity-60" />
          <nav
            className="relative flex flex-1 flex-col justify-center gap-1 px-7 py-6 sm:px-10"
            aria-label={L("روابط القائمة", "Menu links")}
          >
            {links.map((l) => (
              <Link
                key={`m-${l.to}-${l.ar}`}
                to={l.to}
                hash={"hash" in l ? l.hash : undefined}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === l.to && !("hash" in l) ? "page" : undefined}
                className={cn(
                  "flex min-h-16 items-center border-b border-gold/15 px-2 py-4 font-display text-[1.35rem] text-bone transition-[background-color,border-color,color] duration-200 hover:border-gold/30 hover:bg-gold/[.035] hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-soft/65 motion-reduce:transition-none sm:text-2xl",
                  pathname === l.to &&
                    !("hash" in l) &&
                    "border-gold/30 bg-gold/[.04] text-gold-soft",
                )}
              >
                {L(l.ar, l.en)}
              </Link>
            ))}
          </nav>
          <div className="relative px-7 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-10">
            <button
              type="button"
              onClick={toggle}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--control-radius)] border border-gold/30 bg-transparent px-5 py-2.5 text-sm text-bone/80 transition-[background-color,border-color,color] duration-200 hover:border-gold/55 hover:bg-gold/[.05] hover:text-gold-soft active:bg-gold/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 motion-reduce:transition-none"
            >
              <Globe aria-hidden="true" className="h-4 w-4 text-gold" />
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
