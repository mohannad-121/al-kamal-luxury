import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { useMenu, type InventoryIngredient } from "@/hooks/use-menu";
import type { DailyReport, DailySaleItem, Product } from "@/types";

type SaleResult = { ok: true } | { ok: false; ingredientId: string };

// Sales recorded before this reset belong to the original demo data.
const HISTORY_START_DATE = "2026-08-30";

interface DailySalesContextValue {
  activeDate: string;
  quantities: Record<string, number>;
  salesEntries: number;
  inventory: Record<string, number>;
  ingredients: InventoryIngredient[];
  history: DailyReport[];
  itemSales: DailySaleItem[];
  ingredientUsage: Record<string, number>;
  totalRevenue: number;
  totalItemsSold: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  recordSale: (product: Product) => Promise<SaleResult>;
  undoSale: (product: Product) => Promise<boolean>;
  addStock: (ingredientId: string, amount: number) => Promise<void>;
  closeDay: () => Promise<DailyReport | null>;
}

type SessionRow = {
  id: string;
  business_date: string;
  total_revenue: number;
  total_items_sold: number;
  total_sales_entries: number;
};
type ItemSaleRow = {
  menu_item_id: string;
  item_name_ar: string;
  item_name_en: string;
  category_id: string | null;
  unit_price: number;
  quantity_sold: number;
  revenue: number;
};
type UsageRow = { ingredient_id: string; quantity_used: number };
type HistoryRow = {
  id: string;
  business_date: string;
  closed_at: string;
  total_revenue: number;
  total_items_sold: number;
  total_sales_entries: number;
  closing_inventory: Record<string, number> | null;
  daily_item_sales: ItemSaleRow[] | null;
  daily_ingredient_usage: UsageRow[] | null;
};

const DailySalesContext = createContext<DailySalesContextValue | null>(null);

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Amman" }).format(new Date());
}

async function purgeLegacyHistory() {
  const { data: legacySessions, error: lookupError } = await supabase
    .from("daily_sessions")
    .select("id")
    .eq("is_closed", true)
    .lt("business_date", HISTORY_START_DATE);
  if (lookupError || !legacySessions?.length) return;

  const sessionIds = legacySessions.map((session) => session.id);
  const [salesDelete, usageDelete] = await Promise.all([
    supabase.from("daily_item_sales").delete().in("session_id", sessionIds),
    supabase.from("daily_ingredient_usage").delete().in("session_id", sessionIds),
  ]);
  if (salesDelete.error || usageDelete.error) return;

  await supabase.from("daily_sessions").delete().in("id", sessionIds).eq("is_closed", true);
}

export function DailySalesProvider({ children }: { children: ReactNode }) {
  const { ingredients, products, refresh: refreshMenu } = useMenu();
  const [activeSession, setActiveSession] = useState<SessionRow | null>(null);
  const [itemSales, setItemSales] = useState<DailySaleItem[]>([]);
  const [ingredientUsage, setIngredientUsage] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const activeDate = today();
    const { data: sessionData, error: sessionError } = await supabase
      .from("daily_sessions")
      .select("id, business_date, total_revenue, total_items_sold, total_sales_entries")
      .eq("business_date", activeDate)
      .eq("is_closed", false)
      .maybeSingle();

    if (sessionError) {
      setError(sessionError.message);
      setLoading(false);
      return;
    }

    const session = sessionData as SessionRow | null;
    setActiveSession(session);
    if (session) {
      const [salesResult, usageResult] = await Promise.all([
        supabase
          .from("daily_item_sales")
          .select(
            "menu_item_id, item_name_ar, item_name_en, category_id, unit_price, quantity_sold, revenue",
          )
          .eq("session_id", session.id),
        supabase
          .from("daily_ingredient_usage")
          .select("ingredient_id, quantity_used")
          .eq("session_id", session.id),
      ]);
      if (salesResult.error || usageResult.error) {
        setError(
          salesResult.error?.message ??
            usageResult.error?.message ??
            "Unable to load today’s sales.",
        );
      }
      setItemSales(
        ((salesResult.data ?? []) as ItemSaleRow[]).map((item) => ({
          productId: item.menu_item_id,
          nameAr: item.item_name_ar,
          nameEn: item.item_name_en,
          categoryId:
            products.find((product) => product.id === item.menu_item_id)?.categoryId ??
            item.category_id ??
            "",
          quantity: Number(item.quantity_sold),
          unitPrice: Number(item.unit_price),
          revenue: Number(item.revenue),
        })),
      );
      setIngredientUsage(
        Object.fromEntries(
          ((usageResult.data ?? []) as UsageRow[]).map((usage) => [
            usage.ingredient_id,
            Number(usage.quantity_used),
          ]),
        ),
      );
    } else {
      setItemSales([]);
      setIngredientUsage({});
    }

    await purgeLegacyHistory();
    const { data: historyData, error: historyError } = await supabase
      .from("daily_sessions")
      .select(
        "id, business_date, closed_at, total_revenue, total_items_sold, total_sales_entries, closing_inventory, daily_item_sales(menu_item_id, item_name_ar, item_name_en, category_id, unit_price, quantity_sold, revenue), daily_ingredient_usage(ingredient_id, quantity_used)",
      )
      .eq("is_closed", true)
      .gte("business_date", HISTORY_START_DATE)
      .order("business_date", { ascending: false });
    if (historyError) setError(historyError.message);
    setHistory(
      ((historyData ?? []) as HistoryRow[]).map((report) => {
        const reportItems = (report.daily_item_sales ?? []).map((item) => ({
          productId: item.menu_item_id,
          nameAr: item.item_name_ar,
          nameEn: item.item_name_en,
          categoryId:
            products.find((product) => product.id === item.menu_item_id)?.categoryId ??
            item.category_id ??
            "",
          quantity: Number(item.quantity_sold),
          unitPrice: Number(item.unit_price),
          revenue: Number(item.revenue),
        })) as DailySaleItem[];
        const reportUsage = Object.fromEntries(
          (report.daily_ingredient_usage ?? []).map((usage) => [
            usage.ingredient_id,
            Number(usage.quantity_used),
          ]),
        );
        const bestSeller = [...reportItems].sort((a, b) => b.quantity - a.quantity)[0];
        return {
          id: report.id,
          date: report.business_date,
          closedAt: report.closed_at,
          totalRevenue: Number(report.total_revenue),
          totalItemsSold: Number(report.total_items_sold),
          salesEntries: Number(report.total_sales_entries),
          itemSales: reportItems,
          ingredientUsage: reportUsage,
          inventory: report.closing_inventory ?? {},
          ...(bestSeller ? { bestSellingProduct: bestSeller.nameEn } : {}),
        } satisfies DailyReport;
      }),
    );
    setLoading(false);
  }, [products]);

  useEffect(() => {
    void refresh();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });
    return () => listener.subscription.unsubscribe();
  }, [refresh]);

  const sync = useCallback(async () => {
    await Promise.all([refresh(), refreshMenu()]);
  }, [refresh, refreshMenu]);

  const recordSale = useCallback(
    async (product: Product): Promise<SaleResult> => {
      const { data: sessionId, error: sessionError } = await supabase.rpc(
        "get_or_create_today_session",
      );
      if (sessionError || !sessionId) {
        setError(sessionError?.message ?? "Unable to open today’s sales session.");
        return { ok: false, ingredientId: "" };
      }
      const { error: saleError } = await supabase.rpc("record_sale", {
        p_session_id: sessionId,
        p_menu_item_id: product.id,
        p_delta: 1,
      });
      if (saleError) {
        setError(saleError.message);
        const missing = ingredients.find((ingredient) =>
          saleError.message.toLocaleLowerCase().includes(ingredient.nameEn.toLocaleLowerCase()),
        );
        return { ok: false, ingredientId: missing?.id ?? "" };
      }
      await sync();
      return { ok: true };
    },
    [ingredients, sync],
  );

  const undoSale = useCallback(
    async (product: Product) => {
      const currentSale = itemSales.find((item) => item.productId === product.id);
      if (!activeSession || !currentSale || currentSale.quantity <= 0) return false;

      setError(null);
      const nextQuantity = currentSale.quantity - 1;
      const { error: undoError } = await supabase.rpc("record_sale", {
        p_session_id: activeSession.id,
        p_menu_item_id: product.id,
        p_delta: -1,
      });

      const { data: verifiedSale, error: verificationError } = await supabase
        .from("daily_item_sales")
        .select("quantity_sold")
        .eq("session_id", activeSession.id)
        .eq("menu_item_id", product.id)
        .maybeSingle();
      const verifiedQuantity = verifiedSale ? Number(verifiedSale.quantity_sold) : 0;

      if (!undoError && !verificationError && verifiedQuantity === nextQuantity) {
        await sync();
        return true;
      }

      // Some deployed versions of record_sale reject or ignore a delta that
      // would reduce a row to zero. Fall back to verified admin updates so the
      // minus button can always reverse one recorded sale.
      if (!undoError && verificationError) {
        setError(verificationError.message);
        await sync();
        return false;
      }
      if (!undoError && verifiedQuantity !== currentSale.quantity) {
        await sync();
        return verifiedQuantity < currentSale.quantity;
      }

      const rollback: Array<() => Promise<void>> = [];
      try {
        const nextRevenue = Math.max(
          0,
          Number((currentSale.revenue - currentSale.unitPrice).toFixed(3)),
        );
        const { data: saleRows, error: saleUpdateError } = await supabase
          .from("daily_item_sales")
          .update({ quantity_sold: nextQuantity, revenue: nextRevenue })
          .eq("session_id", activeSession.id)
          .eq("menu_item_id", product.id)
          .eq("quantity_sold", currentSale.quantity)
          .select("menu_item_id");
        if (saleUpdateError || saleRows?.length !== 1) {
          throw new Error(
            saleUpdateError?.message ?? "The sale changed on another device. Try again.",
          );
        }
        rollback.push(async () => {
          await supabase
            .from("daily_item_sales")
            .update({ quantity_sold: currentSale.quantity, revenue: currentSale.revenue })
            .eq("session_id", activeSession.id)
            .eq("menu_item_id", product.id)
            .eq("quantity_sold", nextQuantity);
        });

        for (const recipeItem of product.recipe ?? []) {
          const currentUsage = ingredientUsage[recipeItem.ingredientId] ?? 0;
          const reversalQuantity = Math.min(currentUsage, recipeItem.quantity);
          if (reversalQuantity <= 0) continue;
          const nextUsage = currentUsage - reversalQuantity;
          const { data: usageRows, error: usageUpdateError } = await supabase
            .from("daily_ingredient_usage")
            .update({ quantity_used: nextUsage })
            .eq("session_id", activeSession.id)
            .eq("ingredient_id", recipeItem.ingredientId)
            .eq("quantity_used", currentUsage)
            .select("ingredient_id");
          if (usageUpdateError || usageRows?.length !== 1) {
            throw new Error(
              usageUpdateError?.message ?? "Ingredient usage changed on another device. Try again.",
            );
          }
          rollback.push(async () => {
            await supabase
              .from("daily_ingredient_usage")
              .update({ quantity_used: currentUsage })
              .eq("session_id", activeSession.id)
              .eq("ingredient_id", recipeItem.ingredientId)
              .eq("quantity_used", nextUsage);
          });
        }

        const nextSessionRevenue = Math.max(
          0,
          Number((Number(activeSession.total_revenue) - currentSale.unitPrice).toFixed(3)),
        );
        const nextItemsSold = Math.max(0, Number(activeSession.total_items_sold) - 1);
        const nextSalesEntries = Math.max(0, Number(activeSession.total_sales_entries) - 1);
        const { data: sessionRows, error: sessionUpdateError } = await supabase
          .from("daily_sessions")
          .update({
            total_revenue: nextSessionRevenue,
            total_items_sold: nextItemsSold,
            total_sales_entries: nextSalesEntries,
          })
          .eq("id", activeSession.id)
          .eq("total_items_sold", activeSession.total_items_sold)
          .select("id");
        if (sessionUpdateError || sessionRows?.length !== 1) {
          throw new Error(
            sessionUpdateError?.message ?? "Daily totals changed on another device. Try again.",
          );
        }
        rollback.push(async () => {
          await supabase
            .from("daily_sessions")
            .update({
              total_revenue: activeSession.total_revenue,
              total_items_sold: activeSession.total_items_sold,
              total_sales_entries: activeSession.total_sales_entries,
            })
            .eq("id", activeSession.id)
            .eq("total_items_sold", nextItemsSold);
        });

        for (const recipeItem of product.recipe ?? []) {
          const reversalQuantity = Math.min(
            ingredientUsage[recipeItem.ingredientId] ?? 0,
            recipeItem.quantity,
          );
          if (reversalQuantity <= 0) continue;
          const { error: inventoryError } = await supabase.rpc("adjust_inventory", {
            p_ingredient_id: recipeItem.ingredientId,
            p_quantity_change: reversalQuantity,
            p_note: `Removed sale: ${product.nameEn}`,
          });
          if (inventoryError) throw new Error(inventoryError.message);
          rollback.push(async () => {
            await supabase.rpc("adjust_inventory", {
              p_ingredient_id: recipeItem.ingredientId,
              p_quantity_change: -reversalQuantity,
              p_note: `Rollback removed sale: ${product.nameEn}`,
            });
          });
        }

        if (nextQuantity === 0) {
          await supabase
            .from("daily_item_sales")
            .delete()
            .eq("session_id", activeSession.id)
            .eq("menu_item_id", product.id)
            .eq("quantity_sold", 0);
        }

        await sync();
        return true;
      } catch (caught) {
        for (const restore of rollback.reverse()) await restore();
        const message = caught instanceof Error ? caught.message : undoError?.message;
        setError(message ?? "Unable to remove this sale.");
        await sync();
        return false;
      }
    },
    [activeSession, ingredientUsage, itemSales, sync],
  );

  const addStock = useCallback(
    async (ingredientId: string, amount: number) => {
      const { error: stockError } = await supabase.rpc("adjust_inventory", {
        p_ingredient_id: ingredientId,
        p_quantity_change: amount,
        p_note: "Admin stock adjustment",
      });
      if (stockError) {
        setError(stockError.message);
        return;
      }
      await sync();
    },
    [sync],
  );

  const closeDay = useCallback(async () => {
    if (!activeSession) return null;
    const report = {
      id: activeSession.id,
      date: activeSession.business_date,
      closedAt: new Date().toISOString(),
      totalRevenue: Number(activeSession.total_revenue),
      totalItemsSold: Number(activeSession.total_items_sold),
      salesEntries: Number(activeSession.total_sales_entries),
      itemSales,
      ingredientUsage,
      inventory: Object.fromEntries(
        ingredients.map((ingredient) => [ingredient.id, ingredient.availableQuantity]),
      ),
      ...(() => {
        const bestSeller = [...itemSales].sort((a, b) => b.quantity - a.quantity)[0];
        return bestSeller ? { bestSellingProduct: bestSeller.nameEn } : {};
      })(),
    } satisfies DailyReport;
    const { error: closeError } = await supabase.rpc("close_daily_session", {
      p_session_id: activeSession.id,
    });
    if (closeError) {
      setError(closeError.message);
      return null;
    }
    await sync();
    return report;
  }, [activeSession, ingredientUsage, ingredients, itemSales, sync]);

  const quantities = useMemo(
    () => Object.fromEntries(itemSales.map((item) => [item.productId, item.quantity])),
    [itemSales],
  );
  const inventory = useMemo(
    () =>
      Object.fromEntries(
        ingredients.map((ingredient) => [ingredient.id, ingredient.availableQuantity]),
      ),
    [ingredients],
  );
  const totalRevenue = activeSession ? Number(activeSession.total_revenue) : 0;
  const totalItemsSold = activeSession ? Number(activeSession.total_items_sold) : 0;
  const salesEntries = activeSession ? Number(activeSession.total_sales_entries) : 0;

  const value = useMemo(
    () => ({
      activeDate: activeSession?.business_date ?? today(),
      quantities,
      salesEntries,
      inventory,
      ingredients,
      history,
      itemSales,
      ingredientUsage,
      totalRevenue,
      totalItemsSold,
      loading,
      error,
      refresh,
      recordSale,
      undoSale,
      addStock,
      closeDay,
    }),
    [
      activeSession?.business_date,
      addStock,
      closeDay,
      error,
      history,
      ingredientUsage,
      ingredients,
      inventory,
      itemSales,
      loading,
      quantities,
      recordSale,
      refresh,
      salesEntries,
      totalItemsSold,
      totalRevenue,
      undoSale,
    ],
  );

  return <DailySalesContext.Provider value={value}>{children}</DailySalesContext.Provider>;
}

export function useDailySales() {
  const context = useContext(DailySalesContext);
  if (!context) throw new Error("useDailySales must be used inside DailySalesProvider");
  return context;
}
