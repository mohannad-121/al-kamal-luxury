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
  updateStock: (ingredientId: string, amount: number) => Promise<void>;
  resetAllStockToZero: () => Promise<void>;
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

function isUuid(str: string | null | undefined): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

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
  const { ingredients, products, categoryRows, refresh: refreshMenu } = useMenu();
  const [activeSession, setActiveSession] = useState<SessionRow | null>(null);
  const [itemSales, setItemSales] = useState<DailySaleItem[]>([]);
  const [ingredientUsage, setIngredientUsage] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categoryRows ?? []) {
      if (cat.slug && cat.id) map.set(cat.slug, cat.id);
    }
    return map;
  }, [categoryRows]);

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
      setError(null);
      const activeDate = today();

      // 1. Get or create today's active session ID
      let sessionId: string | null = null;
      const { data: rpcSessionId, error: rpcErr } = await supabase.rpc(
        "get_or_create_today_session",
      );

      if (!rpcErr && rpcSessionId) {
        sessionId = rpcSessionId;
      } else {
        const { data: existingSession } = await supabase
          .from("daily_sessions")
          .select("id")
          .eq("business_date", activeDate)
          .eq("is_closed", false)
          .maybeSingle();

        if (existingSession?.id) {
          sessionId = existingSession.id;
        } else {
          const { data: newSession, error: createErr } = await supabase
            .from("daily_sessions")
            .insert({
              business_date: activeDate,
              total_revenue: 0,
              total_items_sold: 0,
              total_sales_entries: 0,
              is_closed: false,
            })
            .select("id")
            .single();

          if (createErr || !newSession) {
            const msg = createErr?.message ?? "Unable to open daily sales session.";
            console.error("[recordSale] Session creation error:", createErr);
            setError(msg);
            return { ok: false, ingredientId: "" };
          }
          sessionId = newSession.id;
        }
      }

      if (!sessionId) {
        setError("Unable to resolve today's sales session.");
        return { ok: false, ingredientId: "" };
      }

      // 2. Resolve category UUID safely
      const categoryUUID =
        categoryMap.get(product.categoryId) ||
        (isUuid(product.categoryId) ? product.categoryId : null);

      // 3. Calculate unit price safely
      const rawPrice = Number(product.price);
      const rawDiscount = Number(product.discount ?? 0);
      const unitPrice = Math.max(
        0,
        Number.isFinite(rawPrice)
          ? rawPrice - (Number.isFinite(rawDiscount) ? rawDiscount : 0)
          : 0,
      );

      // 4. Query current quantity sold for this item in this session
      const { data: existingSale, error: fetchSaleErr } = await supabase
        .from("daily_item_sales")
        .select("quantity_sold, revenue")
        .eq("session_id", sessionId)
        .eq("menu_item_id", product.id)
        .maybeSingle();

      if (fetchSaleErr) {
        console.error("[recordSale] Fetch item sale error:", fetchSaleErr);
      }

      const currentQty = Number(existingSale?.quantity_sold ?? 0);
      const currentRev = Number(existingSale?.revenue ?? 0);
      const nextQty = currentQty + 1;
      const nextRev = Number((currentRev + unitPrice).toFixed(3));

      // 5. Upsert into daily_item_sales (Zero inventory touched)
      const { error: upsertErr } = await supabase.from("daily_item_sales").upsert(
        {
          session_id: sessionId,
          menu_item_id: product.id,
          item_name_ar: product.nameAr,
          item_name_en: product.nameEn,
          category_id: categoryUUID,
          unit_price: unitPrice,
          quantity_sold: nextQty,
          revenue: nextRev,
        },
        { onConflict: "session_id,menu_item_id" },
      );

      if (upsertErr) {
        console.error(
          `[recordSale Failed] Product: "${product.nameEn}" (${product.id}), Category: ${product.categoryId} (UUID: ${categoryUUID}), Error:`,
          upsertErr,
        );
        setError(`تعذر تسجيل البيع: ${upsertErr.message}`);
        return { ok: false, ingredientId: "" };
      }

      // 6. Update session totals in database directly
      const { data: latestSession } = await supabase
        .from("daily_sessions")
        .select("total_revenue, total_items_sold, total_sales_entries")
        .eq("id", sessionId)
        .single();

      if (latestSession) {
        const nextTotalRevenue = Number(
          (Number(latestSession.total_revenue ?? 0) + unitPrice).toFixed(3),
        );
        const nextTotalItems = Number(latestSession.total_items_sold ?? 0) + 1;
        const nextSalesEntries = Number(latestSession.total_sales_entries ?? 0) + 1;

        await supabase
          .from("daily_sessions")
          .update({
            total_revenue: nextTotalRevenue,
            total_items_sold: nextTotalItems,
            total_sales_entries: nextSalesEntries,
          })
          .eq("id", sessionId);
      }

      // 7. Verify sale persisted in database
      const { data: verifiedSale, error: verifyErr } = await supabase
        .from("daily_item_sales")
        .select("quantity_sold")
        .eq("session_id", sessionId)
        .eq("menu_item_id", product.id)
        .single();

      if (verifyErr || !verifiedSale || Number(verifiedSale.quantity_sold) !== nextQty) {
        console.error(
          `[recordSale Verification Failed] Expected qty ${nextQty}, got ${verifiedSale?.quantity_sold}, error:`,
          verifyErr,
        );
        setError("تعذر التحقق من تسجيل البيع في قاعدة البيانات.");
        return { ok: false, ingredientId: "" };
      }

      // 8. Success! Sync UI state from Supabase without touching inventory.
      await sync();
      return { ok: true };
    },
    [categoryMap, sync],
  );

  const undoSale = useCallback(
    async (product: Product): Promise<boolean> => {
      setError(null);
      const activeDate = today();

      // Find session ID
      const { data: sessionData } = await supabase
        .from("daily_sessions")
        .select("id")
        .eq("business_date", activeDate)
        .eq("is_closed", false)
        .maybeSingle();

      const sessionId = sessionData?.id ?? activeSession?.id;
      if (!sessionId) return false;

      const rawPrice = Number(product.price);
      const rawDiscount = Number(product.discount ?? 0);
      const unitPrice = Math.max(
        0,
        Number.isFinite(rawPrice)
          ? rawPrice - (Number.isFinite(rawDiscount) ? rawDiscount : 0)
          : 0,
      );

      const { data: existingSale } = await supabase
        .from("daily_item_sales")
        .select("quantity_sold, revenue")
        .eq("session_id", sessionId)
        .eq("menu_item_id", product.id)
        .maybeSingle();

      if (!existingSale || Number(existingSale.quantity_sold) <= 0) return false;

      const currentQty = Number(existingSale.quantity_sold);
      const currentRev = Number(existingSale.revenue);
      const nextQty = currentQty - 1;
      const nextRev = Math.max(0, Number((currentRev - unitPrice).toFixed(3)));

      if (nextQty > 0) {
        const { error: updateErr } = await supabase
          .from("daily_item_sales")
          .update({ quantity_sold: nextQty, revenue: nextRev })
          .eq("session_id", sessionId)
          .eq("menu_item_id", product.id);

        if (updateErr) {
          console.error("[undoSale Error]", updateErr.message);
          setError(updateErr.message);
          return false;
        }
      } else {
        const { error: deleteErr } = await supabase
          .from("daily_item_sales")
          .delete()
          .eq("session_id", sessionId)
          .eq("menu_item_id", product.id);

        if (deleteErr) {
          console.error("[undoSale Delete Error]", deleteErr.message);
          setError(deleteErr.message);
          return false;
        }
      }

      // Update session totals in database directly
      const { data: latestSession } = await supabase
        .from("daily_sessions")
        .select("total_revenue, total_items_sold, total_sales_entries")
        .eq("id", sessionId)
        .single();

      if (latestSession) {
        await supabase
          .from("daily_sessions")
          .update({
            total_revenue: Math.max(
              0,
              Number((Number(latestSession.total_revenue ?? 0) - unitPrice).toFixed(3)),
            ),
            total_items_sold: Math.max(0, Number(latestSession.total_items_sold ?? 0) - 1),
            total_sales_entries: Math.max(0, Number(latestSession.total_sales_entries ?? 0) - 1),
          })
          .eq("id", sessionId);
      }

      // Success! NO inventory modification. Sync UI.
      await sync();
      return true;
    },
    [activeSession?.id, sync],
  );

  const updateStock = useCallback(
    async (ingredientId: string, amount: number) => {
      const safeAmount = Math.max(0, Number.isFinite(amount) ? amount : 0);
      const { error: updateError } = await supabase
        .from("ingredients")
        .update({ available_quantity: safeAmount })
        .eq("id", ingredientId);

      if (updateError) {
        setError(updateError.message);
      }
      await sync();
    },
    [sync],
  );

  const addStock = useCallback(
    async (ingredientId: string, amount: number) => {
      const currentQty = ingredients.find((item) => item.id === ingredientId)?.availableQuantity ?? 0;
      await updateStock(ingredientId, currentQty + amount);
    },
    [ingredients, updateStock],
  );

  const resetAllStockToZero = useCallback(async () => {
    for (const ingredient of ingredients) {
      const { error: resetError } = await supabase
        .from("ingredients")
        .update({ available_quantity: 0 })
        .eq("id", ingredient.id);
      if (resetError) setError(resetError.message);
    }
    await sync();
  }, [ingredients, sync]);

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
      updateStock,
      resetAllStockToZero,
      closeDay,
    }),
    [
      activeSession?.business_date,
      addStock,
      updateStock,
      resetAllStockToZero,
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
