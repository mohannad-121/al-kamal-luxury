import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultRecipes, ingredientDefinitions } from "@/data/inventory";
import { hiddenProductIds, products as defaultProducts } from "@/data/menu";
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
  syncHummusAndFoulSizes: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
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

const starterProducts = defaultProducts
  .filter((product) => !hiddenProductIds.has(product.id))
  .map((product) => ({ ...product, recipe: defaultRecipes[product.id] ?? [] }));

const portionSizeProductIds = new Set([
  "p-hummus",
  "p-hummus-medium",
  "p-hummus-large",
  "p-foul",
  "p-foul-medium",
  "p-foul-large",
]);

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
    image: row.image_url,
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

  const seedStarterMenu = useCallback(async () => {
    const { count, error: countError } = await supabase
      .from("menu_items")
      .select("id", { count: "exact", head: true });
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) {
      await refresh();
      return;
    }

    const { error: ingredientInsertError } = await supabase.from("ingredients").insert(
      ingredientDefinitions.map((ingredient) => ({
        name_ar: ingredient.nameAr,
        name_en: ingredient.nameEn,
        unit: ingredient.unit,
        available_quantity: ingredient.initialQuantity,
        low_stock_threshold: ingredient.lowStockThreshold,
      })),
    );
    if (ingredientInsertError) throw new Error(ingredientInsertError.message);

    const { data: freshCategories, error: freshCategoryError } = await supabase
      .from("menu_categories")
      .select("id, slug");
    if (freshCategoryError) throw new Error(freshCategoryError.message);
    const categoryMap = new Map(
      (freshCategories ?? []).map((category) => [category.slug, category.id]),
    );

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
      .select("id, name_en");
    if (productInsertError) throw new Error(productInsertError.message);

    const { data: freshIngredients, error: freshIngredientError } = await supabase
      .from("ingredients")
      .select("id, name_en");
    if (freshIngredientError) throw new Error(freshIngredientError.message);
    const ingredientMap = new Map(
      (freshIngredients ?? []).map((ingredient) => [
        ingredientDefinitions.find((definition) => definition.nameEn === ingredient.name_en)?.id,
        ingredient.id,
      ]),
    );
    const productMap = new Map(
      (insertedProducts ?? []).map((product) => [product.name_en, product.id]),
    );
    const recipes = starterProducts.flatMap((product) =>
      (product.recipe ?? []).map((ingredient) => ({
        menu_item_id: productMap.get(product.nameEn),
        ingredient_id: ingredientMap.get(ingredient.ingredientId),
        quantity_per_item: ingredient.quantity,
      })),
    );
    const { error: recipeInsertError } = await supabase
      .from("menu_item_ingredients")
      .insert(recipes);
    if (recipeInsertError) throw new Error(recipeInsertError.message);
    await refresh();
  }, [refresh]);

  const syncHummusAndFoulSizes = useCallback(async () => {
    const sizeProducts = starterProducts.filter((product) => portionSizeProductIds.has(product.id));

    for (const product of sizeProducts) {
      const categoryId = categoryRows.find((category) => category.slug === product.categoryId)?.id;
      if (!categoryId) throw new Error("The Hummus or Foul category could not be found.");

      const legacyName =
        product.id === "p-hummus" ? "Hummus" : product.id === "p-foul" ? "Foul" : null;
      let itemId: string | null = null;
      const matchingNames = legacyName ? [product.nameEn, legacyName] : [product.nameEn];
      const { data: existingItems, error: findError } = await supabase
        .from("menu_items")
        .select("id, name_en")
        .eq("category_id", categoryId)
        .eq("is_archived", false)
        .in("name_en", matchingNames)
        .limit(1);
      if (findError) throw new Error(findError.message);

      const values = {
        category_id: categoryId,
        name_ar: product.nameAr,
        name_en: product.nameEn,
        description_ar: product.descAr,
        description_en: product.descEn,
        price: product.price,
        discount: 0,
        image_url: product.image,
        is_available: product.available,
        is_popular: product.popular,
        is_featured: Boolean(product.featured),
      };

      if (existingItems?.[0]) {
        itemId = existingItems[0].id;
        const { error: updateError } = await supabase
          .from("menu_items")
          .update(values)
          .eq("id", itemId);
        if (updateError) throw new Error(updateError.message);
      } else {
        const { data, error: insertError } = await supabase
          .from("menu_items")
          .insert(values)
          .select("id")
          .single();
        if (insertError || !data) {
          throw new Error(insertError?.message ?? "Unable to add the portion size.");
        }
        itemId = data.id;
      }

      const { error: recipeError } = await supabase
        .from("menu_item_ingredients")
        .delete()
        .eq("menu_item_id", itemId);
      if (recipeError) throw new Error(recipeError.message);
    }

    await refresh();
  }, [categoryRows, refresh]);

  const value = useMemo(
    () => ({
      products,
      ingredients,
      loading,
      error,
      refresh,
      seedStarterMenu,
      syncHummusAndFoulSizes,
      addProduct,
      updateProduct,
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
      seedStarterMenu,
      syncHummusAndFoulSizes,
      updateProduct,
    ],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside MenuProvider");
  return context;
}
