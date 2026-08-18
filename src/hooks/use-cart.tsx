import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { restaurant } from "@/config/restaurant";
import type { CartExtra, CartLine, Product } from "@/types";

interface AddInput {
  product: Product;
  qty: number;
  extras: CartExtra[];
  note?: string;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  setDelivery: (v: number) => void;
  add: (input: AddInput) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  setNote: (lineId: string, note: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "alkamal.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [delivery, setDelivery] = useState(restaurant.deliveryFeeDefault);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* demo persistence only */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback(({ product, qty, extras, note }: AddInput) => {
    const unitPrice =
      product.price - (product.discount ?? 0) + extras.reduce((s, e) => s + e.price, 0);
    const signature = `${product.id}|${extras.map((e) => e.id).sort().join(",")}|${note ?? ""}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === signature);
      if (existing) {
        return prev.map((l) => (l.lineId === signature ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        {
          lineId: signature,
          productId: product.id,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          image: product.image,
          unitPrice,
          qty,
          extras,
          ...(note ? { note } : {}),
        },
      ];
    });
  }, []);

  const remove = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const setQty = useCallback((lineId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.lineId !== lineId)
        : prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
    );
  }, []);

  const setNote = useCallback((lineId: string, note: string) => {
    setLines((prev) => prev.map((l) => (l.lineId === lineId ? { ...l, note } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const discount = subtotal > 5 ? restaurant.demoDiscount : 0;
  const total = Math.max(0, subtotal + (lines.length ? delivery : 0) - discount);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count,
      subtotal,
      delivery: lines.length ? delivery : 0,
      discount,
      total,
      open,
      setOpen,
      setDelivery,
      add,
      remove,
      setQty,
      setNote,
      clear,
    }),
    [lines, count, subtotal, delivery, discount, total, open, add, remove, setQty, setNote, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
