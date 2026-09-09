import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { a as supabase } from "./supabase-BvpBKmRv.mjs";
import { i as websiteMenuProducts, n as useMenu, r as websiteMenuCategories } from "./use-menu-Bfna45r-.mjs";
import { f as Outlet, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ImagePlus, C as LogOut, T as LockKeyhole, c as SearchX, g as Pencil, i as Trash2, m as Plus, p as Power, r as UtensilsCrossed, s as Search, t as X, u as RefreshCw, w as LogIn } from "../_libs/lucide-react.mjs";
import { t as AdminHeader } from "./AdminHeader-BK-QHgXO.mjs";
import { n as images } from "./menu-CcVp0Adn.mjs";
import { c as Price, l as FoodImage } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D0O9iZYn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminAccess({ hasSession, isAdmin }) {
	const { L } = useLang();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const signIn = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		setError("");
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (signInError) setError(signInError.message);
		setSubmitting(false);
	};
	const signOut = async () => {
		await supabase.auth.signOut();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ink px-4 text-bone",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md border border-gold/25 bg-charcoal/65 p-6 shadow-2xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-11 w-11 place-items-center border border-gold/45 text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 eyebrow",
					children: L("دخول الإدارة", "ADMIN ACCESS")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl text-bone",
					children: hasSession && !isAdmin ? L("هذا الحساب غير مصرح", "Account not authorized") : L("تسجيل دخول الإدارة", "Admin sign in")
				}),
				hasSession && !isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-6 text-bone/65",
					children: L("تم تسجيل الدخول، لكن هذا المستخدم غير موجود في جدول admin_users في Supabase.", "You are signed in, but this user is not listed in Supabase admin_users.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: signOut,
					className: "mt-6 inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 text-sm text-gold hover:bg-gold hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), L("تسجيل الخروج", "Sign out")]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: signIn,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-bone/75",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block tracking-wide text-gold/90",
								children: L("البريد الإلكتروني", "Email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								autoComplete: "email",
								required: true,
								value: email,
								onChange: (event) => setEmail(event.target.value),
								className: "form-control"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-bone/75",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block tracking-wide text-gold/90",
								children: L("كلمة المرور", "Password")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoComplete: "current-password",
								required: true,
								value: password,
								onChange: (event) => setPassword(event.target.value),
								className: "form-control"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting,
							className: "inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gold px-4 text-sm font-medium text-ink hover:bg-gold-soft disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), submitting ? L("جارٍ تسجيل الدخول", "Signing in…") : L("دخول", "Sign in")]
						})
					]
				})
			]
		})
	});
}
function useAdminAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const validateSession = async (nextSession) => {
			if (!mounted) return;
			setSession(nextSession);
			if (!nextSession) {
				setIsAdmin(false);
				setLoading(false);
				return;
			}
			setLoading(true);
			const { data, error } = await supabase.rpc("is_admin");
			if (!mounted) return;
			setIsAdmin(!error && data === true);
			setLoading(false);
		};
		supabase.auth.getSession().then(({ data }) => validateSession(data.session));
		const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			window.setTimeout(() => void validateSession(nextSession), 0);
		});
		return () => {
			mounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);
	return {
		session,
		isAdmin,
		loading
	};
}
var activeCategories = websiteMenuCategories.filter((category) => category.active);
var categoryById = new Map(websiteMenuCategories.map((category) => [category.id, category]));
function includesMenuQuery(value, query) {
	return value.toLocaleLowerCase().includes(query);
}
var portionOptions = {
	hummus: [
		{
			id: "small",
			nameAr: "حمص صغير",
			nameEn: "Hummus Small",
			price: .5
		},
		{
			id: "medium",
			nameAr: "حمص وسط",
			nameEn: "Hummus Medium",
			price: .65
		},
		{
			id: "large",
			nameAr: "حمص كبير",
			nameEn: "Hummus Large",
			price: .8
		}
	],
	foul: [
		{
			id: "small",
			nameAr: "فول صغير",
			nameEn: "Foul Small",
			price: .6
		},
		{
			id: "medium",
			nameAr: "فول وسط",
			nameEn: "Foul Medium",
			price: .75
		},
		{
			id: "large",
			nameAr: "فول كبير",
			nameEn: "Foul Large",
			price: .9
		}
	]
};
function emptyForm() {
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
		recipe: []
	};
}
function productToForm(product) {
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
		recipe: product.recipe ?? []
	};
}
function Admin() {
	const { L } = useLang();
	const { products, ingredients, addProduct, updateProduct, setProductAvailability, deleteProduct, seedStarterMenu, replaceWithWebsiteMenu, syncOffersAndFamilyMeals } = useMenu();
	const { session, isAdmin, loading: authLoading } = useAdminAuth();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [selectedPortion, setSelectedPortion] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [menuSearch, setMenuSearch] = (0, import_react.useState)("");
	const [menuCategory, setMenuCategory] = (0, import_react.useState)("sandwiches");
	const [syncingMenu, setSyncingMenu] = (0, import_react.useState)(false);
	const [syncingAddedSections, setSyncingAddedSections] = (0, import_react.useState)(false);
	const [availabilitySavingId, setAvailabilitySavingId] = (0, import_react.useState)(null);
	const [availabilityMessage, setAvailabilityMessage] = (0, import_react.useState)("");
	const addedSectionsSyncAttempted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!isAdmin || addedSectionsSyncAttempted.current) return;
		addedSectionsSyncAttempted.current = true;
		setSyncingAddedSections(true);
		setError("");
		syncOffersAndFamilyMeals().then((addedCount) => {
			if (addedCount > 0) setAvailabilityMessage(L(`تمت إضافة ${addedCount} أصناف للعروض والوجبات العائلية.`, `${addedCount} Offers and Family Meals records were added.`));
		}).catch((syncError) => {
			setError(syncError instanceof Error ? syncError.message : "Unable to add Offers and Family Meals.");
		}).finally(() => setSyncingAddedSections(false));
	}, [
		L,
		isAdmin,
		syncOffersAndFamilyMeals
	]);
	const isEditing = editingId !== null;
	const sortedProducts = (0, import_react.useMemo)(() => [...products].sort((a, b) => a.nameEn.localeCompare(b.nameEn)), [products]);
	const visibleProducts = (0, import_react.useMemo)(() => {
		const query = menuSearch.trim().toLocaleLowerCase();
		return sortedProducts.filter((product) => {
			if (!query) return product.categoryId === menuCategory;
			const category = categoryById.get(product.categoryId);
			return includesMenuQuery([
				product.nameAr,
				product.nameEn,
				product.descAr,
				product.descEn,
				category?.nameAr ?? product.categoryId,
				category?.nameEn ?? product.categoryId
			].join(" "), query);
		});
	}, [
		menuCategory,
		menuSearch,
		sortedProducts
	]);
	const productCountByCategory = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const product of products) counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
		return counts;
	}, [products]);
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ink text-gold",
		children: L("جارٍ تحميل الإدارة…", "Loading admin…")
	});
	if (!session || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminAccess, {
		hasSession: Boolean(session),
		isAdmin
	});
	if (pathname !== "/admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	const updateField = (field, value) => {
		setForm((current) => ({
			...current,
			[field]: value
		}));
		setError("");
	};
	const updateRecipe = (index, update) => {
		setForm((current) => ({
			...current,
			recipe: current.recipe.map((ingredient, recipeIndex) => recipeIndex === index ? {
				...ingredient,
				...update
			} : ingredient)
		}));
		setError("");
	};
	const addRecipeIngredient = () => {
		const firstIngredient = ingredients[0];
		if (!firstIngredient) return;
		setForm((current) => ({
			...current,
			recipe: [...current.recipe, {
				ingredientId: firstIngredient.id,
				quantity: 0
			}]
		}));
		setError("");
	};
	const removeRecipeIngredient = (index) => {
		setForm((current) => ({
			...current,
			recipe: current.recipe.filter((_, recipeIndex) => recipeIndex !== index)
		}));
	};
	const startAdd = () => {
		setEditingId(null);
		setForm(emptyForm());
		setSelectedPortion(null);
		setError("");
	};
	const startEdit = (product) => {
		setEditingId(product.id);
		setForm(productToForm(product));
		setSelectedPortion(product.nameEn.endsWith(" Small") ? "small" : product.nameEn.endsWith(" Medium") ? "medium" : product.nameEn.endsWith(" Large") ? "large" : null);
		setError("");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const handleImageFile = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > 2e6) {
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
		const discount = form.discount ? Number(form.discount) : void 0;
		if (!form.nameAr.trim() || !form.nameEn.trim() || !form.image.trim() || !Number.isFinite(price) || price < 0 || form.recipe.some((ingredient) => !ingredients.some((definition) => definition.id === ingredient.ingredientId) || !Number.isFinite(ingredient.quantity) || ingredient.quantity <= 0)) {
			setError(L("أضف الاسم بالعربية والإنجليزية والصورة وسعراً صحيحاً قبل الحفظ.", "Add Arabic and English names, an image, a valid price, and a recipe before saving."));
			return;
		}
		if (discount !== void 0 && (!Number.isFinite(discount) || discount < 0 || discount >= price)) {
			setError(L("الخصم يجب أن يكون أقل من السعر.", "The discount must be lower than the price."));
			return;
		}
		const existing = products.find((product) => product.id === editingId);
		const product = {
			id: existing?.id ?? `p-${Date.now()}`,
			categoryId: form.categoryId,
			nameAr: form.nameAr.trim(),
			nameEn: form.nameEn.trim(),
			descAr: form.descAr.trim() || form.nameAr.trim(),
			descEn: form.descEn.trim() || form.nameEn.trim(),
			price,
			...discount ? { discount } : {},
			image: form.image.trim(),
			available: form.available,
			popular: form.popular,
			featured: form.featured,
			recipe: form.recipe,
			...existing?.extras ? { extras: existing.extras } : {}
		};
		try {
			if (existing) await updateProduct(product);
			else await addProduct(product);
			startAdd();
		} catch (saveError) {
			setError(saveError instanceof Error ? saveError.message : "Unable to save this menu item.");
		}
	};
	const removeProduct = async (product) => {
		if (window.confirm(L(`حذف ${product.nameAr} من المنيو؟`, `Delete ${product.nameEn} from the menu?`))) try {
			await deleteProduct(product.id);
			if (editingId === product.id) startAdd();
		} catch (deleteError) {
			setError(deleteError instanceof Error ? deleteError.message : "Unable to delete this menu item.");
		}
	};
	const toggleAvailability = async (product) => {
		const nextAvailability = !product.available;
		setAvailabilitySavingId(product.id);
		setAvailabilityMessage("");
		setError("");
		try {
			await setProductAvailability(product.id, nextAvailability);
			setAvailabilityMessage(L(`${product.nameAr} أصبح ${nextAvailability ? "متوفراً" : "غير متوفر"}.`, `${product.nameEn} is now ${nextAvailability ? "available" : "not available"}.`));
		} catch (availabilityError) {
			setError(availabilityError instanceof Error ? availabilityError.message : "Unable to update availability.");
		} finally {
			setAvailabilitySavingId(null);
		}
	};
	const importStarterMenu = async () => {
		try {
			setError("");
			await seedStarterMenu();
		} catch (seedError) {
			setError(seedError instanceof Error ? seedError.message : "Unable to import the starter menu.");
		}
	};
	const syncFullWebsiteMenu = async () => {
		if (!window.confirm(L(`سيتم استبدال ${products.length} صنف حالي بـ ${websiteMenuProducts.length} صنف من منيو الموقع. هل تريد المتابعة؟`, `Replace the current ${products.length} records with all ${websiteMenuProducts.length} website menu records?`))) return;
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
			setAvailabilityMessage(addedCount > 0 ? L(`تمت إضافة ${addedCount} أصناف للعروض والوجبات العائلية.`, `${addedCount} Offers and Family Meals records were added.`) : L("العروض والوجبات العائلية موجودة بالفعل في صفحة الإدارة.", "Offers and Family Meals are already in the admin page."));
		} catch (syncError) {
			setError(syncError instanceof Error ? syncError.message : "Unable to add Offers and Family Meals.");
		} finally {
			setSyncingAddedSections(false);
		}
	};
	const selectCategory = (categoryId) => {
		updateField("categoryId", categoryId);
		setSelectedPortion(null);
	};
	const selectPortion = (size) => {
		const portion = (form.categoryId === "hummus" ? portionOptions.hummus : portionOptions.foul).find((option) => option.id === size);
		if (!portion) return;
		const isHummus = form.categoryId === "hummus";
		setForm((current) => ({
			...current,
			nameAr: portion.nameAr,
			nameEn: portion.nameEn,
			descAr: isHummus ? "حمص ناعم مع زيت زيتون أردني وطحينة." : "فول مدمس على النار من الليل، ليمون وكمون وزيت زيتون.",
			descEn: isHummus ? "Silky, with Jordanian olive oil and washed tahini." : "Slow-simmered fava beans, lemon, cumin, olive oil.",
			price: String(portion.price),
			image: isHummus ? images.hummusMeat : images.foul,
			recipe: []
		}));
		setSelectedPortion(size);
		setError("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-ink pb-10 text-bone",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, { page: "menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: L("إدارة الأصناف", "MENU MANAGEMENT")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl text-bone sm:text-4xl",
							children: L("أصناف المنيو", "Menu items")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: L("ابحث حسب التصنيف، ثم عدّل أو احذف الصنف المطلوب.", "Choose a category, then quickly find, edit, or remove an item.")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void syncAddedSections(),
								disabled: syncingAddedSections,
								className: "inline-flex min-h-11 items-center gap-2 border border-emerald-300/35 px-4 py-2 text-sm text-emerald-200 transition-colors hover:bg-emerald-300/10 disabled:cursor-wait disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${syncingAddedSections ? "animate-spin" : ""}` }), syncingAddedSections ? L("جارٍ إضافة الأقسام...", "Adding sections...") : L("إضافة العروض والوجبات العائلية", "Add Offers & Family Meals")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void syncFullWebsiteMenu(),
								disabled: syncingMenu,
								className: "inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink disabled:cursor-wait disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${syncingMenu ? "animate-spin" : ""}` }), syncingMenu ? L("جارٍ نقل كل المنيو...", "Syncing full menu...") : L(`استبدال القائمة بكل المنيو (${websiteMenuProducts.length})`, `Replace with full menu (${websiteMenuProducts.length})`)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: startAdd,
								className: "inline-flex min-h-11 items-center gap-2 bg-gold px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), L("إضافة صنف", "Add item")]
							})
						]
					})]
				}),
				error || availabilityMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					"aria-live": "polite",
					children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100",
						children: error
					}) : null, availabilityMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-emerald-300/30 bg-emerald-300/10 p-3 text-sm text-emerald-100",
						children: availabilityMessage
					}) : null]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-2 xl:order-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-gold/20 bg-charcoal/35",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b border-gold/15 p-4 sm:p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: menuSearch ? L("نتائج البحث", "SEARCH RESULTS") : L(categoryById.get(menuCategory)?.nameAr ?? "الأصناف", categoryById.get(menuCategory)?.nameEn ?? "ITEMS")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "mt-1 text-2xl text-bone",
											children: [visibleProducts.length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ms-2 text-sm font-normal text-bone/45",
												children: L(`من ${products.length}`, `of ${products.length}`)
											})]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex min-h-11 w-full items-center gap-2 border border-gold/20 bg-ink/45 px-3 text-bone/70 focus-within:border-gold sm:w-72",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-gold" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: menuSearch,
													onChange: (event) => setMenuSearch(event.target.value),
													className: "min-w-0 flex-1 bg-transparent py-2 text-sm text-bone outline-none placeholder:text-bone/40",
													placeholder: L("ابحث عن صنف...", "Search menu items..."),
													"aria-label": L("البحث في الأصناف", "Search menu items")
												}),
												menuSearch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setMenuSearch(""),
													className: "grid h-8 w-8 place-items-center text-bone/55 hover:text-gold",
													"aria-label": L("مسح البحث", "Clear search"),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
												}) : null
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 border-b border-gold/15 p-3 sm:grid-cols-4 2xl:grid-cols-8",
									role: "toolbar",
									"aria-label": L("تصفية الأصناف حسب التصنيف", "Filter items by category"),
									children: activeCategories.map((category) => {
										const count = productCountByCategory.get(category.id) ?? 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": !menuSearch && menuCategory === category.id,
											onClick: () => {
												setMenuCategory(category.id);
												setMenuSearch("");
											},
											className: `min-h-12 border px-2 py-2 text-xs transition-colors ${!menuSearch && menuCategory === category.id ? "border-gold bg-gold text-ink" : "border-gold/20 text-bone/70 hover:border-gold hover:text-gold"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block",
												children: L(category.nameAr, category.nameEn)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block opacity-65",
												children: count
											})]
										}, category.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-px bg-gold/10 p-px md:grid-cols-2",
									children: visibleProducts.map((product) => {
										const category = categoryById.get(product.categoryId);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 bg-charcoal p-3 sm:p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
												src: product.image,
												alt: L(product.nameAr, product.nameEn),
												className: "h-[4.5rem] w-[4.5rem]",
												zoom: false
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "font-display text-base leading-6 text-bone",
																children: L(product.nameAr, product.nameEn)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "border border-gold/20 px-2 py-0.5 text-[0.65rem] text-gold",
																children: category ? L(category.nameAr, category.nameEn) : product.categoryId
															}),
															!product.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[0.65rem] text-bone/50",
																children: L("غير متوفر", "Unavailable")
															}) : null
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
														children: L(product.descAr, product.descEn)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-2 flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm text-gold",
															children: product.price > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: product.price - (product.discount ?? 0) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs text-amber-200",
																children: L("السعر غير محدد", "Price not set")
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => void toggleAvailability(product),
																	disabled: availabilitySavingId === product.id,
																	className: `inline-flex h-9 items-center gap-1.5 border px-2 text-[0.65rem] font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${product.available ? "border-emerald-300/40 text-emerald-200 hover:border-emerald-300 hover:bg-emerald-300/10" : "border-bone/25 text-bone/70 hover:border-gold hover:text-gold"}`,
																	"aria-label": L(`تعيين ${product.nameAr} ${product.available ? "غير متوفر" : "متوفر"}`, `Mark ${product.nameEn} as ${product.available ? "not available" : "available"}`),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-3.5 w-3.5" }), availabilitySavingId === product.id ? L("جارٍ الحفظ...", "Saving...") : product.available ? L("متوفر", "Available") : L("غير متوفر", "Not available")]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => startEdit(product),
																	className: "grid h-9 w-9 place-items-center border border-gold/25 text-gold hover:border-gold",
																	"aria-label": L(`تعديل ${product.nameAr}`, `Edit ${product.nameEn}`),
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => void removeProduct(product),
																	className: "grid h-9 w-9 place-items-center border border-red-300/25 text-red-200 hover:border-red-300",
																	"aria-label": L(`حذف ${product.nameAr}`, `Delete ${product.nameEn}`),
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
																})
															]
														})]
													})
												]
											})]
										}, product.id);
									})
								}),
								!visibleProducts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-12 text-center text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "mx-auto mb-3 h-7 w-7 text-gold" }),
										L(menuSearch ? "لا توجد نتائج مطابقة." : "لا توجد أصناف في هذا التصنيف.", menuSearch ? "No matching items." : "There are no items in this category."),
										!products.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => void importStarterMenu(),
											className: "mx-auto mt-5 inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 text-sm text-gold hover:bg-gold hover:text-ink",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), L("استيراد كل منيو الموقع", "Import the full website menu")]
										}) : null
									]
								}) : null
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "order-1 h-fit border border-gold/25 bg-charcoal/60 xl:sticky xl:top-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-gold/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: isEditing ? L("تعديل صنف", "EDIT ITEM") : L("صنف جديد", "NEW ITEM")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl text-bone",
								children: isEditing ? L("تعديل المعلومات", "Edit details") : L("إضافة للمنيو", "Add to menu")
							})] }), isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: startAdd,
								className: "grid h-10 w-10 place-items-center border border-gold/25 text-bone/70 hover:border-gold hover:text-gold",
								"aria-label": L("إلغاء التعديل", "Cancel editing"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
									label: L("التصنيف", "Category"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.categoryId,
										onChange: (event) => selectCategory(event.target.value),
										className: "form-control",
										children: activeCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: category.id,
											children: L(category.nameAr, category.nameEn)
										}, category.id))
									})
								}),
								form.categoryId === "hummus" || form.categoryId === "foul" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-gold/25 bg-ink/40 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-medium text-gold",
										children: L("اختر الحجم", "Choose size")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-2",
										role: "tablist",
										"aria-label": L("الحجم", "Size"),
										children: (form.categoryId === "hummus" ? portionOptions.hummus : portionOptions.foul).map((portion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											role: "tab",
											"aria-selected": selectedPortion === portion.id,
											onClick: () => selectPortion(portion.id),
											className: `min-h-11 border px-2 text-sm transition-colors ${selectedPortion === portion.id ? "border-gold bg-gold text-ink" : "border-gold/25 text-bone hover:border-gold hover:text-gold"}`,
											children: L(portion.id === "small" ? "صغير" : portion.id === "medium" ? "وسط" : "كبير", portion.id === "small" ? "Small" : portion.id === "medium" ? "Medium" : "Large")
										}, portion.id))
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("الاسم بالعربية", "Arabic name"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.nameAr,
											onChange: (event) => updateField("nameAr", event.target.value),
											className: "form-control",
											required: true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("الاسم بالإنجليزية", "English name"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: form.nameEn,
											onChange: (event) => updateField("nameEn", event.target.value),
											className: "form-control",
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("الوصف بالعربية", "Arabic description"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: form.descAr,
											onChange: (event) => updateField("descAr", event.target.value),
											className: "form-control min-h-20 resize-y"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("الوصف بالإنجليزية", "English description"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: form.descEn,
											onChange: (event) => updateField("descEn", event.target.value),
											className: "form-control min-h-20 resize-y"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("السعر", "Price"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											step: "0.01",
											value: form.price,
											onChange: (event) => updateField("price", event.target.value),
											className: "form-control",
											required: true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										label: L("الخصم (اختياري)", "Discount (optional)"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											step: "0.01",
											value: form.discount,
											onChange: (event) => updateField("discount", event.target.value),
											className: "form-control"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-gold/20 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs tracking-wide text-gold/90",
											children: L("وصفة الصنف", "Recipe per item")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-bone/50",
											children: L("تُخصم الكميات تلقائياً عند تسجيل البيع اليومي.", "Amounts are deducted automatically when a sale is recorded.")
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: addRecipeIngredient,
											className: "inline-flex h-9 items-center gap-1 border border-gold/30 px-2 text-xs text-gold hover:border-gold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), L("مكوّن", "Ingredient")]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-2",
										children: [form.recipe.map((ingredient, index) => {
											const definition = ingredients.find((item) => item.id === ingredient.ingredientId);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-[minmax(0,1fr)_5rem_auto_auto] items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
														value: ingredient.ingredientId,
														onChange: (event) => updateRecipe(index, { ingredientId: event.target.value }),
														className: "form-control min-w-0",
														children: ingredients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: item.id,
															children: L(item.nameAr, item.nameEn)
														}, item.id))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: "0.1",
														step: "0.1",
														value: ingredient.quantity || "",
														onChange: (event) => updateRecipe(index, { quantity: Number(event.target.value) }),
														className: "form-control min-w-0",
														"aria-label": L("الكمية", "Quantity")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-bone/50",
														children: definition?.unit ?? ""
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => removeRecipeIngredient(index),
														className: "grid h-9 w-9 place-items-center border border-red-300/25 text-red-200 hover:border-red-300",
														"aria-label": L("حذف المكوّن", "Remove ingredient"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
													})
												]
											}, `${ingredient.ingredientId}-${index}`);
										}), !form.recipe.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-amber-200",
											children: L("لا توجد وصفة بعد؛ تسجيل المبيعات لن يخصم من المخزون لهذا الصنف.", "No recipe yet — sales for this item will not deduct inventory.")
										}) : null]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
									label: L("رابط الصورة", "Image URL"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: form.image.startsWith("data:") ? "" : form.image,
										onChange: (event) => updateField("image", event.target.value),
										placeholder: "https://...",
										className: "form-control"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-3 border border-dashed border-gold/30 px-4 py-3 text-sm text-bone/75 transition-colors hover:border-gold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-5 w-5 text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("أو ارفع صورة من جهازك", "Or upload an image from your device") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											onChange: handleImageFile,
											className: "sr-only"
										})
									]
								}),
								form.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden border border-gold/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
										src: form.image,
										alt: L(form.nameAr || "معاينة", form.nameEn || "Preview"),
										className: "aspect-[16/8] w-full",
										zoom: false
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: L("متوفر", "Available"),
											checked: form.available,
											onChange: (value) => updateField("available", value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: L("الأكثر طلباً", "Popular"),
											checked: form.popular,
											onChange: (value) => updateField("popular", value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: L("مميز", "Featured"),
											checked: form.featured,
											onChange: (value) => updateField("featured", value)
										})
									]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void saveProduct(),
									className: "flex min-h-12 w-full items-center justify-center gap-2 bg-gold px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-4 w-4" }), isEditing ? L("حفظ التعديلات", "Save changes") : L("إضافة للمنيو", "Add to menu")]
								})
							]
						})]
					})]
				})
			]
		})]
	});
}
function FormLabel({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-xs text-bone/75",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block tracking-wide text-gold/90",
			children: label
		}), children]
	});
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-center gap-2 border border-gold/15 px-2 py-2 text-bone/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (event) => onChange(event.target.checked),
			className: "accent-[var(--gold)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
//#endregion
export { Admin as component };
