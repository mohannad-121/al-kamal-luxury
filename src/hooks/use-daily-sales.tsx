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
  undoSale: (product: Product) => Promise<void>;
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

    const { data: historyData, error: historyError } = await supabase
      .from("daily_sessions")
      .select(
        "id, business_date, closed_at, total_revenue, total_items_sold, total_sales_entries, closing_inventory, daily_item_sales(menu_item_id, item_name_ar, item_name_en, category_id, unit_price, quantity_sold, revenue), daily_ingredient_usage(ingredient_id, quantity_used)",
      )
      .eq("is_closed", true)
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
      if (!activeSession) return;
      const { error: undoError } = await supabase.rpc("record_sale", {
        p_session_id: activeSession.id,
        p_menu_item_id: product.id,
        p_delta: -1,
      });
      if (undoError) {
        setError(undoError.message);
        return;
      }
      await sync();
    },
    [activeSession, sync],
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
