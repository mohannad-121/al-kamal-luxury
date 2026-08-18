import type { DeliveryArea, Order } from "@/types";

/** DEMO orders for the admin prototype. */
export const seedOrders: Order[] = [
  {
    id: "AK-1048",
    customer: "أحمد محمد",
    phone: "0790 000 111",
    type: "delivery",
    area: "خلدا",
    address: "شارع وصفي التل، بناية ١٢، الطابق ٢",
    items: [
      { nameAr: "سندويشة فلافل", qty: 2, extrasAr: ["خضار إضافية"], price: 1.25 },
      { nameAr: "حمص", qty: 1, price: 2.0 },
      { nameAr: "فول", qty: 1, price: 1.75 },
    ],
    subtotal: 6.25,
    delivery: 1.5,
    discount: 0.5,
    total: 5.75,
    payment: "الدفع عند التوصيل",
    status: "preparing",
    createdAt: "08:42",
    notes: "بدون بصل، وشطة على جنب.",
  },
  {
    id: "AK-1047",
    customer: "سلمى حداد",
    phone: "0791 222 333",
    type: "pickup",
    items: [
      { nameAr: "حمص باللحمة", qty: 1, price: 3.5 },
      { nameAr: "فلافل الكمال", qty: 1, price: 1.5 },
    ],
    subtotal: 5.0,
    delivery: 0,
    total: 5.0,
    payment: "الدفع عند الاستلام",
    status: "ready",
    createdAt: "08:31",
  },
  {
    id: "AK-1046",
    customer: "زيد طه",
    phone: "0796 444 555",
    type: "delivery",
    area: "الجبيهة",
    address: "دوار المنهل، بناية ٤، الطابق الأرضي",
    items: [
      { nameAr: "صينية فطور الكمال", qty: 1, price: 7.5 },
      { nameAr: "قلاية بندورة", qty: 1, price: 2.25 },
    ],
    subtotal: 9.75,
    delivery: 2.0,
    total: 11.75,
    payment: "الدفع عند التوصيل",
    status: "on_the_way",
    createdAt: "08:20",
  },
  {
    id: "AK-1045",
    customer: "رنا مرعي",
    phone: "0797 666 777",
    type: "delivery",
    area: "تلاع العلي",
    address: "شارع المدينة المنورة، بناية ٩٩",
    items: [
      { nameAr: "بيض وسجق", qty: 2, price: 2.75 },
      { nameAr: "فول", qty: 1, price: 1.75 },
    ],
    subtotal: 7.25,
    delivery: 1.5,
    total: 8.75,
    payment: "الدفع عند التوصيل",
    status: "delivered",
    createdAt: "07:58",
  },
  {
    id: "AK-1044",
    customer: "محمود كنعان",
    phone: "0799 888 999",
    type: "pickup",
    items: [{ nameAr: "سندويشة سجق وبيض", qty: 3, price: 2.5 }],
    subtotal: 7.5,
    delivery: 0,
    total: 7.5,
    payment: "الدفع عند الاستلام",
    status: "received",
    createdAt: "07:44",
  },
];

export const deliveryAreas: DeliveryArea[] = [
  { id: "a1", nameAr: "خلدا", nameEn: "Khalda", fee: 1.5, active: true },
  { id: "a2", nameAr: "تلاع العلي", nameEn: "Tla' Al Ali", fee: 1.5, active: true },
  { id: "a3", nameAr: "الجبيهة", nameEn: "Al Jubaiha", fee: 2.0, active: true },
  { id: "a4", nameAr: "الصويفية", nameEn: "Sweifieh", fee: 2.0, active: true },
  { id: "a5", nameAr: "عبدون", nameEn: "Abdoun", fee: 2.5, active: false },
];

/** DEMO revenue series for the admin chart. */
export const revenueSeries = [
  { dayAr: "السبت", dayEn: "Sat", value: 412 },
  { dayAr: "الأحد", dayEn: "Sun", value: 298 },
  { dayAr: "الاثنين", dayEn: "Mon", value: 331 },
  { dayAr: "الثلاثاء", dayEn: "Tue", value: 286 },
  { dayAr: "الأربعاء", dayEn: "Wed", value: 364 },
  { dayAr: "الخميس", dayEn: "Thu", value: 489 },
  { dayAr: "الجمعة", dayEn: "Fri", value: 561 },
];

export const statusFlow: Record<string, { ar: string; en: string }> = {
  received: { ar: "تم استلام الطلب", en: "Order received" },
  preparing: { ar: "قيد التحضير", en: "Preparing" },
  ready: { ar: "جاهز", en: "Ready" },
  on_the_way: { ar: "خرج للتوصيل", en: "On the way" },
  delivered: { ar: "تم التوصيل", en: "Delivered" },
  cancelled: { ar: "ملغي", en: "Cancelled" },
};
