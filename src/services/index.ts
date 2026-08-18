/**
 * Frontend service layer — MOCK ONLY.
 * Every function here returns local data. Swap the bodies for real API
 * calls later without touching any UI component.
 */
import { categories } from "@/data/categories";
import { products } from "@/data/menu";
import { deliveryAreas, seedOrders } from "@/data/orders";
import { reviews } from "@/data/reviews";
import type { CartLine, DeliveryType, Order, OrderStatus, Product } from "@/types";

const delay = <T,>(value: T, ms = 120) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const getProducts = () => delay(products);
export const getProductsSync = () => products;
export const getCategories = () => delay(categories.filter((c) => c.active));
export const getCategoriesSync = () => categories;
export const getReviews = () => delay(reviews);
export const getDeliveryAreas = () => delay(deliveryAreas);
export const getOrders = () => delay(seedOrders);

export const getPopular = (): Product[] => products.filter((p) => p.popular);
export const getFeatured = (): Product[] => products.filter((p) => p.featured);

export const getProductById = (id: string) => products.find((p) => p.id === id);

let demoCounter = 1027;

export interface CreateOrderInput {
  name: string;
  phone: string;
  type: DeliveryType;
  area?: string;
  street?: string;
  building?: string;
  floor?: string;
  details?: string;
  notes?: string;
  payment: string;
  lines: CartLine[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}

/** DEMO: builds an order object in memory only. */
export const createOrder = async (input: CreateOrderInput): Promise<Order> => {
  const id = `AK-${demoCounter++}`;
  return delay({
    id,
    customer: input.name,
    phone: input.phone,
    type: input.type,
    ...(input.area ? { area: input.area } : {}),
    address: [input.street, input.building, input.floor, input.details]
      .filter(Boolean)
      .join("، "),
    items: input.lines.map((l) => ({
      nameAr: l.nameAr,
      qty: l.qty,
      extrasAr: l.extras.map((e) => e.nameAr),
      ...(l.note ? { note: l.note } : {}),
      price: l.unitPrice,
    })),
    subtotal: input.subtotal,
    delivery: input.delivery,
    discount: input.discount,
    total: input.total,
    payment: input.payment,
    status: "received" as OrderStatus,
    createdAt: new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    ...(input.notes ? { notes: input.notes } : {}),
  });
};

/** DEMO: status change is local state only. */
export const updateOrderStatus = async (id: string, status: OrderStatus) =>
  delay({ id, status });

/** DEMO: tracking lookup against seeded orders. */
export const trackOrder = async (id: string) =>
  delay(seedOrders.find((o) => o.id.toLowerCase() === id.trim().toLowerCase()) ?? null, 500);
