import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, LayoutGrid, Search, SearchX, X } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";
import { MenuSectionCard } from "@/components/MenuSectionCard";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import {
  publicMenuOptionCount,
  publicMenuSections,
  type PublicMenuSection,
} from "@/data/public-menu";
import { useLang } from "@/hooks/use-lang";

const validCategoryIds = new Set(["all", ...publicMenuSections.map((section) => section.id)]);

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>) => {
    const requested = typeof search.category === "string" ? search.category : "all";
    return { category: validCategoryIds.has(requested) ? requested : "all" };
  },
  component: Menu,
});

function includesQuery(value: string, query: string) {
  return value.toLocaleLowerCase().includes(query);
}

function Menu() {
  const { L, lang } = useLang();
  const { category: initialCategory } = Route.useSearch();
  const [active, setActive] = useState(initialCategory);
  const [term, setTerm] = useState("");

  const visibleSections = useMemo(() => {
    const query = term.trim().toLocaleLowerCase();

    return publicMenuSections
      .filter((section) => active === "all" || section.id === active)
      .map((section): PublicMenuSection | null => {
        if (!query) return section;

        const sectionMatches = includesQuery(`${section.nameAr} ${section.nameEn}`, query);
        if (sectionMatches) return section;

        const items = section.items.filter((item) =>
          includesQuery(
            [
              item.nameAr,
              item.nameEn,
              ...item.options.flatMap((option) => [option.nameAr, option.nameEn]),
            ].join(" "),
            query,
          ),
        );

        return items.length ? { ...section, items } : null;
      })
      .filter((section): section is PublicMenuSection => section !== null);
  }, [active, term]);

  const itemCount = visibleSections.reduce((total, section) => total + section.items.length, 0);
  const optionCount = visibleSections.reduce(
    (total, section) =>
      total + section.items.reduce((subtotal, item) => subtotal + item.options.length, 0),
    0,
  );
  const number = useMemo(() => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"), [lang]);

  return (
    <main className="bg-ink">
      <Navbar />

      <section className="relative isolate min-h-[390px] overflow-hidden border-b border-gold/15 bg-ink pt-[calc(4rem+env(safe-area-inset-top))] sm:min-h-[470px] sm:pt-[76px]">
        <FoodImage
          src="/images/levantine-bowls-premium.jpg"
          alt={L("أطباق الفطور الشعبي في مطعم الكمال", "Al Kamal breakfast dishes")}
          eager
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="object-[48%_54%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.004_60/.88),oklch(0.12_0.004_60/.66)_48%,oklch(0.12_0.004_60/.34))] rtl:bg-[linear-gradient(270deg,oklch(0.12_0.004_60/.9),oklch(0.12_0.004_60/.68)_48%,oklch(0.12_0.004_60/.34))]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_75%_30%,oklch(0.716_0.107_78.5/.16),transparent_30rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 veil" />

        <div className="relative mx-auto flex min-h-[326px] max-w-[1360px] items-end px-5 pb-10 sm:min-h-[394px] sm:px-8 sm:pb-14">
          <div className="max-w-3xl">
            <h1 className="hero-enter hero-enter-1 text-5xl leading-[1.2] text-bone sm:text-7xl">
              {L("المنيو", "Menu")}
            </h1>
            <p className="hero-enter hero-enter-2 mt-4 max-w-2xl text-base leading-8 text-bone/75 sm:text-lg">
              {L("كل الأصناف مع الأحجام والأسعار.", "All items with sizes and prices.")}
            </p>
            <div className="hero-enter hero-enter-3 mt-6 flex w-fit max-w-full overflow-hidden border border-gold/20 bg-ink/55 text-xs text-bone/70 backdrop-blur-xl sm:text-sm">
              <span className="px-4 py-3">
                {number.format(publicMenuSections.length)} {L("أقسام", "sections")}
              </span>
              <span className="border-s border-gold/15 px-4 py-3">
                {number.format(publicMenuOptionCount)} {L("خيارات", "options")}
              </span>
              <span className="border-s border-gold/15 px-4 py-3 text-gold">
                {L("بالدينار", "JOD")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-charcoal px-4 pb-20 pt-5 sm:px-8 sm:pb-28 sm:pt-8">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_15%_10%,oklch(0.716_0.107_78.5/.08),transparent_30rem)]" />
        <div className="relative mx-auto max-w-[1360px]">
          <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-40 -mx-2 rounded-[1.6rem] border border-white/[.07] bg-[linear-gradient(135deg,oklch(0.17_0.006_55/.97),oklch(0.12_0.004_60/.96))] p-2.5 shadow-[0_28px_80px_-32px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl sm:top-[84px] sm:mx-0 sm:p-3">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <label className="group/search flex h-14 w-full items-center gap-3 rounded-2xl border border-white/[.08] bg-black/25 px-2.5 text-muted-foreground shadow-inner transition duration-300 focus-within:border-gold/55 focus-within:bg-black/40 focus-within:shadow-[0_0_0_4px_oklch(0.716_0.107_78.5/.08)] xl:w-[330px] xl:shrink-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[.08] text-gold transition duration-300 group-focus-within/search:scale-105 group-focus-within/search:border-gold/50 group-focus-within/search:bg-gold/[.14]">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  className="h-full min-w-0 flex-1 bg-transparent text-base text-bone outline-none placeholder:text-muted-foreground sm:text-sm"
                  placeholder={L("دوّر على صنف...", "Search the menu...")}
                  aria-label={L("البحث في المنيو", "Search the menu")}
                />
                {term ? (
                  <button
                    type="button"
                    onClick={() => setTerm("")}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-transparent text-bone/55 transition hover:border-gold/25 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                    aria-label={L("مسح البحث", "Clear search")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </label>

              <div
                className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto py-0.5"
                role="toolbar"
                aria-label={L("تصفية أقسام المنيو", "Filter menu sections")}
              >
                <button
                  type="button"
                  aria-pressed={active === "all"}
                  onClick={() => setActive("all")}
                  className={`group/category relative flex min-h-12 shrink-0 items-center gap-2 overflow-hidden rounded-2xl border py-1.5 ps-1.5 pe-3.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/75 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
                    active === "all"
                      ? "border-gold/75 bg-[linear-gradient(135deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_15px_32px_-18px_var(--gold)]"
                      : "border-white/[.08] bg-white/[.025] text-bone/70 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/[.07] hover:text-bone"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl border transition duration-300 ${
                      active === "all"
                        ? "border-ink/15 bg-ink/10"
                        : "border-gold/20 bg-gold/[.08] text-gold group-hover/category:border-gold/45"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{L("الكل", "All")}</span>
                </button>
                {publicMenuSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    aria-pressed={active === section.id}
                    onClick={() => setActive(section.id)}
                    className={`group/category relative flex min-h-12 shrink-0 items-center gap-2 overflow-hidden rounded-2xl border py-1.5 ps-1.5 pe-3.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/75 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
                      active === section.id
                        ? "border-gold/75 bg-[linear-gradient(135deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_15px_32px_-18px_var(--gold)]"
                        : "border-white/[.08] bg-white/[.025] text-bone/70 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/[.07] hover:text-bone"
                    }`}
                  >
                    <span
                      className={`relative h-9 w-9 overflow-hidden rounded-xl border transition duration-300 ${
                        active === section.id
                          ? "border-ink/20 shadow-sm"
                          : "border-gold/20 group-hover/category:border-gold/50"
                      }`}
                    >
                      <img
                        src={section.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover/category:scale-110 motion-reduce:transition-none"
                        style={{ objectPosition: section.imagePosition }}
                      />
                    </span>
                    <span className="font-medium">{L(section.nameAr, section.nameEn)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[.06] pb-5 sm:mt-12 sm:pb-6"
            aria-live="polite"
          >
            <div>
              <h2 className="font-display text-2xl text-bone sm:text-3xl">
                {active === "all"
                  ? term
                    ? L("نتائج البحث", "Search results")
                    : L("كل الأصناف", "All items")
                  : L(
                      publicMenuSections.find((section) => section.id === active)?.nameAr ??
                        "المنيو",
                      publicMenuSections.find((section) => section.id === active)?.nameEn ?? "Menu",
                    )}
              </h2>
            </div>
            <p className="rounded-full border border-gold/15 bg-gold/[.05] px-4 py-2 text-xs text-bone/60 sm:text-sm">
              {L(
                `الأصناف: ${number.format(itemCount)} · الخيارات: ${number.format(optionCount)}`,
                `${number.format(itemCount)} items · ${number.format(optionCount)} options`,
              )}
            </p>
          </div>

          {visibleSections.length ? (
            <div
              className={`mt-5 sm:mt-7 ${
                active === "all" && !term ? "columns-1 gap-7 lg:columns-2" : "mx-auto max-w-5xl"
              }`}
            >
              {visibleSections.map((section, index) => (
                <Reveal
                  key={`${section.id}-${term}`}
                  delay={(index % 4) * 70}
                  className="mb-5 break-inside-avoid sm:mb-7"
                >
                  <MenuSectionCard section={section} eager={index < 2} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_50%_0%,oklch(0.716_0.107_78.5/.12),transparent_24rem),oklch(0.12_0.004_60/.72)] px-6 py-20 text-center shadow-[0_35px_90px_-55px_rgba(0,0,0,.95)] sm:py-28">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gold/[.08] shadow-[0_0_45px_-20px_var(--gold)]">
                <SearchX className="h-6 w-6 text-gold" />
              </span>
              <h2 className="mt-5 text-2xl text-bone sm:text-3xl">
                {L("ما لقينا صنف بهالاسم", "We couldn't find that item")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                {L(
                  "جرّب كلمة ثانية أو ارجع لكل أقسام المنيو.",
                  "Try another search or browse every menu section.",
                )}
              </p>
              <button
                type="button"
                className="luxury-cta mt-7"
                onClick={() => {
                  setTerm("");
                  setActive("all");
                }}
              >
                {L("عرض المنيو كامل", "Show the full menu")}
              </button>
            </Reveal>
          )}

          <Reveal className="group relative mt-12 overflow-hidden rounded-[2rem] border border-gold/25 bg-ink shadow-[0_35px_90px_-48px_rgba(0,0,0,.95)] sm:mt-16">
            <FoodImage
              src="/images/falafel-wrap.jpg"
              alt=""
              zoom={false}
              className="absolute inset-y-0 end-0 hidden w-[48%] sm:block"
              imgClassName="object-cover opacity-75 transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
              imgStyle={{ objectPosition: "50% 56%" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.004_60)_48%,oklch(0.12_0.004_60/.82)_68%,transparent)] rtl:bg-[linear-gradient(270deg,oklch(0.12_0.004_60)_48%,oklch(0.12_0.004_60/.82)_68%,transparent)]" />
            <div className="pointer-events-none absolute -start-16 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative max-w-2xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
              <div>
                <h2 className="max-w-md font-display text-3xl leading-tight text-bone sm:text-4xl">
                  {L("كمّل طلبك على طلبات.", "Complete your order on Talabat.")}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-bone/60">
                  {L(
                    "اختار الأصناف والأحجام اللي بدك إياها.",
                    "Choose the items and sizes you want.",
                  )}
                </p>
              </div>
              <Link to="/order-now" className="luxury-cta mt-7 w-full sm:w-auto">
                {L("اطلب الآن", "Order now")}
                <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
