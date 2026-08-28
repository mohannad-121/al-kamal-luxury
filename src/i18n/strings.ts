import type { Lang } from "@/types";

export const strings = {
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    menu: { ar: "المنيو", en: "Menu" },
    popular: { ar: "الأكثر طلبًا", en: "Popular" },
    story: { ar: "قصتنا", en: "Our Story" },
    location: { ar: "موقعنا", en: "Find Us" },
    track: { ar: "تتبع الطلب", en: "Track Order" },
    order: { ar: "اطلب الآن", en: "Order Now" },
    cart: { ar: "السلة", en: "Cart" },
  },
  hero: {
    eyebrow: { ar: "مطعم الكمال", en: "AL KAMAL RESTAURANT" },
    title: { ar: "فطور شعبي على أصوله", en: "Jordanian breakfast, the traditional way" },
    sub: {
      ar: "حمص وفول وفلافل وساندويشات، طازة كل يوم.",
      en: "Hummus, foul, falafel and sandwiches, made fresh daily.",
    },
    cta1: { ar: "اطلب الآن", en: "Order now" },
    cta2: { ar: "شوف المنيو", en: "View the menu" },
    scroll: { ar: "انزل", en: "Scroll" },
  },
  common: {
    add: { ar: "أضف للطلب", en: "Add to order" },
    addShort: { ar: "أضف", en: "Add" },
    soldOut: { ar: "غير متوفر حاليًا", en: "Unavailable" },
    available: { ar: "متوفر", en: "Available" },
    qty: { ar: "الكمية", en: "Quantity" },
    extras: { ar: "إضافات", en: "Extras" },
    note: { ar: "ملاحظات", en: "Notes" },
    notePlaceholder: { ar: "مثلاً: بدون بصل، شطة على جنب", en: "e.g. no onion, chili on the side" },
    subtotal: { ar: "المجموع", en: "Subtotal" },
    delivery: { ar: "التوصيل", en: "Delivery" },
    discount: { ar: "خصم", en: "Discount" },
    total: { ar: "الإجمالي", en: "Total" },
    checkout: { ar: "إتمام الطلب", en: "Checkout" },
    browseMenu: { ar: "تصفح المنيو", en: "Browse the menu" },
    search: { ar: "شو عبالك اليوم؟", en: "What are you craving?" },
    all: { ar: "الكل", en: "All" },
    added: { ar: "انضاف لطلبك", en: "Added to your order" },
    emptyTitle: { ar: "السلة فاضية", en: "Your cart is empty" },
    emptyBody: {
      ar: "اختار اللي بدك إياه من المنيو.",
      en: "Choose what you want from the menu.",
    },
    demo: { ar: "أسعار وبيانات تجريبية", en: "Demo prices & data" },
  },
} as const;

type Dict = Record<string, { ar: string; en: string }>;

export const t = (dict: Dict, key: string, lang: Lang): string => {
  const entry = dict[key];
  return entry ? entry[lang] : key;
};

export const pick = (lang: Lang, ar: string, en: string) => (lang === "ar" ? ar : en);
