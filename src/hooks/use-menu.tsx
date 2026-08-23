import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { hiddenProductIds, products as defaultProducts } from "@/data/menu";
import type { Product } from "@/types";

interface MenuContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const STORAGE_KEY = "alkamal.menu.v1";
const MenuContext = createContext<MenuContextValue | null>(null);
const initialProducts = defaultProducts.filter((product) => !hiddenProductIds.has(product.id));

export function MenuProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) setProducts(parsed as Product[]);
      }
    } catch {
      // Keep the built-in menu if saved data cannot be read.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // The in-page menu still works if browser storage is unavailable or full.
    }
  }, [hydrated, products]);

  useEffect(() => {
    const syncMenu = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue) as unknown;
        if (Array.isArray(parsed)) setProducts(parsed as Product[]);
      } catch {
        // Ignore malformed data written by another browser context.
      }
    };
    window.addEventListener("storage", syncMenu);
    return () => window.removeEventListener("storage", syncMenu);
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((current) => [...current, product]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((current) => current.map((item) => (item.id === product.id ? product : item)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  }, []);

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct }),
    [products, addProduct, updateProduct, deleteProduct],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside MenuProvider");
  return context;
}
