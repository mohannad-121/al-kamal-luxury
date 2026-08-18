import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ProductSheet } from "@/components/ProductSheet";
import type { Product } from "@/types";

interface Ctx {
  openProduct: (p: Product) => void;
}

const C = createContext<Ctx | null>(null);

export function ProductSheetProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Product | null>(null);
  const openProduct = useCallback((p: Product) => setActive(p), []);
  const value = useMemo(() => ({ openProduct }), [openProduct]);

  return (
    <C.Provider value={value}>
      {children}
      <ProductSheet product={active} onClose={() => setActive(null)} />
    </C.Provider>
  );
}

export function useProductSheet(): Ctx {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useProductSheet must be used inside ProductSheetProvider");
  return ctx;
}
