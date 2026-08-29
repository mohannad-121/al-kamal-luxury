import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ImagePlus,
  Pencil,
  Plus,
  Power,
  RefreshCw,
  Search,
  SearchX,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { FoodImage } from "@/components/FoodImage";
import { AdminAccess } from "@/components/AdminAccess";
import { Price } from "@/components/Price";
import { websiteMenuProducts } from "@/data/admin-menu";
import { categories } from "@/data/categories";
import { images } from "@/data/menu";
import { useLang } from "@/hooks/use-lang";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useMenu } from "@/hooks/use-menu";
import type { Product, RecipeIngredient } from "@/types";

export const Route = createFileRoute("/admin")({ component: Admin });

type ProductForm = {
  categoryId: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: string;
  discount: string;
  image: string;
  available: boolean;
  popular: boolean;
  featured: boolean;
  recipe: RecipeIngredient[];
};

const activeCategories = categories.filter((category) => category.active);
const categoryById = new Map(categories.map((category) => [category.id, category]));

function includesMenuQuery(value: string, query: string) {
  return value.toLocaleLowerCase().includes(query);
}

type PortionSize = "small" | "medium" | "large";

const portionOptions = {
  hummus: [
    { id: "small", nameAr: "حمص صغير", nameEn: "Hummus Small", price: 0.5 },
    { id: "medium", nameAr: "حمص وسط", nameEn: "Hummus Medium", price: 0.65 },
    { id: "large", nameAr: "حمص كبير", nameEn: "Hummus Large", price: 0.8 },
  ],
  foul: [
    { id: "small", nameAr: "فول صغير", nameEn: "Foul Small", price: 0.6 },
    { id: "medium", nameAr: "فول وسط", nameEn: "Foul Medium", price: 0.75 },
    { id: "large", nameAr: "فول كبير", nameEn: "Foul Large", price: 0.9 },
  ],
} as const;

function emptyForm(): ProductForm {
  return {
    categoryId: activeCategories[0]?.id ?? "",
    nameAr: "",
    nameEn: "",
    descAr: "",
    descEn: "",
    price: "",
    discount: "",
    image: "",
    available: true,
    popular: false,
    featured: false,
    recipe: [],
  };
}

function productToForm(product: Product): ProductForm {
  return {
    categoryId: product.categoryId,
    nameAr: product.nameAr,
    nameEn: product.nameEn,
    descAr: product.descAr,
    descEn: product.descEn,
    price: String(product.price),
    discount: product.discount ? String(product.discount) : "",
    image: product.image,
    available: product.available,
    popular: product.popular,
    featured: Boolean(product.featured),
    recipe: product.recipe ?? [],
  };
}

function Admin() {
  const { L } = useLang();
  const {
    products,
    ingredients,
    addProduct,
    updateProduct,
    setProductAvailability,
    deleteProduct,
    seedStarterMenu,
    replaceWithWebsiteMenu,
    syncOffersAndFamilyMeals,
  } = useMenu();
  const { session, isAdmin, loading: authLoading } = useAdminAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [selectedPortion, setSelectedPortion] = useState<PortionSize | null>(null);
  const [error, setError] = useState("");
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCategory, setMenuCategory] = useState("sandwiches");
  const [syncingMenu, setSyncingMenu] = useState(false);
  const [syncingAddedSections, setSyncingAddedSections] = useState(false);
  const [availabilitySavingId, setAvailabilitySavingId] = useState<string | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const addedSectionsSyncAttempted = useRef(false);

  useEffect(() => {
    if (!isAdmin || addedSectionsSyncAttempted.current) return;
    addedSectionsSyncAttempted.current = true;
    setSyncingAddedSections(true);
    setError("");

    void syncOffersAndFamilyMeals()
      .then((addedCount) => {
        if (addedCount > 0) {
          setAvailabilityMessage(
            L(
              `تمت إضافة ${addedCount} أصناف للعروض والوجبات العائلية.`,
              `${addedCount} Offers and Family Meals records were added.`,
            ),
          );
        }
      })
      .catch((syncError) => {
        setError(
          syncError instanceof Error ? syncError.message : "Unable to add Offers and Family Meals.",
        );
      })
      .finally(() => setSyncingAddedSections(false));
  }, [L, isAdmin, syncOffersAndFamilyMeals]);

  const isEditing = editingId !== null;
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.nameEn.localeCompare(b.nameEn)),
    [products],
  );
  const visibleProducts = useMemo(() => {
    const query = menuSearch.trim().toLocaleLowerCase();

    return sortedProducts.filter((product) => {
      if (!query) return product.categoryId === menuCategory;
      const category = categoryById.get(product.categoryId);
      return includesMenuQuery(
        [
          product.nameAr,
          product.nameEn,
          product.descAr,
          product.descEn,
          category?.nameAr ?? product.categoryId,
          category?.nameEn ?? product.categoryId,
        ].join(" "),
        query,
      );
    });
  }, [menuCategory, menuSearch, sortedProducts]);
  const productCountByCategory = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of products) {
      counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
    }
    return counts;
  }, [products]);

  if (authLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink text-gold">
        {L("جارٍ تحميل الإدارة…", "Loading admin…")}
      </main>
    );
  }

  if (!session || !isAdmin) return <AdminAccess hasSession={Boolean(session)} isAdmin={isAdmin} />;

  if (pathname !== "/admin") return <Outlet />;

  const updateField = <K extends keyof ProductForm>(field: K, value: ProductForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const updateRecipe = (index: number, update: Partial<RecipeIngredient>) => {
    setForm((current) => ({
      ...current,
      recipe: current.recipe.map((ingredient, recipeIndex) =>
        recipeIndex === index ? { ...ingredient, ...update } : ingredient,
      ),
    }));
    setError("");
  };

  const addRecipeIngredient = () => {
    const firstIngredient = ingredients[0];
    if (!firstIngredient) return;
    setForm((current) => ({
      ...current,
      recipe: [...current.recipe, { ingredientId: firstIngredient.id, quantity: 0 }],
    }));
    setError("");
  };

  const removeRecipeIngredient = (index: number) => {
    setForm((current) => ({
      ...current,
      recipe: current.recipe.filter((_, recipeIndex) => recipeIndex !== index),
    }));
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setSelectedPortion(null);
    setError("");
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(productToForm(product));
    setSelectedPortion(
      product.nameEn.endsWith(" Small")
        ? "small"
        : product.nameEn.endsWith(" Medium")
          ? "medium"
          : product.nameEn.endsWith(" Large")
            ? "large"
            : null,
    );
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) {
      setError(L("حجم الصورة يجب أن يكون أقل من 2MB", "Image files must be smaller than 2 MB."));
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("image", String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const saveProduct = async () => {
    const price = Number(form.price);
    const discount = form.discount ? Number(form.discount) : undefined;
    if (
      !form.nameAr.trim() ||
      !form.nameEn.trim() ||
      !form.image.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      form.recipe.some(
        (ingredient) =>
          !ingredients.some((definition) => definition.id === ingredient.ingredientId) ||
          !Number.isFinite(ingredient.quantity) ||
          ingredient.quantity <= 0,
      )
    ) {
      setError(
        L(
          "أضف الاسم بالعربية والإنجليزية والصورة وسعراً صحيحاً قبل الحفظ.",
          "Add Arabic and English names, an image, a valid price, and a recipe before saving.",
        ),
      );
      return;
    }
    if (
      discount !== undefined &&
      (!Number.isFinite(discount) || discount < 0 || discount >= price)
    ) {
      setError(L("الخصم يجب أن يكون أقل من السعر.", "The discount must be lower than the price."));
      return;
    }

    const existing = products.find((product) => product.id === editingId);
    const product: Product = {
      id: existing?.id ?? `p-${Date.now()}`,
      categoryId: form.categoryId,
      nameAr: form.nameAr.trim(),
      nameEn: form.nameEn.trim(),
      descAr: form.descAr.trim() || form.nameAr.trim(),
      descEn: form.descEn.trim() || form.nameEn.trim(),
      price,
      ...(discount ? { discount } : {}),
      image: form.image.trim(),
      available: form.available,
      popular: form.popular,
      featured: form.featured,
      recipe: form.recipe,
      ...(existing?.extras ? { extras: existing.extras } : {}),
    };

    try {
      if (existing) await updateProduct(product);
      else await addProduct(product);
      startAdd();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save this menu item.");
    }
  };

  const removeProduct = async (product: Product) => {
    if (
      window.confirm(
        L(`حذف ${product.nameAr} من المنيو؟`, `Delete ${product.nameEn} from the menu?`),
      )
    ) {
      try {
        await deleteProduct(product.id);
        if (editingId === product.id) startAdd();
      } catch (deleteError) {
        setError(
          deleteError instanceof Error ? deleteError.message : "Unable to delete this menu item.",
        );
      }
    }
  };

  const toggleAvailability = async (product: Product) => {
    const nextAvailability = !product.available;
    setAvailabilitySavingId(product.id);
    setAvailabilityMessage("");
    setError("");
    try {
      await setProductAvailability(product.id, nextAvailability);
      setAvailabilityMessage(
        L(
          `${product.nameAr} أصبح ${nextAvailability ? "متوفراً" : "غير متوفر"}.`,
          `${product.nameEn} is now ${nextAvailability ? "available" : "not available"}.`,
        ),
      );
    } catch (availabilityError) {
      setError(
        availabilityError instanceof Error
          ? availabilityError.message
          : "Unable to update availability.",
      );
    } finally {
      setAvailabilitySavingId(null);
    }
  };

  const importStarterMenu = async () => {
    try {
      setError("");
      await seedStarterMenu();
    } catch (seedError) {
      setError(
        seedError instanceof Error ? seedError.message : "Unable to import the starter menu.",
      );
    }
  };

  const syncFullWebsiteMenu = async () => {
    const confirmed = window.confirm(
      L(
        `سيتم استبدال ${products.length} صنف حالي بـ ${websiteMenuProducts.length} صنف من منيو الموقع. هل تريد المتابعة؟`,
        `Replace the current ${products.length} records with all ${websiteMenuProducts.length} website menu records?`,
      ),
    );
    if (!confirmed) return;

    setSyncingMenu(true);
    setError("");
    try {
      await replaceWithWebsiteMenu();
      setMenuSearch("");
      setMenuCategory("boxes");
      startAdd();
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Unable to sync the website menu.");
    } finally {
      setSyncingMenu(false);
    }
  };

  const syncAddedSections = async () => {
    setSyncingAddedSections(true);
    setAvailabilityMessage("");
    setError("");
    try {
      const addedCount = await syncOffersAndFamilyMeals();
      setAvailabilityMessage(
        addedCount > 0
          ? L(
              `تمت إضافة ${addedCount} أصناف للعروض والوجبات العائلية.`,
              `${addedCount} Offers and Family Meals records were added.`,
            )
          : L(
              "العروض والوجبات العائلية موجودة بالفعل في صفحة الإدارة.",
              "Offers and Family Meals are already in the admin page.",
            ),
      );
    } catch (syncError) {
      setError(
        syncError instanceof Error ? syncError.message : "Unable to add Offers and Family Meals.",
      );
    } finally {
      setSyncingAddedSections(false);
    }
  };

  const selectCategory = (categoryId: string) => {
    updateField("categoryId", categoryId);
    setSelectedPortion(null);
  };

  const selectPortion = (size: PortionSize) => {
    const options = form.categoryId === "hummus" ? portionOptions.hummus : portionOptions.foul;
    const portion = options.find((option) => option.id === size);
    if (!portion) return;

    const isHummus = form.categoryId === "hummus";
    setForm((current) => ({
      ...current,
      nameAr: portion.nameAr,
      nameEn: portion.nameEn,
      descAr: isHummus
        ? "حمص ناعم مع زيت زيتون أردني وطحينة."
        : "فول مدمس على النار من الليل، ليمون وكمون وزيت زيتون.",
      descEn: isHummus
        ? "Silky, with Jordanian olive oil and washed tahini."
        : "Slow-simmered fava beans, lemon, cumin, olive oil.",
      price: String(portion.price),
      image: isHummus ? images.hummusMeat : images.foul,
      recipe: [],
    }));
    setSelectedPortion(size);
    setError("");
  };

  return (
    <main className="min-h-screen bg-ink pb-10 text-bone">
      <header className="border-b border-gold/20 bg-charcoal/70 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold/45 text-gold">
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-lg">
                {L("إدارة المنيو", "Menu manager")}
              </span>
              <span className="text-[.62rem] tracking-[.2em] text-gold">
                {L("الكمال", "AL KAMAL")}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/admin/daily-sales" className="text-gold hover:text-gold-soft">
              {L("الأداء اليومي", "Daily performance")}
            </Link>
            <Link to="/" className="text-bone/70 hover:text-gold">
              <span className="inline-flex items-center gap-1">
                <ArrowRight className="h-4 w-4" />
                {L("الموقع", "View site")}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{L("إدارة الأصناف", "MENU MANAGEMENT")}</p>
            <h1 className="mt-2 text-3xl text-bone sm:text-4xl">
              {L("أصناف المنيو", "Menu items")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {L(
                "ابحث حسب التصنيف، ثم عدّل أو احذف الصنف المطلوب.",
                "Choose a category, then quickly find, edit, or remove an item.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void syncAddedSections()}
              disabled={syncingAddedSections}
              className="inline-flex min-h-11 items-center gap-2 border border-emerald-300/35 px-4 py-2 text-sm text-emerald-200 transition-colors hover:bg-emerald-300/10 disabled:cursor-wait disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${syncingAddedSections ? "animate-spin" : ""}`} />
              {syncingAddedSections
                ? L("جارٍ إضافة الأقسام...", "Adding sections...")
                : L("إضافة العروض والوجبات العائلية", "Add Offers & Family Meals")}
            </button>
            <button
              type="button"
              onClick={() => void syncFullWebsiteMenu()}
              disabled={syncingMenu}
              className="inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink disabled:cursor-wait disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${syncingMenu ? "animate-spin" : ""}`} />
              {syncingMenu
                ? L("جارٍ نقل كل المنيو...", "Syncing full menu...")
                : L(
                    `استبدال القائمة بكل المنيو (${websiteMenuProducts.length})`,
                    `Replace with full menu (${websiteMenuProducts.length})`,
                  )}
            </button>
            <button
              type="button"
              onClick={startAdd}
              className="inline-flex min-h-11 items-center gap-2 bg-gold px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
            >
              <Plus className="h-4 w-4" />
              {L("إضافة صنف", "Add item")}
            </button>
          </div>
        </div>

        {error || availabilityMessage ? (
          <div className="mt-5" aria-live="polite">
            {error ? (
              <p className="border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}
            {availabilityMessage ? (
              <p className="border border-emerald-300/30 bg-emerald-300/10 p-3 text-sm text-emerald-100">
                {availabilityMessage}
              </p>
            ) : null}
          </div>
        ) : null}

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="order-2 xl:order-1">
            <div className="border border-gold/20 bg-charcoal/35">
              <div className="border-b border-gold/15 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">
                      {menuSearch
                        ? L("نتائج البحث", "SEARCH RESULTS")
                        : L(
                            categoryById.get(menuCategory)?.nameAr ?? "الأصناف",
                            categoryById.get(menuCategory)?.nameEn ?? "ITEMS",
                          )}
                    </p>
                    <h2 className="mt-1 text-2xl text-bone">
                      {visibleProducts.length}
                      <span className="ms-2 text-sm font-normal text-bone/45">
                        {L(`من ${products.length}`, `of ${products.length}`)}
                      </span>
                    </h2>
                  </div>
                  <label className="flex min-h-11 w-full items-center gap-2 border border-gold/20 bg-ink/45 px-3 text-bone/70 focus-within:border-gold sm:w-72">
                    <Search className="h-4 w-4 shrink-0 text-gold" />
                    <input
                      value={menuSearch}
                      onChange={(event) => setMenuSearch(event.target.value)}
                      className="min-w-0 flex-1 bg-transparent py-2 text-sm text-bone outline-none placeholder:text-bone/40"
                      placeholder={L("ابحث عن صنف...", "Search menu items...")}
                      aria-label={L("البحث في الأصناف", "Search menu items")}
                    />
                    {menuSearch ? (
                      <button
                        type="button"
                        onClick={() => setMenuSearch("")}
                        className="grid h-8 w-8 place-items-center text-bone/55 hover:text-gold"
                        aria-label={L("مسح البحث", "Clear search")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </label>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-2 border-b border-gold/15 p-3 sm:grid-cols-4 2xl:grid-cols-8"
                role="toolbar"
                aria-label={L("تصفية الأصناف حسب التصنيف", "Filter items by category")}
              >
                {activeCategories.map((category) => {
                  const count = productCountByCategory.get(category.id) ?? 0;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={!menuSearch && menuCategory === category.id}
                      onClick={() => {
                        setMenuCategory(category.id);
                        setMenuSearch("");
                      }}
                      className={`min-h-12 border px-2 py-2 text-xs transition-colors ${
                        !menuSearch && menuCategory === category.id
                          ? "border-gold bg-gold text-ink"
                          : "border-gold/20 text-bone/70 hover:border-gold hover:text-gold"
                      }`}
                    >
                      <span className="block">{L(category.nameAr, category.nameEn)}</span>
                      <span className="mt-0.5 block opacity-65">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-px bg-gold/10 p-px md:grid-cols-2">
                {visibleProducts.map((product) => {
                  const category = categoryById.get(product.categoryId);
                  return (
                    <article
                      key={product.id}
                      className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 bg-charcoal p-3 sm:p-4"
                    >
                      <FoodImage
                        src={product.image}
                        alt={L(product.nameAr, product.nameEn)}
                        className="h-[4.5rem] w-[4.5rem]"
                        zoom={false}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base leading-6 text-bone">
                            {L(product.nameAr, product.nameEn)}
                          </h3>
                          <span className="border border-gold/20 px-2 py-0.5 text-[0.65rem] text-gold">
                            {category ? L(category.nameAr, category.nameEn) : product.categoryId}
                          </span>
                          {!product.available ? (
                            <span className="text-[0.65rem] text-bone/50">
                              {L("غير متوفر", "Unavailable")}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {L(product.descAr, product.descEn)}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <p className="text-sm text-gold">
                            {product.price > 0 ? (
                              <Price value={product.price - (product.discount ?? 0)} />
                            ) : (
                              <span className="text-xs text-amber-200">
                                {L("السعر غير محدد", "Price not set")}
                              </span>
                            )}
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => void toggleAvailability(product)}
                              disabled={availabilitySavingId === product.id}
                              className={`inline-flex h-9 items-center gap-1.5 border px-2 text-[0.65rem] font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${product.available ? "border-emerald-300/40 text-emerald-200 hover:border-emerald-300 hover:bg-emerald-300/10" : "border-bone/25 text-bone/70 hover:border-gold hover:text-gold"}`}
                              aria-label={L(
                                `تعيين ${product.nameAr} ${product.available ? "غير متوفر" : "متوفر"}`,
                                `Mark ${product.nameEn} as ${product.available ? "not available" : "available"}`,
                              )}
                            >
                              <Power className="h-3.5 w-3.5" />
                              {availabilitySavingId === product.id
                                ? L("جارٍ الحفظ...", "Saving...")
                                : product.available
                                  ? L("متوفر", "Available")
                                  : L("غير متوفر", "Not available")}
                            </button>
                            <button
                              type="button"
                              onClick={() => startEdit(product)}
                              className="grid h-9 w-9 place-items-center border border-gold/25 text-gold hover:border-gold"
                              aria-label={L(`تعديل ${product.nameAr}`, `Edit ${product.nameEn}`)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void removeProduct(product)}
                              className="grid h-9 w-9 place-items-center border border-red-300/25 text-red-200 hover:border-red-300"
                              aria-label={L(`حذف ${product.nameAr}`, `Delete ${product.nameEn}`)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              {!visibleProducts.length ? (
                <div className="p-12 text-center text-muted-foreground">
                  <SearchX className="mx-auto mb-3 h-7 w-7 text-gold" />
                  {L(
                    menuSearch ? "لا توجد نتائج مطابقة." : "لا توجد أصناف في هذا التصنيف.",
                    menuSearch ? "No matching items." : "There are no items in this category.",
                  )}
                  {!products.length ? (
                    <button
                      type="button"
                      onClick={() => void importStarterMenu()}
                      className="mx-auto mt-5 inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 text-sm text-gold hover:bg-gold hover:text-ink"
                    >
                      <Plus className="h-4 w-4" />
                      {L("استيراد كل منيو الموقع", "Import the full website menu")}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <aside className="order-1 h-fit border border-gold/25 bg-charcoal/60 xl:sticky xl:top-6">
            <div className="flex items-start justify-between border-b border-gold/15 p-5">
              <div>
                <p className="eyebrow">
                  {isEditing ? L("تعديل صنف", "EDIT ITEM") : L("صنف جديد", "NEW ITEM")}
                </p>
                <h2 className="mt-1 text-2xl text-bone">
                  {isEditing
                    ? L("تعديل المعلومات", "Edit details")
                    : L("إضافة للمنيو", "Add to menu")}
                </h2>
              </div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={startAdd}
                  className="grid h-10 w-10 place-items-center border border-gold/25 text-bone/70 hover:border-gold hover:text-gold"
                  aria-label={L("إلغاء التعديل", "Cancel editing")}
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <div className="space-y-4 p-5">
              <FormLabel label={L("التصنيف", "Category")}>
                <select
                  value={form.categoryId}
                  onChange={(event) => selectCategory(event.target.value)}
                  className="form-control"
                >
                  {activeCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {L(category.nameAr, category.nameEn)}
                    </option>
                  ))}
                </select>
              </FormLabel>
              {form.categoryId === "hummus" || form.categoryId === "foul" ? (
                <div className="border border-gold/25 bg-ink/40 p-3">
                  <p className="mb-2 text-xs font-medium text-gold">
                    {L("اختر الحجم", "Choose size")}
                  </p>
                  <div
                    className="grid grid-cols-3 gap-2"
                    role="tablist"
                    aria-label={L("الحجم", "Size")}
                  >
                    {(form.categoryId === "hummus"
                      ? portionOptions.hummus
                      : portionOptions.foul
                    ).map((portion) => (
                      <button
                        key={portion.id}
                        type="button"
                        role="tab"
                        aria-selected={selectedPortion === portion.id}
                        onClick={() => selectPortion(portion.id)}
                        className={`min-h-11 border px-2 text-sm transition-colors ${
                          selectedPortion === portion.id
                            ? "border-gold bg-gold text-ink"
                            : "border-gold/25 text-bone hover:border-gold hover:text-gold"
                        }`}
                      >
                        {L(
                          portion.id === "small"
                            ? "صغير"
                            : portion.id === "medium"
                              ? "وسط"
                              : "كبير",
                          portion.id === "small"
                            ? "Small"
                            : portion.id === "medium"
                              ? "Medium"
                              : "Large",
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <FormLabel label={L("الاسم بالعربية", "Arabic name")}>
                  <input
                    value={form.nameAr}
                    onChange={(event) => updateField("nameAr", event.target.value)}
                    className="form-control"
                    required
                  />
                </FormLabel>
                <FormLabel label={L("الاسم بالإنجليزية", "English name")}>
                  <input
                    value={form.nameEn}
                    onChange={(event) => updateField("nameEn", event.target.value)}
                    className="form-control"
                    required
                  />
                </FormLabel>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <FormLabel label={L("الوصف بالعربية", "Arabic description")}>
                  <textarea
                    value={form.descAr}
                    onChange={(event) => updateField("descAr", event.target.value)}
                    className="form-control min-h-20 resize-y"
                  />
                </FormLabel>
                <FormLabel label={L("الوصف بالإنجليزية", "English description")}>
                  <textarea
                    value={form.descEn}
                    onChange={(event) => updateField("descEn", event.target.value)}
                    className="form-control min-h-20 resize-y"
                  />
                </FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormLabel label={L("السعر", "Price")}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => updateField("price", event.target.value)}
                    className="form-control"
                    required
                  />
                </FormLabel>
                <FormLabel label={L("الخصم (اختياري)", "Discount (optional)")}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.discount}
                    onChange={(event) => updateField("discount", event.target.value)}
                    className="form-control"
                  />
                </FormLabel>
              </div>
              <div className="border border-gold/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-wide text-gold/90">
                      {L("وصفة الصنف", "Recipe per item")}
                    </p>
                    <p className="mt-1 text-xs text-bone/50">
                      {L(
                        "تُخصم الكميات تلقائياً عند تسجيل البيع اليومي.",
                        "Amounts are deducted automatically when a sale is recorded.",
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addRecipeIngredient}
                    className="inline-flex h-9 items-center gap-1 border border-gold/30 px-2 text-xs text-gold hover:border-gold"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {L("مكوّن", "Ingredient")}
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {form.recipe.map((ingredient, index) => {
                    const definition = ingredients.find(
                      (item) => item.id === ingredient.ingredientId,
                    );
                    return (
                      <div
                        key={`${ingredient.ingredientId}-${index}`}
                        className="grid grid-cols-[minmax(0,1fr)_5rem_auto_auto] items-center gap-2"
                      >
                        <select
                          value={ingredient.ingredientId}
                          onChange={(event) =>
                            updateRecipe(index, { ingredientId: event.target.value })
                          }
                          className="form-control min-w-0"
                        >
                          {ingredients.map((item) => (
                            <option key={item.id} value={item.id}>
                              {L(item.nameAr, item.nameEn)}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={ingredient.quantity || ""}
                          onChange={(event) =>
                            updateRecipe(index, { quantity: Number(event.target.value) })
                          }
                          className="form-control min-w-0"
                          aria-label={L("الكمية", "Quantity")}
                        />
                        <span className="text-xs text-bone/50">{definition?.unit ?? ""}</span>
                        <button
                          type="button"
                          onClick={() => removeRecipeIngredient(index)}
                          className="grid h-9 w-9 place-items-center border border-red-300/25 text-red-200 hover:border-red-300"
                          aria-label={L("حذف المكوّن", "Remove ingredient")}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                  {!form.recipe.length ? (
                    <p className="text-xs text-amber-200">
                      {L(
                        "لا توجد وصفة بعد؛ تسجيل المبيعات لن يخصم من المخزون لهذا الصنف.",
                        "No recipe yet — sales for this item will not deduct inventory.",
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
              <FormLabel label={L("رابط الصورة", "Image URL")}>
                <input
                  type="url"
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(event) => updateField("image", event.target.value)}
                  placeholder="https://..."
                  className="form-control"
                />
              </FormLabel>
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-gold/30 px-4 py-3 text-sm text-bone/75 transition-colors hover:border-gold">
                <ImagePlus className="h-5 w-5 text-gold" />
                <span>{L("أو ارفع صورة من جهازك", "Or upload an image from your device")}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="sr-only"
                />
              </label>
              {form.image ? (
                <div className="overflow-hidden border border-gold/20">
                  <FoodImage
                    src={form.image}
                    alt={L(form.nameAr || "معاينة", form.nameEn || "Preview")}
                    className="aspect-[16/8] w-full"
                    zoom={false}
                  />
                </div>
              ) : null}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <Toggle
                  label={L("متوفر", "Available")}
                  checked={form.available}
                  onChange={(value) => updateField("available", value)}
                />
                <Toggle
                  label={L("الأكثر طلباً", "Popular")}
                  checked={form.popular}
                  onChange={(value) => updateField("popular", value)}
                />
                <Toggle
                  label={L("مميز", "Featured")}
                  checked={form.featured}
                  onChange={(value) => updateField("featured", value)}
                />
              </div>
              {error ? (
                <p className="border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
                  {error}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => void saveProduct()}
                className="flex min-h-12 w-full items-center justify-center gap-2 bg-gold px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
              >
                <UtensilsCrossed className="h-4 w-4" />
                {isEditing ? L("حفظ التعديلات", "Save changes") : L("إضافة للمنيو", "Add to menu")}
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function FormLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs text-bone/75">
      <span className="mb-2 block tracking-wide text-gold/90">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 border border-gold/15 px-2 py-2 text-bone/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-[var(--gold)]"
      />
      <span>{label}</span>
    </label>
  );
}
