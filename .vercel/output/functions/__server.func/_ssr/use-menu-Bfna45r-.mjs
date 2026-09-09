import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as supabase, i as publicMenuSections, t as getMenuItemImage } from "./supabase-BvpBKmRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-menu-Bfna45r-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ingredientDefinitions = [
	{
		id: "falafel",
		nameAr: "فلافل",
		nameEn: "Falafel",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1800
	},
	{
		id: "hummus",
		nameAr: "حمص",
		nameEn: "Hummus",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1500
	},
	{
		id: "foul",
		nameAr: "فول",
		nameEn: "Foul",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1500
	},
	{
		id: "chickpeas",
		nameAr: "حمص حب",
		nameEn: "Chickpeas",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1200
	},
	{
		id: "tahini",
		nameAr: "طحينة",
		nameEn: "Tahini",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 700
	},
	{
		id: "normal-bread",
		nameAr: "خبز عادي",
		nameEn: "Normal Bread",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 25
	},
	{
		id: "kaak-bread",
		nameAr: "كعك",
		nameEn: "Ka'ak Bread",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 10
	},
	{
		id: "tortilla-bread",
		nameAr: "خبز شراك",
		nameEn: "Tortilla Bread",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 10
	},
	{
		id: "shrak-bread",
		nameAr: "خبز شراك بلدي",
		nameEn: "Shrak Bread",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 10
	},
	{
		id: "small-french-bread",
		nameAr: "خبز فرنسي صغير",
		nameEn: "Small French Bread",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 10
	},
	{
		id: "vegetables",
		nameAr: "خضار",
		nameEn: "Vegetables",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1200
	},
	{
		id: "oil",
		nameAr: "زيت",
		nameEn: "Oil",
		unit: "ml",
		initialQuantity: 0,
		lowStockThreshold: 800
	},
	{
		id: "eggs",
		nameAr: "بيض",
		nameEn: "Eggs",
		unit: "piece",
		initialQuantity: 0,
		lowStockThreshold: 24
	},
	{
		id: "sujuk",
		nameAr: "سجق",
		nameEn: "Sujuk",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 900
	},
	{
		id: "tomatoes",
		nameAr: "بندورة",
		nameEn: "Tomatoes",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1500
	},
	{
		id: "potatoes",
		nameAr: "بطاطا",
		nameEn: "Potatoes",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 1500
	},
	{
		id: "meat",
		nameAr: "لحمة",
		nameEn: "Meat",
		unit: "g",
		initialQuantity: 0,
		lowStockThreshold: 700
	}
];
/**
* Admin and Supabase representation of the customer-facing menu.
* Each priced option becomes one editable menu record because menu_items stores
* one price per row rather than nested options.
*/
var websiteMenuCategories = publicMenuSections.map((section, index) => ({
	id: section.id,
	nameAr: section.nameAr,
	nameEn: section.nameEn,
	image: section.image,
	active: true,
	order: index + 1
}));
var websiteMenuProducts = publicMenuSections.flatMap((section) => section.items.flatMap((item) => item.options.map((option) => ({
	id: option.id,
	categoryId: section.id,
	nameAr: `${item.nameAr} — ${option.nameAr}`,
	nameEn: `${item.nameEn} — ${option.nameEn}`,
	descAr: option.price === void 0 ? `${section.nameAr} · السعر غير محدد` : `${section.nameAr} · ${option.nameAr}`,
	descEn: option.price === void 0 ? `${section.nameEn} · Price not set` : `${section.nameEn} · ${option.nameEn}`,
	price: option.price ?? 0,
	image: section.image,
	available: true,
	popular: Boolean(item.featured),
	featured: Boolean(item.featured),
	recipe: []
}))));
var starterProducts = websiteMenuProducts;
var addedSectionIds = /* @__PURE__ */ new Set(["offers", "family-meals"]);
var addedSectionCategories = websiteMenuCategories.filter((category) => addedSectionIds.has(category.id));
var addedSectionProducts = websiteMenuProducts.filter((product) => addedSectionIds.has(product.categoryId));
var MenuContext = (0, import_react.createContext)(null);
function productFromRow(row) {
	const category = Array.isArray(row.menu_categories) ? row.menu_categories[0] : row.menu_categories;
	return {
		id: row.id,
		categoryId: category?.slug ?? "",
		nameAr: row.name_ar,
		nameEn: row.name_en,
		descAr: row.description_ar ?? row.name_ar,
		descEn: row.description_en ?? row.name_en,
		price: Number(row.price),
		discount: Number(row.discount ?? 0) || void 0,
		image: getMenuItemImage({
			categoryId: category?.slug ?? "",
			nameAr: row.name_ar,
			nameEn: row.name_en,
			image: row.image_url
		}),
		available: row.is_available,
		popular: row.is_popular,
		featured: row.is_featured,
		recipe: (row.menu_item_ingredients ?? []).map((ingredient) => ({
			ingredientId: ingredient.ingredient_id,
			quantity: Number(ingredient.quantity_per_item)
		}))
	};
}
function MenuProvider({ children }) {
	const [products, setProducts] = (0, import_react.useState)(starterProducts);
	const [ingredients, setIngredients] = (0, import_react.useState)([]);
	const [categoryRows, setCategoryRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refresh = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		const { data: categoryData, error: categoryError } = await supabase.from("menu_categories").select("id, slug").order("display_order");
		if (categoryError) {
			setError(categoryError.message);
			setLoading(false);
			return;
		}
		const { data: menuData, error: menuError } = await supabase.from("menu_items").select("id, name_ar, name_en, description_ar, description_en, price, discount, image_url, is_available, is_popular, is_featured, menu_categories!inner(slug), menu_item_ingredients(ingredient_id, quantity_per_item)").eq("is_archived", false).order("created_at");
		if (menuError) {
			setError(menuError.message);
			setLoading(false);
			return;
		}
		const { data: ingredientData, error: ingredientError } = await supabase.from("ingredients").select("id, name_ar, name_en, unit, available_quantity, low_stock_threshold").order("name_en");
		setCategoryRows(categoryData ?? []);
		setProducts((menuData ?? []).map(productFromRow));
		if (typeof window !== "undefined") try {
			localStorage.removeItem("alkamal.inventory.v1");
		} catch {}
		if (!ingredientError && ingredientData?.length) setIngredients((ingredientData ?? []).map((ingredient) => {
			const qty = Number(ingredient.available_quantity ?? 0);
			return {
				id: ingredient.id,
				nameAr: ingredient.name_ar,
				nameEn: ingredient.name_en,
				unit: ingredient.unit,
				initialQuantity: qty,
				availableQuantity: qty,
				lowStockThreshold: Number(ingredient.low_stock_threshold ?? 0)
			};
		}));
		else setIngredients(ingredientDefinitions.map((def) => ({
			...def,
			initialQuantity: 0,
			availableQuantity: 0
		})));
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
		const { data: listener } = supabase.auth.onAuthStateChange(() => {
			refresh();
		});
		return () => listener.subscription.unsubscribe();
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		const refreshWhenVisible = () => {
			if (document.visibilityState === "visible") refresh();
		};
		const menuUpdates = supabase.channel("menu-item-availability").on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "menu_items"
		}, () => void refresh()).subscribe();
		const refreshTimer = window.setInterval(refreshWhenVisible, 15e3);
		window.addEventListener("focus", refreshWhenVisible);
		document.addEventListener("visibilitychange", refreshWhenVisible);
		return () => {
			window.clearInterval(refreshTimer);
			window.removeEventListener("focus", refreshWhenVisible);
			document.removeEventListener("visibilitychange", refreshWhenVisible);
			supabase.removeChannel(menuUpdates);
		};
	}, [refresh]);
	const saveRecipe = (0, import_react.useCallback)(async (menuItemId, product) => {
		const { error: deleteError } = await supabase.from("menu_item_ingredients").delete().eq("menu_item_id", menuItemId);
		if (deleteError) throw new Error(deleteError.message);
		const recipe = product.recipe ?? [];
		if (!recipe.length) return;
		const { error: recipeError } = await supabase.from("menu_item_ingredients").insert(recipe.map((ingredient) => ({
			menu_item_id: menuItemId,
			ingredient_id: ingredient.ingredientId,
			quantity_per_item: ingredient.quantity
		})));
		if (recipeError) throw new Error(recipeError.message);
	}, []);
	const addProduct = (0, import_react.useCallback)(async (product) => {
		const categoryId = categoryRows.find((category) => category.slug === product.categoryId)?.id;
		if (!categoryId) throw new Error("Choose a valid category before saving.");
		const { data, error: insertError } = await supabase.from("menu_items").insert({
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
			is_featured: Boolean(product.featured)
		}).select("id").single();
		if (insertError || !data) throw new Error(insertError?.message ?? "Unable to add the menu item.");
		await saveRecipe(data.id, product);
		await refresh();
	}, [
		categoryRows,
		refresh,
		saveRecipe
	]);
	const updateProduct = (0, import_react.useCallback)(async (product) => {
		const categoryId = categoryRows.find((category) => category.slug === product.categoryId)?.id;
		if (!categoryId) throw new Error("Choose a valid category before saving.");
		const { error: updateError } = await supabase.from("menu_items").update({
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
			is_featured: Boolean(product.featured)
		}).eq("id", product.id);
		if (updateError) throw new Error(updateError.message);
		await saveRecipe(product.id, product);
		await refresh();
	}, [
		categoryRows,
		refresh,
		saveRecipe
	]);
	const setProductAvailability = (0, import_react.useCallback)(async (id, available) => {
		const { data, error: updateError } = await supabase.from("menu_items").update({ is_available: available }).eq("id", id).select("id, is_available").maybeSingle();
		if (updateError) throw new Error(updateError.message);
		if (!data) throw new Error("Availability was not saved. Your admin account needs permission to update this menu item.");
		if (data.is_available !== available) throw new Error("Availability was not saved. Please try again.");
		setProducts((current) => current.map((product) => product.id === id ? {
			...product,
			available
		} : product));
		await refresh();
	}, [refresh]);
	const deleteProduct = (0, import_react.useCallback)(async (id) => {
		const { error: deleteError } = await supabase.from("menu_items").update({
			is_archived: true,
			is_available: false
		}).eq("id", id);
		if (deleteError) throw new Error(deleteError.message);
		await refresh();
	}, [refresh]);
	const syncOffersAndFamilyMeals = (0, import_react.useCallback)(async () => {
		setError(null);
		const { data: syncedCategories, error: categorySyncError } = await supabase.from("menu_categories").upsert(addedSectionCategories.map((category) => ({
			slug: category.id,
			name_ar: category.nameAr,
			name_en: category.nameEn,
			image_url: category.image,
			display_order: category.order,
			is_active: true
		})), { onConflict: "slug" }).select("id, slug");
		if (categorySyncError) throw new Error(categorySyncError.message);
		const categoryMap = new Map((syncedCategories ?? []).map((category) => [category.slug, category.id]));
		const missingCategory = addedSectionCategories.find((category) => !categoryMap.has(category.id));
		if (missingCategory) throw new Error(`Unable to add the ${missingCategory.nameEn} category.`);
		const { data: existingRows, error: existingRowsError } = await supabase.from("menu_items").select("name_ar, menu_categories!inner(slug)");
		if (existingRowsError) throw new Error(existingRowsError.message);
		const existingKeys = new Set((existingRows ?? []).flatMap((row) => {
			const joinedCategory = Array.isArray(row.menu_categories) ? row.menu_categories[0] : row.menu_categories;
			return joinedCategory?.slug ? [`${joinedCategory.slug}::${row.name_ar}`] : [];
		}));
		const missingProducts = addedSectionProducts.filter((product) => !existingKeys.has(`${product.categoryId}::${product.nameAr}`));
		if (missingProducts.length) {
			const { data: insertedProducts, error: productInsertError } = await supabase.from("menu_items").insert(missingProducts.map((product) => ({
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
				is_featured: Boolean(product.featured)
			}))).select("id");
			if (productInsertError) throw new Error(productInsertError.message);
			if ((insertedProducts ?? []).length !== missingProducts.length) throw new Error("Not all Offers and Family Meals records were saved.");
		}
		await refresh();
		return missingProducts.length;
	}, [refresh]);
	const replaceWithWebsiteMenu = (0, import_react.useCallback)(async () => {
		setError(null);
		const [currentItemsResult, categorySyncResult] = await Promise.all([supabase.from("menu_items").select("id").eq("is_archived", false), supabase.from("menu_categories").upsert(websiteMenuCategories.map((category) => ({
			slug: category.id,
			name_ar: category.nameAr,
			name_en: category.nameEn,
			image_url: category.image,
			display_order: category.order,
			is_active: true
		})), { onConflict: "slug" }).select("id, slug")]);
		const { data: currentItems, error: currentItemsError } = currentItemsResult;
		if (currentItemsError) throw new Error(currentItemsError.message);
		const { data: syncedCategories, error: categorySyncError } = categorySyncResult;
		if (categorySyncError) throw new Error(categorySyncError.message);
		const categoryMap = new Map((syncedCategories ?? []).map((category) => [category.slug, category.id]));
		const missingCategory = websiteMenuCategories.find((category) => !categoryMap.has(category.id));
		if (missingCategory) throw new Error(`Unable to sync the ${missingCategory.nameEn} category.`);
		const { data: insertedProducts, error: productInsertError } = await supabase.from("menu_items").insert(starterProducts.map((product) => ({
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
			is_featured: Boolean(product.featured)
		}))).select("id");
		if (productInsertError) throw new Error(productInsertError.message);
		const oldItemIds = (currentItems ?? []).map((item) => item.id);
		if (oldItemIds.length) {
			const { error: archiveError } = await supabase.from("menu_items").update({
				is_archived: true,
				is_available: false
			}).in("id", oldItemIds);
			if (archiveError) {
				const insertedIds = (insertedProducts ?? []).map((item) => item.id);
				if (insertedIds.length) await supabase.from("menu_items").update({
					is_archived: true,
					is_available: false
				}).in("id", insertedIds);
				throw new Error(archiveError.message);
			}
		}
		await refresh();
	}, [refresh]);
	const seedStarterMenu = replaceWithWebsiteMenu;
	const value = (0, import_react.useMemo)(() => ({
		products,
		ingredients,
		categoryRows,
		loading,
		error,
		refresh,
		seedStarterMenu,
		replaceWithWebsiteMenu,
		syncOffersAndFamilyMeals,
		addProduct,
		updateProduct,
		setProductAvailability,
		deleteProduct
	}), [
		addProduct,
		categoryRows,
		deleteProduct,
		error,
		ingredients,
		loading,
		products,
		refresh,
		replaceWithWebsiteMenu,
		seedStarterMenu,
		syncOffersAndFamilyMeals,
		updateProduct,
		setProductAvailability
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContext.Provider, {
		value,
		children
	});
}
function useMenu() {
	const context = (0, import_react.useContext)(MenuContext);
	if (!context) throw new Error("useMenu must be used inside MenuProvider");
	return context;
}
//#endregion
export { websiteMenuProducts as i, useMenu as n, websiteMenuCategories as r, MenuProvider as t };
