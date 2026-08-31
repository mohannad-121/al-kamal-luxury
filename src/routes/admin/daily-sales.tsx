import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronDown,
  History,
  LoaderCircle,
  Minus,
  Package,
  Plus,
  ReceiptText,
  Search,
  Trophy,
  Wallet,
  Wheat,
} from "lucide-react";
import { AdminHeader } from "@/components/AdminHeader";
import { FoodImage } from "@/components/FoodImage";
import { Price } from "@/components/Price";
import { categories } from "@/data/categories";
import { useDailySales } from "@/hooks/use-daily-sales";
import { useLang } from "@/hooks/use-lang";
import { useMenu, type InventoryIngredient } from "@/hooks/use-menu";
import type { DailyReport, IngredientUnit, Lang, Product } from "@/types";

export const Route = createFileRoute("/admin/daily-sales")({ component: DailySales });

function formatAmount(value: number, unit: IngredientUnit, lang: Lang) {
  const number = new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", {
    maximumFractionDigits: 1,
  }).format(value);
  const units =
    lang === "ar"
      ? { g: "غ", ml: "مل", piece: "قطعة", kg: "كغ", l: "لتر" }
      : { g: "g", ml: "ml", piece: "pieces", kg: "kg", l: "L" };

  if (unit === "g" && value >= 1000) {
    return `${new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", {
      maximumFractionDigits: 1,
    }).format(value / 1000)} ${units.kg}`;
  }
  if (unit === "ml" && value >= 1000) {
    return `${new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", {
      maximumFractionDigits: 1,
    }).format(value / 1000)} ${units.l}`;
  }
  return `${number} ${units[unit]}`;
}

function todayLabel(date: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-JO" : "en-US", {
    dateStyle: "full",
    timeZone: "Asia/Amman",
  }).format(new Date(`${date}T12:00:00`));
}

function DailySales() {
  const { L, lang } = useLang();
  const { products } = useMenu();
  const {
    activeDate,
    quantities,
    salesEntries,
    inventory,
    history,
    itemSales,
    ingredientUsage,
    totalRevenue,
    totalItemsSold,
    recordSale,
    undoSale,
    addStock,
    closeDay,
    ingredients,
    error: databaseError,
  } = useDailySales();
  const [categoryId, setCategoryId] = useState("all");
  const [search, setSearch] = useState("");
  const [stockMessage, setStockMessage] = useState("");
  const [isConfirmingClose, setIsConfirmingClose] = useState(false);
  const [pendingSaleId, setPendingSaleId] = useState<string | null>(null);

  useEffect(() => {
    if (databaseError) setStockMessage(databaseError);
  }, [databaseError]);

  const activeCategories = categories.filter((category) => category.active);
  const query = search.trim().toLocaleLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory = categoryId === "all" || product.categoryId === categoryId;
    const matchesSearch =
      !query ||
      product.nameAr.toLocaleLowerCase().includes(query) ||
      product.nameEn.toLocaleLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const bestSelling = [...itemSales].sort(
    (a, b) => b.quantity - a.quantity || b.revenue - a.revenue,
  )[0];
  const lowestSelling = itemSales.length
    ? [...itemSales].sort((a, b) => a.quantity - b.quantity || a.revenue - b.revenue)[0]
    : undefined;
  const mostUsedIngredient = Object.entries(ingredientUsage)
    .sort(([, first], [, second]) => second - first)
    .map(([id]) => ingredients.find((ingredient) => ingredient.id === id))[0];
  const lowStock = ingredients.filter(
    (ingredient) => (inventory[ingredient.id] ?? 0) <= ingredient.lowStockThreshold,
  );
  const categoryStats = useMemo(
    () =>
      activeCategories
        .map((category) => {
          const sales = itemSales.filter((item) => item.categoryId === category.id);
          return {
            category,
            revenue: sales.reduce((sum, item) => sum + item.revenue, 0),
            quantity: sales.reduce((sum, item) => sum + item.quantity, 0),
          };
        })
        .filter((stat) => stat.quantity > 0),
    [activeCategories, itemSales],
  );
  const largestCategoryRevenue = Math.max(1, ...categoryStats.map((stat) => stat.revenue));

  const sell = async (product: Product) => {
    const result = await recordSale(product);
    if (!result.ok) {
      const ingredient = ingredients.find((item) => item.id === result.ingredientId);
      setStockMessage(
        L(
          `لا يمكن تسجيل البيع: مخزون ${ingredient?.nameAr ?? "هذا المكوّن"} غير كافٍ.`,
          `Sale not recorded: ${ingredient?.nameEn ?? "this ingredient"} is out of stock.`,
        ),
      );
      return;
    }
    setStockMessage("");
  };

  const removeSale = async (product: Product) => {
    setPendingSaleId(product.id);
    try {
      if (await undoSale(product)) setStockMessage("");
    } finally {
      setPendingSaleId(null);
    }
  };

  const restock = async (ingredientId: string) => {
    const ingredient = ingredients.find((item) => item.id === ingredientId);
    if (!ingredient) return;
    const answer = window.prompt(
      L(
        `أضف كمية ${ingredient.nameAr} (${ingredient.unit})`,
        `Add ${ingredient.nameEn} (${ingredient.unit})`,
      ),
    );
    if (answer === null) return;
    const amount = Number(answer);
    if (!Number.isFinite(amount) || amount <= 0) {
      setStockMessage(L("أدخل كمية أكبر من صفر.", "Enter an amount greater than zero."));
      return;
    }
    await addStock(ingredientId, amount);
    setStockMessage("");
  };

  return (
    <main className="min-h-screen bg-ink pb-12 text-bone">
      <AdminHeader page="daily-sales" />

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{L("مبيعات اليوم", "TODAY'S SALES")}</p>
            <h1 className="mt-2 text-3xl text-bone sm:text-4xl">
              {L("الأداء اليومي", "Daily performance")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{todayLabel(activeDate, lang)}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsConfirmingClose(true)}
            className="inline-flex min-h-11 items-center gap-2 border border-gold/45 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            <ReceiptText className="h-4 w-4" />
            {L("إغلاق اليوم", "End day / Close day")}
          </button>
        </div>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={<Wallet />}
            label={L("إيراد اليوم", "Today's revenue")}
            value={<Price value={totalRevenue} />}
            accent
          />
          <SummaryCard
            icon={<Package />}
            label={L("إجمالي القطع", "Total items sold")}
            value={totalItemsSold}
          />
          <SummaryCard
            icon={<ReceiptText />}
            label={L("عمليات البيع", "Sales entries")}
            value={salesEntries}
          />
          <SummaryCard
            icon={<Trophy />}
            label={L("الأكثر مبيعاً", "Best selling item")}
            value={bestSelling ? L(bestSelling.nameAr, bestSelling.nameEn) : "—"}
            compact
          />
          <SummaryCard
            icon={<Wheat />}
            label={L("الأكثر استهلاكاً", "Most used ingredient")}
            value={
              mostUsedIngredient ? L(mostUsedIngredient.nameAr, mostUsedIngredient.nameEn) : "—"
            }
            compact
          />
        </section>

        {stockMessage ? (
          <div className="mt-5 flex items-center justify-between gap-3 border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
            <span>{stockMessage}</span>
            <button
              type="button"
              onClick={() => setStockMessage("")}
              className="text-red-100/70 hover:text-red-100"
            >
              ×
            </button>
          </div>
        ) : null}
        {lowStock.length ? (
          <div className="mt-5 border border-amber-300/30 bg-amber-300/10 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-100">
              <AlertTriangle className="h-4 w-4" /> {L("تنبيه مخزون منخفض", "Low stock warnings")}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {lowStock.map((ingredient) => (
                <button
                  key={ingredient.id}
                  type="button"
                  onClick={() => void restock(ingredient.id)}
                  className="border border-amber-200/25 px-2 py-1 text-xs text-amber-50 hover:border-amber-100"
                >
                  {L(ingredient.nameAr, ingredient.nameEn)} —{" "}
                  {formatAmount(inventory[ingredient.id] ?? 0, ingredient.unit, lang)}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <section className="mt-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{L("سجل البيع", "ONE-TAP SALES")}</p>
              <h2 className="mt-1 text-2xl text-bone">{L("سجل المبيعات", "Record a sale")}</h2>
            </div>
            <label className="flex h-11 min-w-[min(100%,18rem)] items-center gap-2 border border-gold/25 bg-charcoal/50 px-3 text-bone/70 focus-within:border-gold">
              <Search className="h-4 w-4 text-gold" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={L("ابحث عن صنف", "Search menu items")}
                className="min-w-0 flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone/35"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <FilterButton active={categoryId === "all"} onClick={() => setCategoryId("all")}>
              {L("الكل", "All")}
            </FilterButton>
            {activeCategories.map((category) => (
              <FilterButton
                key={category.id}
                active={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
              >
                {L(category.nameAr, category.nameEn)}
              </FilterButton>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {visibleProducts.map((product) => {
              const category = categories.find((item) => item.id === product.categoryId);
              const quantity = quantities[product.id] ?? 0;
              const unitPrice = product.price - (product.discount ?? 0);
              const hasRecipe = (product.recipe?.length ?? 0) > 0;
              const canSell = product.available;
              return (
                <article
                  key={product.id}
                  className="overflow-hidden border border-gold/20 bg-charcoal/45"
                >
                  <FoodImage
                    src={product.image}
                    alt={L(product.nameAr, product.nameEn)}
                    className="aspect-[16/8] w-full"
                    zoom={false}
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[.62rem] tracking-[.14em] text-gold">
                          {category ? L(category.nameAr, category.nameEn) : product.categoryId}
                        </span>
                        <h3 className="mt-1 truncate font-display text-xl text-bone">
                          {L(product.nameAr, product.nameEn)}
                        </h3>
                      </div>
                      <span className="shrink-0 text-gold">
                        <Price value={unitPrice} />
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 border-y border-gold/10 py-3 text-sm">
                      <span className="text-bone/55">{L("الكمية", "Sold")}</span>
                      <span className="text-right font-medium text-bone">{quantity}</span>
                      <span className="text-bone/55">{L("الإيراد", "Revenue")}</span>
                      <span className="text-right text-gold">
                        <Price value={quantity * unitPrice} />
                      </span>
                    </div>
                    {!product.available || !hasRecipe ? (
                      <p className="mt-3 text-xs text-amber-200">
                        {product.available
                          ? L(
                              "سيتم تسجيل البيع، لكن المخزون لن يتغير حتى تضيف وصفة لهذا الصنف.",
                              "The sale will be recorded, but inventory will not change until you add a recipe.",
                            )
                          : L("هذا الصنف غير متوفر حالياً.", "This item is currently unavailable.")}
                      </p>
                    ) : null}
                    <div className="mt-4 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-2">
                      <button
                        type="button"
                        onClick={() => void removeSale(product)}
                        disabled={!quantity || pendingSaleId === product.id}
                        aria-busy={pendingSaleId === product.id}
                        aria-label={L(`إزالة ${product.nameAr}`, `Remove ${product.nameEn}`)}
                        className="grid min-h-14 place-items-center border border-gold/25 text-gold transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        {pendingSaleId === product.id ? (
                          <LoaderCircle className="h-5 w-5 animate-spin" />
                        ) : (
                          <Minus className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => void sell(product)}
                        disabled={!canSell || pendingSaleId === product.id}
                        className="inline-flex min-h-14 items-center justify-center gap-2 bg-gold px-4 text-base font-semibold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:bg-gold/35"
                      >
                        <Plus className="h-6 w-6" /> {L("تسجيل بيع", "Add sale")}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {!visibleProducts.length ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {L("لا توجد أصناف مطابقة.", "No matching menu items.")}
            </p>
          ) : null}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <div className="border border-gold/20 bg-charcoal/35">
            <div className="border-b border-gold/15 p-5">
              <p className="eyebrow">{L("استخدام اليوم", "INGREDIENTS USED TODAY")}</p>
              <h2 className="mt-1 text-2xl text-bone">
                {L("المخزون والاستهلاك", "Inventory and consumption")}
              </h2>
            </div>
            <div className="divide-y divide-gold/10">
              {ingredients.map((ingredient) => {
                const used = ingredientUsage[ingredient.id] ?? 0;
                const remaining = inventory[ingredient.id] ?? 0;
                const isLow = remaining <= ingredient.lowStockThreshold;
                return (
                  <div
                    key={ingredient.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-4"
                  >
                    <div>
                      <p className="font-medium text-bone">
                        {L(ingredient.nameAr, ingredient.nameEn)}
                      </p>
                      <p className="mt-1 text-xs text-bone/50">
                        {L("اُستخدم", "Used")}:{" "}
                        <span className="text-gold">
                          {formatAmount(used, ingredient.unit, lang)}
                        </span>{" "}
                        · {L("المتبقي", "Remaining")}:{" "}
                        <span className={isLow ? "text-amber-200" : "text-bone/75"}>
                          {formatAmount(remaining, ingredient.unit, lang)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void restock(ingredient.id)}
                      className="border border-gold/25 px-3 py-2 text-xs text-gold hover:border-gold"
                    >
                      {L("إضافة مخزون", "Add stock")}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-6">
            <div className="border border-gold/20 bg-charcoal/35">
              <div className="border-b border-gold/15 p-5">
                <p className="eyebrow">{L("ملخص المبيعات", "DAILY INSIGHTS")}</p>
                <h2 className="mt-1 text-2xl text-bone">{L("حسب التصنيف", "By category")}</h2>
              </div>
              <div className="space-y-4 p-5">
                {categoryStats.length ? (
                  categoryStats.map((stat) => (
                    <div key={stat.category.id}>
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-bone/75">
                          {L(stat.category.nameAr, stat.category.nameEn)} · {stat.quantity}{" "}
                          {L("قطعة", "items")}
                        </span>
                        <span className="text-gold">
                          <Price value={stat.revenue} />
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden bg-ink">
                        <div
                          className="h-full bg-gold"
                          style={{ width: `${(stat.revenue / largestCategoryRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {L(
                      "سيظهر توزيع المبيعات هنا بعد أول بيع.",
                      "Sales distribution will appear after the first sale.",
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="border border-gold/20 bg-charcoal/35 p-5">
              <p className="eyebrow">{L("مؤشرات سريعة", "QUICK STATS")}</p>
              <dl className="mt-4 space-y-3 text-sm">
                <StatRow
                  label={L("الأكثر مبيعاً", "Best-selling product")}
                  value={
                    bestSelling
                      ? `${L(bestSelling.nameAr, bestSelling.nameEn)} · ${bestSelling.quantity}`
                      : "—"
                  }
                />
                <StatRow
                  label={L("الأقل مبيعاً", "Lowest-selling product")}
                  value={
                    lowestSelling
                      ? `${L(lowestSelling.nameAr, lowestSelling.nameEn)} · ${lowestSelling.quantity}`
                      : "—"
                  }
                />
                <StatRow
                  label={L("مخزون منخفض", "Low-stock ingredients")}
                  value={lowStock.length || "—"}
                />
              </dl>
            </div>
          </div>
        </section>

        <section className="mt-8 border border-gold/20 bg-charcoal/35">
          <div className="flex items-center gap-3 border-b border-gold/15 p-5">
            <History className="h-5 w-5 text-gold" />
            <div>
              <p className="eyebrow">{L("تقارير محفوظة", "DAILY HISTORY")}</p>
              <h2 className="mt-1 text-2xl text-bone">{L("سجل الأيام", "Previous days")}</h2>
            </div>
          </div>
          {history.length ? (
            <div className="divide-y divide-gold/10">
              {history.map((report) => (
                <ReportRow key={report.id} report={report} ingredients={ingredients} />
              ))}
            </div>
          ) : (
            <p className="p-8 text-center text-sm text-muted-foreground">
              {L("لا توجد تقارير مغلقة بعد.", "No closed-day reports yet.")}
            </p>
          )}
        </section>
      </div>

      {isConfirmingClose ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="close-day-title"
            className="w-full max-w-md border border-gold/35 bg-charcoal p-6 shadow-2xl"
          >
            <p className="eyebrow">{L("تأكيد", "CONFIRM")}</p>
            <h2 id="close-day-title" className="mt-2 font-display text-3xl text-bone">
              {L("إغلاق اليوم؟", "Close this day?")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-bone/65">
              {L(
                "سيتم حفظ التقرير والمخزون المتبقي، ثم يبدأ سجل مبيعات جديد. لا يمكن حذف التقرير من هنا.",
                "The report and remaining inventory will be saved, then a new sales record will begin. Previous reports stay available.",
              )}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingClose(false)}
                className="min-h-11 border border-gold/25 text-sm text-bone/75 hover:border-gold"
              >
                {L("إلغاء", "Cancel")}
              </button>
              <button
                type="button"
                onClick={() => {
                  void closeDay().then((report) => {
                    if (report) setIsConfirmingClose(false);
                  });
                }}
                className="min-h-11 bg-gold px-4 text-sm font-medium text-ink hover:bg-gold-soft"
              >
                {L("حفظ وإغلاق", "Save & close")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  accent,
  compact,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={`border p-4 ${accent ? "border-gold/45 bg-gold/10" : "border-gold/20 bg-charcoal/35"}`}
    >
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-[.62rem] tracking-[.12em]">{label}</span>
      </div>
      <div className={`mt-4 font-display text-bone ${compact ? "text-xl" : "text-3xl"}`}>
        {value}
      </div>
    </article>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 border px-3 py-2 text-sm transition-colors ${active ? "border-gold bg-gold text-ink" : "border-gold/25 text-bone/70 hover:border-gold hover:text-gold"}`}
    >
      {children}
    </button>
  );
}

function StatRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-bone/55">{label}</dt>
      <dd className="text-right text-bone">{value}</dd>
    </div>
  );
}

function ReportRow({
  report,
  ingredients,
}: {
  report: DailyReport;
  ingredients: InventoryIngredient[];
}) {
  const { L, lang } = useLang();

  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
        <div>
          <p className="font-medium text-bone">{todayLabel(report.date, lang)}</p>
          <p className="mt-1 text-xs text-bone/50">
            {report.totalItemsSold} {L("قطعة", "items")} ·{" "}
            {report.bestSellingProduct
              ? L(
                  report.itemSales.find((item) => item.nameEn === report.bestSellingProduct)
                    ?.nameAr ?? report.bestSellingProduct,
                  report.bestSellingProduct,
                )
              : L("لا توجد مبيعات", "No sales")}
          </p>
        </div>
        <div className="flex items-center gap-3 text-gold">
          <Price value={report.totalRevenue} />
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
        </div>
      </summary>
      <div className="grid gap-5 border-t border-gold/10 p-5 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[.12em] text-gold">{L("مبيعات الأصناف", "ITEM SALES")}</p>
          <div className="mt-3 space-y-2 text-sm">
            {report.itemSales.length ? (
              report.itemSales.map((item) => (
                <div key={item.productId} className="flex justify-between gap-3 text-bone/75">
                  <span>
                    {L(item.nameAr, item.nameEn)} × {item.quantity}
                  </span>
                  <span>
                    <Price value={item.revenue} />
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">
                {L("لم تُسجَّل أي مبيعات.", "No sales were recorded.")}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[.12em] text-gold">
            {L("استخدام المكونات", "INGREDIENT USAGE")}
          </p>
          <div className="mt-3 space-y-2 text-sm">
            {Object.entries(report.ingredientUsage).length ? (
              Object.entries(report.ingredientUsage).map(([id, amount]) => {
                const ingredient = ingredients.find((item) => item.id === id);
                return ingredient ? (
                  <div key={id} className="flex justify-between gap-3 text-bone/75">
                    <span>{L(ingredient.nameAr, ingredient.nameEn)}</span>
                    <span>{formatAmount(amount, ingredient.unit, lang)}</span>
                  </div>
                ) : null;
              })
            ) : (
              <p className="text-muted-foreground">
                {L("لم تُستخدم أي مكونات.", "No ingredients were used.")}
              </p>
            )}
          </div>
        </div>
      </div>
    </details>
  );
}
