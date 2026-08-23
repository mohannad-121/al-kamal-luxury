import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ImagePlus, Pencil, Plus, Trash2, UtensilsCrossed, X } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";
import { Price } from "@/components/Price";
import { categories } from "@/data/categories";
import { ingredientDefinitions } from "@/data/inventory";
import { useLang } from "@/hooks/use-lang";
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
  const { products, addProduct, updateProduct, deleteProduct } = useMenu();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [error, setError] = useState("");

  const isEditing = editingId !== null;
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.nameEn.localeCompare(b.nameEn)),
    [products],
  );

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
    const firstIngredient = ingredientDefinitions[0];
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
    setError("");
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(productToForm(product));
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

  const saveProduct = () => {
    const price = Number(form.price);
    const discount = form.discount ? Number(form.discount) : undefined;
    if (
      !form.nameAr.trim() ||
      !form.nameEn.trim() ||
      !form.image.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !form.recipe.length ||
      form.recipe.some(
        (ingredient) =>
          !ingredientDefinitions.some((definition) => definition.id === ingredient.ingredientId) ||
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

    if (existing) updateProduct(product);
    else addProduct(product);
    startAdd();
  };

  const removeProduct = (product: Product) => {
    if (
      window.confirm(
        L(`حذف ${product.nameAr} من المنيو؟`, `Delete ${product.nameEn} from the menu?`),
      )
    ) {
      deleteProduct(product.id);
      if (editingId === product.id) startAdd();
    }
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
              <span className="text-[.62rem] tracking-[.2em] text-gold">AL KAMAL</span>
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
                "أضف أو عدّل أو احذف أي صنف. التغييرات تظهر فوراً في المنيو.",
                "Add, edit, or delete any item. Changes appear in the menu immediately.",
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex min-h-11 items-center gap-2 bg-gold px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
          >
            <Plus className="h-4 w-4" />
            {L("إضافة صنف", "Add item")}
          </button>
        </div>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="order-2 xl:order-1">
            <div className="border border-gold/20 bg-charcoal/35">
              <div className="flex items-center justify-between border-b border-gold/15 p-5">
                <div>
                  <p className="eyebrow">{L("كل الأصناف", "ALL ITEMS")}</p>
                  <h2 className="mt-1 text-2xl text-bone">{products.length}</h2>
                </div>
              </div>
              <div className="divide-y divide-gold/10">
                {sortedProducts.map((product) => {
                  const category = categories.find((item) => item.id === product.categoryId);
                  return (
                    <article
                      key={product.id}
                      className="grid gap-4 p-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:p-5"
                    >
                      <FoodImage
                        src={product.image}
                        alt={L(product.nameAr, product.nameEn)}
                        className="h-24 w-full sm:h-20 sm:w-20"
                        zoom={false}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-xl text-bone">
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
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {L(product.descAr, product.descEn)}
                        </p>
                        <p className="mt-2 text-gold">
                          <Price value={product.price - (product.discount ?? 0)} />
                        </p>
                      </div>
                      <div className="flex gap-2 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => startEdit(product)}
                          className="grid h-11 w-11 place-items-center border border-gold/25 text-gold hover:border-gold"
                          aria-label={L(`تعديل ${product.nameAr}`, `Edit ${product.nameEn}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(product)}
                          className="grid h-11 w-11 place-items-center border border-red-300/25 text-red-200 hover:border-red-300"
                          aria-label={L(`حذف ${product.nameAr}`, `Delete ${product.nameEn}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {!products.length ? (
                <div className="p-12 text-center text-muted-foreground">
                  {L(
                    "لا توجد أصناف بعد. أضف أول صنف من النموذج.",
                    "There are no items yet. Add your first item using the form.",
                  )}
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
                  onChange={(event) => updateField("categoryId", event.target.value)}
                  className="form-control"
                >
                  {activeCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {L(category.nameAr, category.nameEn)}
                    </option>
                  ))}
                </select>
              </FormLabel>
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
                    const definition = ingredientDefinitions.find(
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
                          {ingredientDefinitions.map((item) => (
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
                        "أضف مكوّناً واحداً على الأقل قبل الحفظ.",
                        "Add at least one ingredient before saving.",
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
                onClick={saveProduct}
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
