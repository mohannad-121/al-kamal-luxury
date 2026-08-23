import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ingredientDefinitions } from "@/data/inventory";
import { useMenu } from "@/hooks/use-menu";
import type { DailyReport, DailySaleItem, Product } from "@/types";

const STORAGE_KEY = "alkamal.daily-sales.v1";

type DailySalesState = {
  activeDate: string;
  quantities: Record<string, number>;
  salesEntries: number;
  inventory: Record<string, number>;
  history: DailyReport[];
};

type SaleResult = { ok: true } | { ok: false; ingredientId: string };

interface DailySalesContextValue {
  activeDate: string;
  quantities: Record<string, number>;
  salesEntries: number;
  inventory: Record<string, number>;
  history: DailyReport[];
  itemSales: DailySaleItem[];
  ingredientUsage: Record<string, number>;
  totalRevenue: number;
  totalItemsSold: number;
  recordSale: (product: Product) => SaleResult;
  undoSale: (product: Product) => void;
  addStock: (ingredientId: string, amount: number) => void;
  closeDay: () => DailyReport;
}

const DailySalesContext = createContext<DailySalesContextValue | null>(null);

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Amman" }).format(new Date());
}

function initialInventory() {
  return Object.fromEntries(
    ingredientDefinitions.map((ingredient) => [ingredient.id, ingredient.initialQuantity]),
  );
}

function initialState(): DailySalesState {
  return {
    activeDate: today(),
    quantities: {},
    salesEntries: 0,
    inventory: initialInventory(),
    history: [],
  };
}

function isState(value: unknown): value is DailySalesState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<DailySalesState>;
  return (
    typeof state.activeDate === "string" &&
    typeof state.salesEntries === "number" &&
    Boolean(state.quantities) &&
    Boolean(state.inventory) &&
    Array.isArray(state.history)
  );
}

export function DailySalesProvider({ children }: { children: ReactNode }) {
  const { products } = useMenu();
  const [state, setState] = useState<DailySalesState>(initialState);
  const stateRef = useRef(state);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (isState(parsed)) {
          setState({
            ...parsed,
            inventory: { ...initialInventory(), ...parsed.inventory },
          });
        }
      }
    } catch {
      // Keep the built-in inventory if browser storage cannot be read.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The current page remains usable if browser storage is unavailable or full.
    }
  }, [hydrated, state]);

  useEffect(() => {
    const syncDailySales = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue) as unknown;
        if (isState(parsed)) {
          setState({ ...parsed, inventory: { ...initialInventory(), ...parsed.inventory } });
        }
      } catch {
        // Ignore malformed data from another browser context.
      }
    };
    window.addEventListener("storage", syncDailySales);
    return () => window.removeEventListener("storage", syncDailySales);
  }, []);

  const updateState = useCallback((updater: (current: DailySalesState) => DailySalesState) => {
    const next = updater(stateRef.current);
    stateRef.current = next;
    setState(next);
  }, []);

  const { itemSales, ingredientUsage, totalRevenue, totalItemsSold } = useMemo(() => {
    const usage: Record<string, number> = {};
    const sales = products
      .map((product) => {
        const quantity = state.quantities[product.id] ?? 0;
        if (!quantity) return null;
        for (const ingredient of product.recipe ?? []) {
          usage[ingredient.ingredientId] =
            (usage[ingredient.ingredientId] ?? 0) + ingredient.quantity * quantity;
        }
        const unitPrice = product.price - (product.discount ?? 0);
        return {
          productId: product.id,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          categoryId: product.categoryId,
          quantity,
          unitPrice,
          revenue: unitPrice * quantity,
        } satisfies DailySaleItem;
      })
      .filter((sale): sale is DailySaleItem => sale !== null);
    return {
      itemSales: sales,
      ingredientUsage: usage,
      totalRevenue: sales.reduce((sum, sale) => sum + sale.revenue, 0),
      totalItemsSold: sales.reduce((sum, sale) => sum + sale.quantity, 0),
    };
  }, [products, state.quantities]);

  const recordSale = useCallback(
    (product: Product): SaleResult => {
      const currentState = stateRef.current;
      const missingIngredient = (product.recipe ?? []).find((ingredient) => {
        const stock = currentState.inventory[ingredient.ingredientId] ?? 0;
        return stock < ingredient.quantity;
      });
      if (missingIngredient) return { ok: false, ingredientId: missingIngredient.ingredientId };

      updateState((current) => {
        const inventory = { ...current.inventory };
        for (const ingredient of product.recipe ?? []) {
          inventory[ingredient.ingredientId] = Math.max(
            0,
            (inventory[ingredient.ingredientId] ?? 0) - ingredient.quantity,
          );
        }
        return {
          ...current,
          quantities: {
            ...current.quantities,
            [product.id]: (current.quantities[product.id] ?? 0) + 1,
          },
          salesEntries: current.salesEntries + 1,
          inventory,
        };
      });
      return { ok: true };
    },
    [updateState],
  );

  const undoSale = useCallback(
    (product: Product) => {
      updateState((current) => {
        const quantity = current.quantities[product.id] ?? 0;
        if (!quantity) return current;
        const inventory = { ...current.inventory };
        for (const ingredient of product.recipe ?? []) {
          inventory[ingredient.ingredientId] =
            (inventory[ingredient.ingredientId] ?? 0) + ingredient.quantity;
        }
        return {
          ...current,
          quantities: { ...current.quantities, [product.id]: quantity - 1 },
          salesEntries: Math.max(0, current.salesEntries - 1),
          inventory,
        };
      });
    },
    [updateState],
  );

  const addStock = useCallback(
    (ingredientId: string, amount: number) => {
      if (!Number.isFinite(amount) || amount === 0) return;
      updateState((current) => ({
        ...current,
        inventory: {
          ...current.inventory,
          [ingredientId]: Math.max(0, (current.inventory[ingredientId] ?? 0) + amount),
        },
      }));
    },
    [updateState],
  );

  const closeDay = useCallback(() => {
    const bestSelling = [...itemSales].sort(
      (a, b) => b.quantity - a.quantity || b.revenue - a.revenue,
    )[0];
    const report: DailyReport = {
      id: `day-${Date.now()}`,
      date: state.activeDate,
      closedAt: new Date().toISOString(),
      totalRevenue,
      totalItemsSold,
      salesEntries: state.salesEntries,
      itemSales,
      ingredientUsage,
      inventory: { ...state.inventory },
      ...(bestSelling ? { bestSellingProduct: bestSelling.nameEn } : {}),
    };
    updateState((current) => ({
      ...current,
      activeDate: today(),
      quantities: {},
      salesEntries: 0,
      history: [report, ...current.history],
    }));
    return report;
  }, [
    ingredientUsage,
    itemSales,
    state.activeDate,
    state.inventory,
    state.salesEntries,
    totalItemsSold,
    totalRevenue,
    updateState,
  ]);

  const value = useMemo(
    () => ({
      ...state,
      itemSales,
      ingredientUsage,
      totalRevenue,
      totalItemsSold,
      recordSale,
      undoSale,
      addStock,
      closeDay,
    }),
    [
      addStock,
      closeDay,
      ingredientUsage,
      itemSales,
      recordSale,
      state,
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
