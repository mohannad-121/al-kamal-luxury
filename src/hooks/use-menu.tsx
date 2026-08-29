import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { websiteMenuCategories, websiteMenuProducts } from "@/data/admin-menu";
import { getMenuItemImage } from "@/data/menu-item-images";
import { supabase } from "@/lib/supabase";
import type { IngredientDefinition, Product } from "@/types";

export type InventoryIngredient = IngredientDefinition & {
  availableQuantity: number;
  lowStockThreshold: number;
};

interface MenuContextValue {
  products: Product[];
  ingredients: InventoryIngredient[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  seedStarterMenu: () => Promise<void>;
  replaceWithWebsiteMenu: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  setProductAvailability: (id: string, available: boolean) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

type CategoryRow = { id: string; slug: string };
type IngredientRow = {
  id: string;
  name_ar: string;
  name_en: string;
  unit: IngredientDefinition["unit"];
  available_quantity: number;
  low_stock_threshold: number;
};
type RecipeRow = { ingredient_id: string; quantity_per_item: number };
type MenuRow = {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  price: number;
  discount: number | null;
  image_url: string;
  is_available: boolean;
  is_popular: boolean;
  is_featured: boolean;
  menu_categories: { slug: string } | { slug: string }[] | null;
  menu_item_ingredients: RecipeRow[] | null;
};

const starterProducts = websiteMenuProducts;

const MenuContext = createContext<MenuContextValue | null>(null);

function productFromRow(row: MenuRow): Product {
  const category = Array.isArray(row.menu_categories)
    ? row.menu_categories[0]
    : row.menu_categories;
  return {
    id: row.id,
    categoryId: category?.slug ?? "",
    nameAr: row.name_ar,
    nameEn: row.name_en,
    descAr: row.description_ar ?? row.name_ar,
    descEn: row.description_en ?? row.name_en,
    price: Number(row.price),
    discount: Number(row.discount ?? 0) || undefined,
    image: getMenuItemImage({
      categoryId: category?.slug ?? "",
      nameAr: row.name_ar,
      nameEn: row.name_en,
      image: row.image_url,
    }),
    available: row.is_available,
    popular: row.is_popular,
    featured: row.is_featured,
    recipe: (row.menu_item_ingredients ?? []).map((ingredient) => ({
      ingredientId: ingredient.ingredient_id,
      quantity: Number(ingredient.quantity_per_item),
    })),
  };
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [ingredients, setIngredients] = useState<InventoryIngredient[]>([]);
  const [categoryRows, setCategoryRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: categoryData, error: categoryError } = await supabase
      .from("menu_categories")
      .select("id, slug")
      .order("display_order");
    if (categoryError) {
      setError(categoryError.message);
      setLoading(false);
      return;
    }

    const { data: menuData, error: menuError } = await supabase
      .from("menu_items")
      .select(
        "id, name_ar, name_en, description_ar, description_en, price, discount, image_url, is_available, is_popular, is_featured, menu_categories!inner(slug), menu_item_ingredients(ingredient_id, quantity_per_item)",
      )
      .eq("is_archived", false)
      .order("created_at");
    if (menuError) {
      setError(menuError.message);
      setLoading(false);
      return;
    }

    const { data: ingredientData, error: ingredientError } = await supabase
      .from("ingredients")
      .select("id, name_ar, name_en, unit, available_quantity, low_stock_threshold")
      .order("name_en");

    setCategoryRows((categoryData ?? []) as CategoryRow[]);
    setProducts(((menuData ?? []) as MenuRow[]).map(productFromRow));
    if (!ingredientError) {
      setIngredients(
        ((ingredientData ?? []) as IngredientRow[]).map((ingredient) => ({
          id: ingredient.id,
          nameAr: ingredient.name_ar,
          nameEn: ingredient.name_en,
          unit: ingredient.unit,
          initialQuantity: Number(ingredient.available_quantity),
          availableQuantity: Number(ingredient.available_quantity),
          lowStockThreshold: Number(ingredient.low_stock_threshold),
        })),
      );
    } else {
      setIngredients([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });
    return () => listener.subscription.unsubscribe();
  }, [refresh]);

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const menuUpdates = supabase
      .channel("menu-item-availability")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "menu_items" },
        () => void refresh(),
      )
      .subscribe();
    const refreshTimer = window.setInterval(refreshWhenVisible, 15_000);

    window.addEventListener("focus", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.clearInterval(refreshTimer);
      window.removeEventListener("focus", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      void supabase.removeChannel(menuUpdates);
    };
  }, [refresh]);

  const saveRecipe = useCallback(async (menuItemId: string, product: Product) => {
    const { error: deleteError } = await supabase
      .from("menu_item_ingredients")
      .delete()
      .eq("menu_item_id", menuItemId);
    if (deleteError) throw new Error(deleteError.message);

    const recipe = product.recipe ?? [];
    if (!recipe.length) return;
    const { error: recipeError } = await supabase.from("menu_item_ingredients").insert(
      recipe.map((ingredient) => ({
        menu_item_id: menuItemId,
        ingredient_id: ingredient.ingredientId,
        quantity_per_item: ingredient.quantity,
      })),
    );
    if (recipeError) throw new Error(recipeError.message);
  }, []);

  const addProduct = useCallback(
    async (product: Product) => {
      const categoryId = categoryRows.find((category) => category.slug === product.categoryId)?.id;
      if (!categoryId) throw new Error("Choose a valid category before saving.");
      const { data, error: insertError } = await supabase
        .from("menu_items")
        .insert({
          category_id: categoryId,
          name_ar: product.nameAr,
          name_en: product.nameEn,
          description_ar: product.descAr,
          description_en: product.descEn,
          price: product.price,
          discount: product.discount ?? 0,
          image_url: product.image,
          is_available: product.available,
          is_popular: product.popular,
          is_featured: Boolean(product.featured),
        })
        .select("id")
        .single();
      if (insertError || !data)
        throw new Error(insertError?.message ?? "Unable to add the menu item.");
      await saveRecipe(data.id, product);
      await refresh();
    },
    [categoryRows, refresh, saveRecipe],
  );

  const updateProduct = useCallback(
    async (product: Product) => {
      const categoryId = categoryRows.find((category) => category.slug === product.categoryId)?.id;
      if (!categoryId) throw new Error("Choose a valid category before saving.");
      const { error: updateError } = await supabase
        .from("menu_items")
        .update({
          category_id: categoryId,
          name_ar: product.nameAr,
          name_en: product.nameEn,
          description_ar: product.descAr,
          description_en: product.descEn,
          price: product.price,
          discount: product.discount ?? 0,
          image_url: product.image,
          is_available: product.available,
          is_popular: product.popular,
          is_featured: Boolean(product.featured),
        })
        .eq("id", product.id);
      if (updateError) throw new Error(updateError.message);
      await saveRecipe(product.id, product);
      await refresh();
    },
    [categoryRows, refresh, saveRecipe],
  );

  const setProductAvailability = useCallback(
    async (id: string, available: boolean) => {
      const { data, error: updateError } = await supabase
        .from("menu_items")
        .update({ is_available: available })
        .eq("id", id)
        .select("id, is_available")
        .maybeSingle();
      if (updateError) throw new Error(updateError.message);
      if (!data) {
        throw new Error(
          "Availability was not saved. Your admin account needs permission to update this menu item.",
        );
      }
      if (data.is_available !== available) {
        throw new Error("Availability was not saved. Please try again.");
      }
      setProducts((current) =>
        current.map((product) => (product.id === id ? { ...product, available } : product)),
      );
      await refresh();
    },
    [refresh],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase
        .from("menu_items")
        .update({ is_archived: true, is_available: false })
        .eq("id", id);
      if (deleteError) throw new Error(deleteError.message);
      await refresh();
    },
    [refresh],
  );

  const replaceWithWebsiteMenu = useCallback(async () => {
    setError(null);

    const [currentItemsResult, categorySyncResult] = await Promise.all([
      supabase.from("menu_items").select("id").eq("is_archived", false),
      supabase
        .from("menu_categories")
        .upsert(
          websiteMenuCategories.map((category) => ({
            slug: category.id,
            name_ar: category.nameAr,
            name_en: category.nameEn,
            image_url: category.image,
            display_order: category.order,
            is_active: true,
          })),
          { onConflict: "slug" },
        )
        .select("id, slug"),
    ]);
    const { data: currentItems, error: currentItemsError } = currentItemsResult;
    if (currentItemsError) throw new Error(currentItemsError.message);
    const { data: syncedCategories, error: categorySyncError } = categorySyncResult;
    if (categorySyncError) throw new Error(categorySyncError.message);

    const categoryMap = new Map(
      (syncedCategories ?? []).map((category) => [category.slug, category.id]),
    );
    const missingCategory = websiteMenuCategories.find((category) => !categoryMap.has(category.id));
    if (missingCategory) {
      throw new Error(`Unable to sync the ${missingCategory.nameEn} category.`);
    }

    const { data: insertedProducts, error: productInsertError } = await supabase
      .from("menu_items")
      .insert(
        starterProducts.map((product) => ({
          category_id: categoryMap.get(product.categoryId),
          name_ar: product.nameAr,
          name_en: product.nameEn,
          description_ar: product.descAr,
          description_en: product.descEn,
          price: product.price,
          discount: product.discount ?? 0,
          image_url: product.image,
          is_available: product.available,
          is_popular: product.popular,
          is_featured: Boolean(product.featured),
        })),
      )
      .select("id");
    if (productInsertError) throw new Error(productInsertError.message);

    const oldItemIds = (currentItems ?? []).map((item) => item.id);
    if (oldItemIds.length) {
      const { error: archiveError } = await supabase
        .from("menu_items")
        .update({ is_archived: true, is_available: false })
        .in("id", oldItemIds);

      if (archiveError) {
        const insertedIds = (insertedProducts ?? []).map((item) => item.id);
        if (insertedIds.length) {
          await supabase
            .from("menu_items")
            .update({ is_archived: true, is_available: false })
            .in("id", insertedIds);
        }
        throw new Error(archiveError.message);
      }
    }

    await refresh();
  }, [refresh]);

  const seedStarterMenu = replaceWithWebsiteMenu;

  const value = useMemo(
    () => ({
      products,
      ingredients,
      loading,
      error,
      refresh,
      seedStarterMenu,
      replaceWithWebsiteMenu,
      addProduct,
      updateProduct,
      setProductAvailability,
      deleteProduct,
    }),
    [
      addProduct,
      deleteProduct,
      error,
      ingredients,
      loading,
      products,
      refresh,
      replaceWithWebsiteMenu,
      seedStarterMenu,
      updateProduct,
      setProductAvailability,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside MenuProvider");
  return context;
}
