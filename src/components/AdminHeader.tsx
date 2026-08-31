import { ArrowRight, Languages, Package, UtensilsCrossed, Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/hooks/use-lang";

type AdminPage = "menu" | "daily-sales" | "storage";

export function AdminHeader({ page }: { page: AdminPage }) {
  const { L, lang, toggle } = useLang();
  const linkClass = (active: boolean) =>
    `inline-flex min-h-10 items-center justify-center gap-2 px-2 text-xs transition-colors sm:px-3 sm:text-sm ${
      active ? "border-b-2 border-gold text-gold" : "text-bone/70 hover:text-gold"
    }`;

  return (
    <header className="border-b border-gold/20 bg-charcoal/70 px-5 py-4 backdrop-blur sm:px-8">
      <div className="mx-auto grid max-w-[1440px] items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-gold/45 text-gold">
            {page === "menu" ? <UtensilsCrossed className="h-4 w-4" /> : null}
            {page === "daily-sales" ? <Wallet className="h-4 w-4" /> : null}
            {page === "storage" ? <Package className="h-4 w-4" /> : null}
          </span>
          <span>
            <span className="block font-display text-lg">
              {page === "menu"
                ? L("إدارة المنيو", "Menu manager")
                : page === "daily-sales"
                  ? L("الأداء اليومي", "Daily performance")
                  : L("المخزون", "Storage")}
            </span>
            <span className="text-[.62rem] tracking-[.2em] text-gold">
              {L("الكمال", "AL KAMAL")}
            </span>
          </span>
        </div>

        <nav
          aria-label={L("تنقل الإدارة", "Admin navigation")}
          className="order-3 flex flex-wrap justify-center border-t border-gold/15 pt-3 sm:order-none sm:border-0 sm:pt-0"
        >
          <Link to="/admin" className={linkClass(page === "menu")}>
            {L("إدارة المنيو", "Menu manager")}
          </Link>
          <Link to="/admin/daily-sales" className={linkClass(page === "daily-sales")}>
            {L("الأداء اليومي", "Daily performance")}
          </Link>
          <Link to="/admin/storage" className={linkClass(page === "storage")}>
            {L("المخزون", "Storage")}
          </Link>
          <Link to="/" className={linkClass(false)}>
            {L("الموقع", "View site")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-10 items-center gap-2 border border-gold/30 px-3 text-sm text-bone transition-colors hover:border-gold hover:text-gold"
            aria-label={L("التبديل إلى الإنجليزية", "Switch to Arabic")}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span>{lang === "ar" ? "EN" : "ع"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
