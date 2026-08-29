import { publicMenuSections } from "@/data/public-menu";
import type { Category, Product } from "@/types";

/**
 * Admin and Supabase representation of the customer-facing menu.
 * Each priced option becomes one editable menu record because menu_items stores
 * one price per row rather than nested options.
 */
export const websiteMenuCategories: Category[] = publicMenuSections.map((section, index) => ({
  id: section.id,
  nameAr: section.nameAr,
  nameEn: section.nameEn,
  image: section.image,
  active: true,
  order: index + 1,
}));

export const websiteMenuProducts: Product[] = publicMenuSections.flatMap((section) =>
  section.items.flatMap((item) =>
    item.options.map((option) => ({
      id: option.id,
      categoryId: section.id,
      nameAr: `${item.nameAr} — ${option.nameAr}`,
      nameEn: `${item.nameEn} — ${option.nameEn}`,
      descAr:
        option.price === undefined
          ? `${section.nameAr} · السعر غير محدد`
          : `${section.nameAr} · ${option.nameAr}`,
      descEn:
        option.price === undefined
          ? `${section.nameEn} · Price not set`
          : `${section.nameEn} · ${option.nameEn}`,
      price: option.price ?? 0,
      image: section.image,
      available: true,
      popular: Boolean(item.featured),
      featured: Boolean(item.featured),
      recipe: [],
    })),
  ),
);
