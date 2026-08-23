import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { hiddenProductIds, products } from "@/data/menu";
import { useLang } from "@/hooks/use-lang";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : "all",
  }),
  component: Menu,
});

function Menu() {
  const { L } = useLang();
  const { category: initialCategory } = Route.useSearch();
  const [active, setActive] = useState(initialCategory);
  const [term, setTerm] = useState("");
  const visible = useMemo(() => {
    const query = term.trim().toLocaleLowerCase();
    return products.filter((product) => {
      if (hiddenProductIds.has(product.id)) return false;
      const categoryMatch = active === "all" || product.categoryId === active;
      const termMatch =
        !query ||
        `${product.nameAr} ${product.nameEn} ${product.descAr} ${product.descEn}`
          .toLocaleLowerCase()
          .includes(query);
      return categoryMatch && termMatch;
    });
  }, [active, term]);
  return (
    <main>
      <Navbar />
      <section className="border-b border-gold/15 bg-ink px-4 pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="eyebrow">{L("منيو الكمال", "AL KAMAL MENU")}</p>
          <h1 className="mt-3 text-3xl text-bone sm:mt-4 sm:text-6xl">
            {L("شو عبالك اليوم؟", "What are you craving?")}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            {L(
              "أكل شعبي محضّر على الطلب، خذ وقتك، وخلي الباقي علينا.",
              "Jordanian comfort food prepared fresh every day.",
            )}
          </p>
        </div>
      </section>
      <section className="min-h-screen bg-charcoal px-4 py-5 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 -mx-4 border-y border-gold/15 bg-charcoal/95 px-4 py-3 backdrop-blur sm:top-[76px] sm:mx-0 sm:border sm:px-4 sm:py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="flex h-12 max-w-md items-center gap-3 border border-gold/20 bg-ink/70 px-4 text-muted-foreground focus-within:border-gold/60">
                <Search className="h-4 w-4 text-gold" />
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  className="h-full min-w-0 flex-1 bg-transparent text-base text-bone outline-none placeholder:text-muted-foreground sm:text-sm"
                  placeholder={L("شو عبالك اليوم؟", "What are you craving?")}
                />
              </label>
              <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1">
                {" "}
                <button
                  onClick={() => setActive("all")}
                  className={`shrink-0 border px-4 py-2 text-sm transition-colors ${active === "all" ? "border-gold bg-gold text-ink" : "border-gold/20 text-bone/75 hover:border-gold/50"}`}
                >
                  {L("الكل", "All")}
                </button>
                {categories
                  .filter((c) => c.active)
                  .map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActive(category.id)}
                      className={`shrink-0 border px-4 py-2 text-sm transition-colors ${active === category.id ? "border-gold bg-gold text-ink" : "border-gold/20 text-bone/75 hover:border-gold/50"}`}
                    >
                      {L(category.nameAr, category.nameEn)}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between sm:mt-9">
            <p className="text-sm text-muted-foreground">
              {L(`${visible.length} أصناف متوفرة`, `${visible.length} items available`)}
            </p>
            <span className="flex items-center gap-2 text-xs tracking-[.18em] text-gold">
              <SlidersHorizontal className="h-4 w-4" />
              {L("مختارات اليوم", "TODAY’S SELECTION")}
            </span>
          </div>
          {visible.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-16 border border-gold/20 bg-ink/35 py-20 text-center">
              <p className="font-display text-2xl text-bone">
                {L("ما لقينا شيء بهالاسم", "We couldn’t find that")}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {L(
                  "جرّب اسم ثاني أو ارجع لكل الأصناف.",
                  "Try another search or browse all dishes.",
                )}
              </p>
              <button
                type="button"
                className="mt-6 border border-gold/30 px-4 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
                onClick={() => {
                  setTerm("");
                  setActive("all");
                }}
              >
                {L("عرض الكل", "Show all")}
              </button>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
