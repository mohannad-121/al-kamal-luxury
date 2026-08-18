/**
 * Data boundary for the UI. The customer journey is usable locally: placed
 * orders persist in this browser for testing. Replace these calls with
 * authenticated server/database operations before a production launch.
 */
import { categories } from "@/data/categories";
import { hiddenProductIds, products } from "@/data/menu";
import { deliveryAreas } from "@/data/orders";
import { reviews } from "@/data/reviews";
import type { CartLine, DeliveryType, Order, OrderStatus, Product } from "@/types";

const delay = <T>(value: T, ms = 120) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
// v2 intentionally starts with an empty demo order history.
const ORDERS_KEY = "alkamal.orders.v2";
const storedOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
};
const persistOrders = (orders: Order[]) => {
  if (typeof window !== "undefined") localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

const visibleProducts = products.filter((product) => !hiddenProductIds.has(product.id));

export const getProducts = () => delay(visibleProducts);
export const getProductsSync = () => visibleProducts;
export const getCategories = () => delay(categories.filter((category) => category.active));
export const getCategoriesSync = () => categories;
export const getReviews = () => delay(reviews);
export const getDeliveryAreas = () => delay(deliveryAreas);
export const getOrders = () => delay(storedOrders());
export const getPopular = (): Product[] => visibleProducts.filter((product) => product.popular);
export const getFeatured = (): Product[] => visibleProducts.filter((product) => product.featured);
export const getProductById = (id: string) => visibleProducts.find((product) => product.id === id);

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

export const createOrder = async (input: CreateOrderInput): Promise<Order> => {
  const order: Order = {
    id: `AK-${1049 + storedOrders().length}`,
    customer: input.name,
    phone: input.phone,
    type: input.type,
    ...(input.area ? { area: input.area } : {}),
    address: [input.street, input.building, input.floor, input.details].filter(Boolean).join("، "),
    items: input.lines.map((line) => ({
      nameAr: line.nameAr,
      qty: line.qty,
      extrasAr: line.extras.map((extra) => extra.nameAr),
      ...(line.note ? { note: line.note } : {}),
      price: line.unitPrice,
    })),
    subtotal: input.subtotal,
    delivery: input.delivery,
    discount: input.discount,
    total: input.total,
    payment: input.payment,
    status: "received",
    createdAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    ...(input.notes ? { notes: input.notes } : {}),
  };
  persistOrders([order, ...storedOrders()]);
  return delay(order);
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  persistOrders(storedOrders().map((order) => (order.id === id ? { ...order, status } : order)));
  return delay({ id, status });
};
export const trackOrder = async (id: string, phone?: string) => {
  const order = storedOrders().find(
    (candidate) => candidate.id.toLowerCase() === id.trim().toLowerCase(),
  );
  const phoneMatches = !phone || order?.phone.replace(/\D/g, "") === phone.replace(/\D/g, "");
  return delay(order && phoneMatches ? order : null, 400);
};
