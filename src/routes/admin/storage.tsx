import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Bread,
  Check,
  CheckCircle2,
  Filter,
  Minus,
  Package,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { AdminHeader } from "@/components/AdminHeader";
import { useDailySales } from "@/hooks/use-daily-sales";
import { useLang } from "@/hooks/use-lang";
import type { IngredientUnit, Lang } from "@/types";

export const Route = createFileRoute("/admin/storage")({ component: Storage });

type CategoryFilter = "all" | "breads" | "mains" | "liquids";

const breadIds = new Set([
  "normal-bread",
  "kaak-bread",
  "tortilla-bread",
  "shrak-bread",
  "small-french-bread",
]);

const liquidIds = new Set(["oil", "tahini"]);

function getCategory(id: string): "breads" | "liquids" | "mains" {
  if (breadIds.has(id)) return "breads";
  if (liquidIds.has(id)) return "liquids";
  return "mains";
}

function getUnitLabel(unit: IngredientUnit, lang: Lang) {
  if (lang === "ar") {
    switch (unit) {
      case "piece":
        return "قطعة";
      case "g":
        return "غرام";
      case "ml":
        return "مل";
      default:
        return unit;
    }
  }
  switch (unit) {
    case "piece":
      return "pieces";
    case "g":
      return "g";
    case "ml":
      return "ml";
    default:
      return unit;
  }
}

function getStep(unit: IngredientUnit) {
  return unit === "piece" ? 1 : 100;
}

function Storage() {
  const { L, lang } = useLang();
  const {
    ingredients,
    inventory,
    updateStock,
    resetAllStockToZero,
    error: databaseError,
  } = useDailySales();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [message, setMessage] = useState("");
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const filteredIngredients = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return ingredients.filter((item) => {
      const category = getCategory(item.id);
      if (activeCategory !== "all" && category !== activeCategory) return false;
      if (!query) return true;
      return (
        item.nameAr.toLocaleLowerCase().includes(query) ||
        item.nameEn.toLocaleLowerCase().includes(query) ||
        item.id.toLocaleLowerCase().includes(query)
      );
    });
  }, [activeCategory, ingredients, searchQuery]);

  const handleQtyChange = async (ingredientId: string, value: number) => {
    const safeQty = Math.max(0, Math.round(value));
    setSavingId(ingredientId);
    try {
      await updateStock(ingredientId, safeQty);
    } catch {
      setMessage(L("تعذر حفظ الكمية، يرجى المحاولة مرة أخرى.", "Unable to save quantity."));
    } finally {
      setSavingId(null);
    }
  };

  const handleStep = (ingredientId: string, currentQty: number, step: number) => {
    const nextQty = Math.max(0, currentQty + step);
    void handleQtyChange(ingredientId, nextQty);
  };

  const handleResetAll = async () => {
    setResetConfirmOpen(false);
    try {
      await resetAllStockToZero();
      setMessage(
        L(
          "تم التصفير: جميع الكميات في المخزون أصبحت 0 الآن.",
          "Inventory reset: All item quantities are now 0.",
        ),
      );
    } catch {
      setMessage(L("حدث خطأ أثناء تصفير المخزون.", "Error resetting inventory."));
    }
  };

  const totalItemsCount = ingredients.length;
  const inStockCount = ingredients.filter(
    (item) => (inventory[item.id] ?? item.availableQuantity ?? 0) > 0,
  ).length;

  return (
    <main className="min-h-screen bg-ink pb-16 text-bone">
      <AdminHeader page="storage" />

      <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-8 sm:py-8">
        {/* Header section */}
        <div className="flex flex-col gap-4 border-b border-gold/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Package className="h-5 w-5" />
              <span className="eyebrow">{L("المخزون اليدوي", "MANUAL INVENTORY")}</span>
            </div>
            <h1 className="mt-1 font-display text-3xl text-bone sm:text-4xl">
              {L("إدارة كميات المخزون", "Stock Management")}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-bone/70">
              {L(
                "تحكم مباشر وبسيط في كميات المخزون. أضف أو انقص أو أدخل الكمية الحالية يدوياً بدون أي خصم آلي.",
                "Direct and simple manual stock control. Add, subtract, or enter current stock manually with zero automatic deductions.",
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setResetConfirmOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 text-xs font-medium text-red-200 transition hover:border-red-500 hover:bg-red-500/20"
            >
              <RotateCcw className="h-4 w-4" />
              {L("تصفير الكل (0)", "Reset All to 0")}
            </button>
          </div>
        </div>

        {/* Feedback message banner */}
        {message || databaseError ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{message || databaseError}</span>
            </div>
            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-gold/70 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {/* Modal confirm reset */}
        {resetConfirmOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-w-md rounded-2xl border border-gold/30 bg-charcoal p-6 shadow-2xl">
              <h3 className="font-display text-xl text-bone">
                {L("تأكيد تصفير المخزون؟", "Confirm Reset All Inventory?")}
              </h3>
              <p className="mt-2 text-sm text-bone/70">
                {L(
                  "سيتم تغيير كمية جميع المواد والأخباز في المخزون لتصبح 0. يمكنك إدخال الكميات الجديدة يدوياً في أي وقت.",
                  "This will reset all stock quantities to 0. You can enter new stock quantities manually anytime.",
                )}
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-bone/80 hover:bg-white/5"
                >
                  {L("إلغاء", "Cancel")}
                </button>
                <button
                  type="button"
                  onClick={() => void handleResetAll()}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  {L("تأكيد التصفير (0)", "Yes, Reset All to 0")}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Filter bar and search */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", labelAr: "الكل", labelEn: "All", count: totalItemsCount },
              {
                id: "breads",
                labelAr: "المخبوزات والخبز 🍞",
                labelEn: "Breads 🍞",
                count: ingredients.filter((i) => breadIds.has(i.id)).length,
              },
              {
                id: "mains",
                labelAr: "المواد والأصناف 🥣",
                labelEn: "Ingredients 🥣",
                count: ingredients.filter((i) => !breadIds.has(i.id) && !liquidIds.has(i.id))
                  .length,
              },
              {
                id: "liquids",
                labelAr: "الزيوت والسوائل 🫗",
                labelEn: "Liquids 🫗",
                count: ingredients.filter((i) => liquidIds.has(i.id)).length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs font-medium transition ${
                  activeCategory === tab.id
                    ? "border-gold bg-gold/15 text-gold shadow-sm"
                    : "border-white/10 bg-white/[0.02] text-bone/70 hover:border-gold/30 hover:text-bone"
                }`}
              >
                <span>{tab.labelAr}</span>
                <span className="rounded-full bg-ink/60 px-1.5 py-0.5 text-[0.65rem] text-gold">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={L("بحث في المخزون...", "Search inventory...")}
              className="h-10 w-full rounded-xl border border-white/10 bg-charcoal/70 ps-9 pe-8 text-xs text-bone outline-none transition focus:border-gold/50 focus:bg-charcoal"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-bone/40 hover:text-bone"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/15 bg-charcoal/30 px-4 py-3 text-xs text-bone/70">
          <div>
            <span>{L("إجمالي المواد:", "Total items:")} </span>
            <strong className="text-gold">{totalItemsCount}</strong>
          </div>
          <div>
            <span>{L("مواد متوفرة بكتلة أكبر من 0:", "Items in stock (>0):")} </span>
            <strong className="text-emerald-400">{inStockCount}</strong>
          </div>
          <div>
            <span>{L("مواد بكتلة 0 (غير متوفرة):", "Items at 0:")} </span>
            <strong className="text-amber-300">{totalItemsCount - inStockCount}</strong>
          </div>
        </div>

        {/* Inventory Items Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredIngredients.map((item) => {
            const currentQty = inventory[item.id] ?? item.availableQuantity ?? 0;
            const isSaving = savingId === item.id;
            const step = getStep(item.unit);
            const unitLabel = getUnitLabel(item.unit, lang);
            const isBread = breadIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition duration-300 ${
                  currentQty > 0
                    ? "border-gold/25 bg-charcoal/50 hover:border-gold/50"
                    : "border-white/10 bg-charcoal/20 opacity-85 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium text-gold">
                        {isBread ? "🍞 " : ""}
                        {unitLabel}
                      </span>
                      <h3 className="mt-2 font-display text-lg text-bone">
                        {L(item.nameAr, item.nameEn)}
                      </h3>
                    </div>

                    <div className="text-end">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                          currentQty > 0
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {currentQty > 0
                          ? L(`${currentQty} ${unitLabel}`, `${currentQty} ${unitLabel}`)
                          : L("غير متوفر (0)", "Out of stock (0)")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock Controls */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    {/* Minus button */}
                    <button
                      type="button"
                      disabled={currentQty <= 0 || isSaving}
                      onClick={() => handleStep(item.id, currentQty, -step)}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ink/80 text-bone shadow-inner transition hover:border-gold hover:bg-gold/15 hover:text-gold active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                      aria-label={L(`أنقص ${item.nameAr}`, `Decrease ${item.nameEn}`)}
                    >
                      <Minus className="h-5 w-5" />
                    </button>

                    {/* Quantity Input */}
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min={0}
                        step={step}
                        value={currentQty}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (Number.isFinite(val)) void handleQtyChange(item.id, val);
                        }}
                        className="h-12 w-full rounded-xl border border-gold/30 bg-ink px-3 text-center font-display text-xl font-bold text-gold outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                      <span className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-[0.65rem] text-bone/40">
                        {unitLabel}
                      </span>
                    </div>

                    {/* Plus button */}
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleStep(item.id, currentQty, step)}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ink/80 text-bone shadow-inner transition hover:border-gold hover:bg-gold/15 hover:text-gold active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                      aria-label={L(`أضف ${item.nameAr}`, `Increase ${item.nameEn}`)}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Quick increment presets for easy restocking */}
                  <div className="flex gap-1.5">
                    {[
                      { label: "+1", val: 1 },
                      { label: "+5", val: 5 },
                      { label: "+10", val: 10 },
                      { label: "+50", val: 50 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleStep(item.id, currentQty, preset.val)}
                        className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-1 text-[0.7rem] font-medium text-bone/70 transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredIngredients.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-bone/20" />
            <p className="mt-4 text-base text-bone/70">
              {L("لم يتم العثور على أي صنف بهذا الاسم.", "No inventory items found.")}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
