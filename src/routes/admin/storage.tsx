import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, PackagePlus } from "lucide-react";
import { AdminHeader } from "@/components/AdminHeader";
import { Price } from "@/components/Price";
import { categories } from "@/data/categories";
import { useDailySales } from "@/hooks/use-daily-sales";
import { useLang } from "@/hooks/use-lang";
import type { IngredientUnit, Lang } from "@/types";

export const Route = createFileRoute("/admin/storage")({ component: Storage });

const activeCategories = categories.filter((category) => category.active);

function formatAmount(value: number, unit: IngredientUnit, lang: Lang) {
  const locale = lang === "ar" ? "ar-JO" : "en-US";
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
  const units =
    lang === "ar"
      ? { g: "غ", ml: "مل", piece: "قطعة", kg: "كغ", l: "لتر" }
      : { g: "g", ml: "ml", piece: "pieces", kg: "kg", l: "L" };

  if (unit === "g" && value >= 1000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1000)} ${units.kg}`;
  }
  if (unit === "ml" && value >= 1000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1000)} ${units.l}`;
  }
  return `${number} ${units[unit]}`;
}

function Storage() {
  const { L, lang } = useLang();
  const {
    inventory,
    itemSales,
    ingredientUsage,
    addStock,
    ingredients,
    error: databaseError,
  } = useDailySales();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (databaseError) setMessage(databaseError);
  }, [databaseError]);

  const bestSelling = [...itemSales].sort(
    (first, second) => second.quantity - first.quantity || second.revenue - first.revenue,
  )[0];
  const lowestSelling = itemSales.length
    ? [...itemSales].sort(
        (first, second) => first.quantity - second.quantity || first.revenue - second.revenue,
      )[0]
    : undefined;
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
    [itemSales],
  );
  const largestCategoryRevenue = Math.max(1, ...categoryStats.map((stat) => stat.revenue));

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
      setMessage(L("أدخل كمية أكبر من صفر.", "Enter an amount greater than zero."));
      return;
    }
    await addStock(ingredientId, amount);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-ink pb-12 text-bone">
      <AdminHeader page="storage" />

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">
        <div>
          <p className="eyebrow">{L("المخزون", "STORAGE")}</p>
          <h1 className="mt-2 text-3xl text-bone sm:text-4xl">
            {L("المخزون وإحصاءات اليوم", "Storage & daily insights")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {L(
              "تابع الاستهلاك، أضف المخزون، وراجع ملخص المبيعات.",
              "Track consumption, add stock, and review today’s sales insights.",
            )}
          </p>
        </div>

        {message ? (
          <div className="mt-5 flex items-center justify-between gap-3 border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
            <span>{message}</span>
            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-red-100/70 hover:text-red-100"
            >
              ×
            </button>
          </div>
        ) : null}

        {lowStock.length ? (
          <section className="mt-5 border border-amber-300/30 bg-amber-300/10 p-4">
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
          </section>
        ) : null}

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
                      className="inline-flex min-h-10 items-center gap-2 border border-gold/25 px-3 py-2 text-xs text-gold hover:border-gold"
                    >
                      <PackagePlus className="h-3.5 w-3.5" /> {L("إضافة مخزون", "Add stock")}
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

            <section className="border border-gold/20 bg-charcoal/35 p-5">
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
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-bone/55">{label}</dt>
      <dd className="text-right font-medium text-bone">{value}</dd>
    </div>
  );
}
