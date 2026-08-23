export type Lang = "ar" | "en";

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  active: boolean;
  order: number;
}

export interface Extra {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

/** Inventory uses base units so recipes can be added together safely. */
export type IngredientUnit = "g" | "ml" | "piece";

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
}

export interface IngredientDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  unit: IngredientUnit;
  initialQuantity: number;
  lowStockThreshold: number;
}

export interface Product {
  id: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  discount?: number;
  image: string;
  available: boolean;
  popular: boolean;
  featured?: boolean;
  extras?: Extra[];
  recipe?: RecipeIngredient[];
}

export interface DailySaleItem {
  productId: string;
  nameAr: string;
  nameEn: string;
  categoryId: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
}

export interface DailyReport {
  id: string;
  date: string;
  closedAt: string;
  totalRevenue: number;
  totalItemsSold: number;
  salesEntries: number;
  itemSales: DailySaleItem[];
  ingredientUsage: Record<string, number>;
  inventory: Record<string, number>;
  bestSellingProduct?: string;
}

export interface CartExtra {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface CartLine {
  lineId: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  unitPrice: number;
  qty: number;
  extras: CartExtra[];
  note?: string;
}

export type DeliveryType = "pickup" | "delivery";

export type OrderStatus =
  "received" | "preparing" | "ready" | "on_the_way" | "delivered" | "cancelled";

export interface OrderItem {
  nameAr: string;
  qty: number;
  extrasAr?: string[];
  note?: string;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  type: DeliveryType;
  area?: string;
  address?: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  discount?: number;
  total: number;
  payment: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  textAr: string;
  textEn: string;
  rating: number;
  cityAr: string;
}

export interface DeliveryArea {
  id: string;
  nameAr: string;
  nameEn: string;
  fee: number;
  active: boolean;
}
