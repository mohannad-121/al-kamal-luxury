import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang, t as LangProvider } from "./use-lang-Y8BO142B.mjs";
import { a as supabase, i as publicMenuSections } from "./supabase-BvpBKmRv.mjs";
import { n as useMenu, t as MenuProvider } from "./use-menu-Bfna45r-.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as MapPin, j as House, m as Plus, o as ShoppingBag, r as UtensilsCrossed, t as X, y as Minus } from "../_libs/lucide-react.mjs";
import { t as restaurant } from "./restaurant-CFBERA6Q.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FoodImage-wQCg5Gnk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Image with placeholder shimmer, correct cropping and lazy loading. */
function FoodImage({ src, alt, className, imgClassName, imgStyle, eager = false, zoom = true }) {
	const [loadedSrc, setLoadedSrc] = (0, import_react.useState)(null);
	const imageRef = (0, import_react.useRef)(null);
	const loaded = loadedSrc === src;
	(0, import_react.useEffect)(() => {
		const image = imageRef.current;
		if (image?.complete && image.naturalWidth > 0) setLoadedSrc(src);
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group/image relative overflow-hidden bg-charcoal", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: cn("pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,var(--charcoal)_8%,var(--warm-charcoal)_48%,var(--charcoal)_92%)] transition-opacity duration-700 motion-reduce:animate-none motion-reduce:transition-none", loaded ? "opacity-0" : "animate-soft-pulse opacity-100")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			ref: imageRef,
			src,
			alt,
			loading: eager ? "eager" : "lazy",
			fetchPriority: eager ? "high" : "auto",
			decoding: "async",
			style: imgStyle,
			onLoad: () => setLoadedSrc(src),
			onError: () => setLoadedSrc(src),
			className: cn("h-full w-full object-cover transition-[opacity,transform,filter] duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:transition-none", loaded ? "scale-100 opacity-100 saturate-100" : "scale-[1.025] opacity-0 saturate-[0.88]", zoom && "group-hover/image:scale-[1.055] group-hover/image:saturate-[1.06]", imgClassName)
		})]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Price-Dui-ILLQ.js
var priceFormatters = {
	ar: new Intl.NumberFormat("ar-JO", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}),
	en: new Intl.NumberFormat("en-JO", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
};
function formatPrice(value, lang = "en") {
	return priceFormatters[lang].format(value);
}
function Price({ value, className }) {
	const { L, lang, dir } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-baseline gap-1 tabular-nums", className),
		dir,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bdi", {
			dir: "auto",
			children: formatPrice(value, lang)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[0.7em] text-gold/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bdi", {
				dir: "auto",
				children: L("د.أ", "JOD")
			})
		})]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-cart-CyxymC0c.js
var Ctx = (0, import_react.createContext)(null);
var KEY = "alkamal.cart.v1";
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [delivery, setDelivery] = (0, import_react.useState)(restaurant.deliveryFeeDefault);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(KEY, JSON.stringify(lines));
	}, [lines, hydrated]);
	const add = (0, import_react.useCallback)(({ product, qty, extras, note }) => {
		const unitPrice = product.price - (product.discount ?? 0) + extras.reduce((s, e) => s + e.price, 0);
		const signature = `${product.id}|${extras.map((e) => e.id).sort().join(",")}|${note ?? ""}`;
		setLines((prev) => {
			if (prev.find((l) => l.lineId === signature)) return prev.map((l) => l.lineId === signature ? {
				...l,
				qty: l.qty + qty
			} : l);
			return [...prev, {
				lineId: signature,
				productId: product.id,
				nameAr: product.nameAr,
				nameEn: product.nameEn,
				image: product.image,
				unitPrice,
				qty,
				extras,
				...note ? { note } : {}
			}];
		});
	}, []);
	const remove = (0, import_react.useCallback)((lineId) => {
		setLines((prev) => prev.filter((l) => l.lineId !== lineId));
	}, []);
	const setQty = (0, import_react.useCallback)((lineId, qty) => {
		setLines((prev) => qty <= 0 ? prev.filter((l) => l.lineId !== lineId) : prev.map((l) => l.lineId === lineId ? {
			...l,
			qty
		} : l));
	}, []);
	const setNote = (0, import_react.useCallback)((lineId, note) => {
		setLines((prev) => prev.map((l) => l.lineId === lineId ? {
			...l,
			note
		} : l));
	}, []);
	const clear = (0, import_react.useCallback)(() => setLines([]), []);
	const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
	const count = lines.reduce((s, l) => s + l.qty, 0);
	const discount = subtotal > 5 ? restaurant.demoDiscount : 0;
	const total = Math.max(0, subtotal + (lines.length ? delivery : 0) - discount);
	const value = (0, import_react.useMemo)(() => ({
		lines,
		count,
		subtotal,
		delivery: lines.length ? delivery : 0,
		discount,
		total,
		open,
		setOpen,
		setDelivery,
		add,
		remove,
		setQty,
		setNote,
		clear
	}), [
		lines,
		count,
		subtotal,
		delivery,
		discount,
		total,
		open,
		add,
		remove,
		setQty,
		setNote,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/GoldButton-BNSdSYa1.js
var base = "relative inline-flex touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-[var(--control-radius)] border font-semibold tracking-[0.015em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/75 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:active:transform-none motion-reduce:transition-none motion-reduce:active:transform-none";
var variants = {
	gold: "border-gold-soft/55 bg-[linear-gradient(180deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_7px_18px_-14px_oklch(0.716_0.107_78.5/.8)] hover:border-gold-soft hover:brightness-[1.04] hover:shadow-[0_9px_22px_-15px_oklch(0.716_0.107_78.5/.75)]",
	outline: "border-gold/40 bg-transparent text-bone hover:border-gold/65 hover:bg-gold/[.07] hover:text-gold-soft",
	ghost: "border-transparent bg-transparent text-bone/75 hover:bg-gold/[.06] hover:text-gold-soft",
	dark: "border-gold/20 bg-charcoal text-bone hover:border-gold/40 hover:bg-warm-charcoal"
};
var sizes = {
	sm: "h-10 px-4 text-[0.78rem]",
	md: "h-11 px-5 text-[0.86rem]",
	lg: "h-13 px-7 text-[0.92rem] sm:px-8"
};
var GoldButton = (0, import_react.forwardRef)(({ className, variant = "gold", size = "md", children, ...rest }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(base, variants[variant], sizes[size], className),
	...rest,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex items-center justify-center gap-2 [&_svg]:shrink-0",
		children
	})
}));
GoldButton.displayName = "GoldButton";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-daily-sales-D1Ck9Hbu.js
var HISTORY_START_DATE = "2026-08-30";
var DailySalesContext = (0, import_react.createContext)(null);
function today() {
	return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Amman" }).format(/* @__PURE__ */ new Date());
}
async function purgeLegacyHistory() {
	const { data: legacySessions, error: lookupError } = await supabase.from("daily_sessions").select("id").eq("is_closed", true).lt("business_date", HISTORY_START_DATE);
	if (lookupError || !legacySessions?.length) return;
	const sessionIds = legacySessions.map((session) => session.id);
	const [salesDelete, usageDelete] = await Promise.all([supabase.from("daily_item_sales").delete().in("session_id", sessionIds), supabase.from("daily_ingredient_usage").delete().in("session_id", sessionIds)]);
	if (salesDelete.error || usageDelete.error) return;
	await supabase.from("daily_sessions").delete().in("id", sessionIds).eq("is_closed", true);
}
function DailySalesProvider({ children }) {
	const { ingredients, products, refresh: refreshMenu } = useMenu();
	const [activeSession, setActiveSession] = (0, import_react.useState)(null);
	const [itemSales, setItemSales] = (0, import_react.useState)([]);
	const [ingredientUsage, setIngredientUsage] = (0, import_react.useState)({});
	const [history, setHistory] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refresh = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		const activeDate = today();
		const { data: sessionData, error: sessionError } = await supabase.from("daily_sessions").select("id, business_date, total_revenue, total_items_sold, total_sales_entries").eq("business_date", activeDate).eq("is_closed", false).maybeSingle();
		if (sessionError) {
			setError(sessionError.message);
			setLoading(false);
			return;
		}
		const session = sessionData;
		setActiveSession(session);
		if (session) {
			const [salesResult, usageResult] = await Promise.all([supabase.from("daily_item_sales").select("menu_item_id, item_name_ar, item_name_en, category_id, unit_price, quantity_sold, revenue").eq("session_id", session.id), supabase.from("daily_ingredient_usage").select("ingredient_id, quantity_used").eq("session_id", session.id)]);
			if (salesResult.error || usageResult.error) setError(salesResult.error?.message ?? usageResult.error?.message ?? "Unable to load today’s sales.");
			setItemSales((salesResult.data ?? []).map((item) => ({
				productId: item.menu_item_id,
				nameAr: item.item_name_ar,
				nameEn: item.item_name_en,
				categoryId: products.find((product) => product.id === item.menu_item_id)?.categoryId ?? item.category_id ?? "",
				quantity: Number(item.quantity_sold),
				unitPrice: Number(item.unit_price),
				revenue: Number(item.revenue)
			})));
			setIngredientUsage(Object.fromEntries((usageResult.data ?? []).map((usage) => [usage.ingredient_id, Number(usage.quantity_used)])));
		} else {
			setItemSales([]);
			setIngredientUsage({});
		}
		await purgeLegacyHistory();
		const { data: historyData, error: historyError } = await supabase.from("daily_sessions").select("id, business_date, closed_at, total_revenue, total_items_sold, total_sales_entries, closing_inventory, daily_item_sales(menu_item_id, item_name_ar, item_name_en, category_id, unit_price, quantity_sold, revenue), daily_ingredient_usage(ingredient_id, quantity_used)").eq("is_closed", true).gte("business_date", HISTORY_START_DATE).order("business_date", { ascending: false });
		if (historyError) setError(historyError.message);
		setHistory((historyData ?? []).map((report) => {
			const reportItems = (report.daily_item_sales ?? []).map((item) => ({
				productId: item.menu_item_id,
				nameAr: item.item_name_ar,
				nameEn: item.item_name_en,
				categoryId: products.find((product) => product.id === item.menu_item_id)?.categoryId ?? item.category_id ?? "",
				quantity: Number(item.quantity_sold),
				unitPrice: Number(item.unit_price),
				revenue: Number(item.revenue)
			}));
			const reportUsage = Object.fromEntries((report.daily_ingredient_usage ?? []).map((usage) => [usage.ingredient_id, Number(usage.quantity_used)]));
			const bestSeller = [...reportItems].sort((a, b) => b.quantity - a.quantity)[0];
			return {
				id: report.id,
				date: report.business_date,
				closedAt: report.closed_at,
				totalRevenue: Number(report.total_revenue),
				totalItemsSold: Number(report.total_items_sold),
				salesEntries: Number(report.total_sales_entries),
				itemSales: reportItems,
				ingredientUsage: reportUsage,
				inventory: report.closing_inventory ?? {},
				...bestSeller ? { bestSellingProduct: bestSeller.nameEn } : {}
			};
		}));
		setLoading(false);
	}, [products]);
	(0, import_react.useEffect)(() => {
		refresh();
		const { data: listener } = supabase.auth.onAuthStateChange(() => {
			refresh();
		});
		return () => listener.subscription.unsubscribe();
	}, [refresh]);
	const sync = (0, import_react.useCallback)(async () => {
		await Promise.all([refresh(), refreshMenu()]);
	}, [refresh, refreshMenu]);
	const recordSale = (0, import_react.useCallback)(async (product) => {
		setError(null);
		const { error: rpcErr } = await supabase.rpc("record_sale_manual_inventory", {
			p_menu_item_id: product.id,
			p_delta: 1
		});
		if (rpcErr) {
			console.error("[recordSale RPC Error]:", rpcErr);
			setError(`تعذر تسجيل البيع: ${rpcErr.message}`);
			return {
				ok: false,
				ingredientId: ""
			};
		}
		await sync();
		return { ok: true };
	}, [sync]);
	const undoSale = (0, import_react.useCallback)(async (product) => {
		setError(null);
		const { error: rpcErr } = await supabase.rpc("record_sale_manual_inventory", {
			p_menu_item_id: product.id,
			p_delta: -1
		});
		if (rpcErr) {
			console.error("[undoSale RPC Error]:", rpcErr);
			setError(rpcErr.message);
			return false;
		}
		await sync();
		return true;
	}, [sync]);
	const updateStock = (0, import_react.useCallback)(async (ingredientId, amount) => {
		const safeAmount = Math.max(0, Number.isFinite(amount) ? amount : 0);
		const { error: updateError } = await supabase.from("ingredients").update({ available_quantity: safeAmount }).eq("id", ingredientId);
		if (updateError) setError(updateError.message);
		await sync();
	}, [sync]);
	const addStock = (0, import_react.useCallback)(async (ingredientId, amount) => {
		const currentQty = ingredients.find((item) => item.id === ingredientId)?.availableQuantity ?? 0;
		await updateStock(ingredientId, currentQty + amount);
	}, [ingredients, updateStock]);
	const resetAllStockToZero = (0, import_react.useCallback)(async () => {
		for (const ingredient of ingredients) {
			const { error: resetError } = await supabase.from("ingredients").update({ available_quantity: 0 }).eq("id", ingredient.id);
			if (resetError) setError(resetError.message);
		}
		await sync();
	}, [ingredients, sync]);
	const closeDay = (0, import_react.useCallback)(async () => {
		if (!activeSession) return null;
		const report = {
			id: activeSession.id,
			date: activeSession.business_date,
			closedAt: (/* @__PURE__ */ new Date()).toISOString(),
			totalRevenue: Number(activeSession.total_revenue),
			totalItemsSold: Number(activeSession.total_items_sold),
			salesEntries: Number(activeSession.total_sales_entries),
			itemSales,
			ingredientUsage,
			inventory: Object.fromEntries(ingredients.map((ingredient) => [ingredient.id, ingredient.availableQuantity])),
			...(() => {
				const bestSeller = [...itemSales].sort((a, b) => b.quantity - a.quantity)[0];
				return bestSeller ? { bestSellingProduct: bestSeller.nameEn } : {};
			})()
		};
		const { error: closeError } = await supabase.rpc("close_daily_session", { p_session_id: activeSession.id });
		if (closeError) {
			setError(closeError.message);
			return null;
		}
		await sync();
		return report;
	}, [
		activeSession,
		ingredientUsage,
		ingredients,
		itemSales,
		sync
	]);
	const quantities = (0, import_react.useMemo)(() => Object.fromEntries(itemSales.map((item) => [item.productId, item.quantity])), [itemSales]);
	const inventory = (0, import_react.useMemo)(() => Object.fromEntries(ingredients.map((ingredient) => [ingredient.id, ingredient.availableQuantity])), [ingredients]);
	const totalRevenue = activeSession ? Number(activeSession.total_revenue) : 0;
	const totalItemsSold = activeSession ? Number(activeSession.total_items_sold) : 0;
	const salesEntries = activeSession ? Number(activeSession.total_sales_entries) : 0;
	const value = (0, import_react.useMemo)(() => ({
		activeDate: activeSession?.business_date ?? today(),
		quantities,
		salesEntries,
		inventory,
		ingredients,
		history,
		itemSales,
		ingredientUsage,
		totalRevenue,
		totalItemsSold,
		loading,
		error,
		refresh,
		recordSale,
		undoSale,
		addStock,
		updateStock,
		resetAllStockToZero,
		closeDay
	}), [
		activeSession?.business_date,
		addStock,
		updateStock,
		resetAllStockToZero,
		closeDay,
		error,
		history,
		ingredientUsage,
		ingredients,
		inventory,
		itemSales,
		loading,
		quantities,
		recordSale,
		refresh,
		salesEntries,
		totalItemsSold,
		totalRevenue,
		undoSale
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailySalesContext.Provider, {
		value,
		children
	});
}
function useDailySales() {
	const context = (0, import_react.useContext)(DailySalesContext);
	if (!context) throw new Error("useDailySales must be used inside DailySalesProvider");
	return context;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/menu-CuZkimei.js
var $$splitComponentImporter$8 = () => import("./menu-DpjcqDML.mjs");
var validCategoryIds = /* @__PURE__ */ new Set(["all", ...publicMenuSections.map((section) => section.id)]);
var Route$9 = createFileRoute("/menu")({
	validateSearch: (search) => {
		const requested = typeof search.category === "string" ? search.category : "all";
		return { category: validCategoryIds.has(requested) ? requested : "all" };
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-OShokPxK.js
var $$splitComponentImporter$7 = () => import("./order-confirmed-BMGtsaCC.mjs");
var Route$8 = createFileRoute("/order-confirmed")({
	beforeLoad: () => {
		throw redirect({
			to: "/menu",
			search: { category: "all" }
		});
	},
	validateSearch: (search) => ({ order: typeof search.order === "string" ? search.order : "" }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/track-order-C7DPg5gt.js
var $$splitComponentImporter$6 = () => import("./track-order-oY8lUAgw.mjs");
var Route$7 = createFileRoute("/track-order")({
	beforeLoad: () => {
		throw redirect({
			to: "/menu",
			search: { category: "all" }
		});
	},
	validateSearch: (search) => ({ order: typeof search.order === "string" ? search.order : "" }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-C5SONcax.js
var router_C5SONcax_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function ProductSheet({ product, onClose }) {
	const { L } = useLang();
	const { add, setOpen } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [chosen, setChosen] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setQty(1);
		setChosen([]);
		setNote("");
	}, [product?.id]);
	(0, import_react.useEffect)(() => {
		if (!product) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [product, onClose]);
	const extras = (0, import_react.useMemo)(() => (product?.extras ?? []).filter((e) => chosen.includes(e.id)), [product, chosen]);
	if (!product) return null;
	const unit = product.price - (product.discount ?? 0) + extras.reduce((s, e) => s + e.price, 0);
	const submit = () => {
		add({
			product,
			qty,
			extras,
			...note.trim() ? { note: note.trim() } : {}
		});
		toast.success(L("انضاف لطلبك", "Added to your order"), { description: L(product.nameAr, product.nameEn) });
		onClose();
		setTimeout(() => setOpen(true), 250);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[90] flex items-end justify-center sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": L("إغلاق", "Close"),
			onClick: onClose,
			className: "absolute inset-0 bg-ink/85 backdrop-blur-md animate-in fade-in duration-500"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex max-h-[calc(100dvh-env(safe-area-inset-top))] w-full flex-col overflow-hidden rounded-t-2xl border border-gold/25 bg-[color:var(--ink)] shadow-[var(--shadow-lux)] sm:max-h-[88vh] sm:max-w-4xl sm:flex-row sm:rounded-none",
			style: { animation: "sheet-up .6s cubic-bezier(0.16,1,0.3,1) both" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center border border-gold/30 bg-ink/70 text-bone backdrop-blur transition-colors hover:border-gold hover:text-gold",
					"aria-label": L("إغلاق", "Close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-48 shrink-0 sm:h-auto sm:w-[45%]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
						src: product.image,
						alt: L(product.nameAr, product.nameEn),
						className: "h-full w-full",
						zoom: false,
						eager: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-24 veil sm:hidden" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 pb-5 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: L(product.nameAr, product.nameEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-2xl text-bone sm:text-3xl",
							children: L(product.nameAr, product.nameEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-px w-14 bg-gold/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: L(product.descAr, product.descEn)
						}),
						product.extras?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.2em] text-gold/90",
								children: L("إضافات اختيارية", "OPTIONAL EXTRAS")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2",
								children: product.extras.map((e) => {
									const on = chosen.includes(e.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setChosen((prev) => on ? prev.filter((x) => x !== e.id) : [...prev, e.id]),
										className: cn("flex items-center justify-between border px-4 py-3 text-sm transition-all duration-400", on ? "border-gold/70 bg-gold/10 text-gold-soft" : "border-border bg-charcoal/60 text-bone/80 hover:border-gold/40"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L(e.nameAr, e.nameEn) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs",
											children: ["+ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: e.price })]
										})]
									}, e.id);
								})
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.2em] text-gold/90",
								children: L("ملاحظات", "NOTES")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (ev) => setNote(ev.target.value),
								rows: 2,
								placeholder: L("مثلاً: بدون بصل، شطة على جنب", "e.g. no onion, chili aside"),
								className: "mt-3 w-full resize-none border border-border bg-charcoal/60 px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold/60"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky bottom-0 -mx-4 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border bg-ink/95 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:static sm:mx-0 sm:border-t sm:bg-transparent sm:p-0 sm:pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center border border-gold/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										className: "grid h-11 w-11 place-items-center text-bone transition-colors hover:text-gold",
										"aria-label": "-",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-center text-lg tabular-nums text-bone",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.min(30, q + 1)),
										className: "grid h-11 w-11 place-items-center text-bone transition-colors hover:text-gold",
										"aria-label": "+",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
								size: "lg",
								disabled: !product.available,
								onClick: submit,
								className: "flex-1 min-w-[200px]",
								children: product.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									L("أضف للطلب", "Add to order"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-1 opacity-40",
										children: "•"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: unit * qty })
								] }) : L("غير متوفر حاليًا", "Unavailable")
							})]
						})
					]
				})
			]
		})]
	});
}
var C = (0, import_react.createContext)(null);
function ProductSheetProvider({ children }) {
	const [active, setActive] = (0, import_react.useState)(null);
	const openProduct = (0, import_react.useCallback)((p) => setActive(p), []);
	const value = (0, import_react.useMemo)(() => ({ openProduct }), [openProduct]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(C.Provider, {
		value,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSheet, {
			product: active,
			onClose: () => setActive(null)
		})]
	});
}
function MobileBottomNav() {
	const { L } = useLang();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	if (pathname.startsWith("/admin")) return null;
	const itemClass = (active) => cn("relative flex min-h-12 flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-[var(--control-radius)] px-1 text-[0.61rem] font-medium transition-[background-color,color] duration-200 ease-out active:bg-gold/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-soft/70 motion-reduce:transition-none", active ? "bg-gold/[.09] text-gold-soft" : "text-bone/58 hover:bg-gold/[.05] hover:text-bone/85");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": L("التنقل الرئيسي", "Main navigation"),
		className: "fixed inset-x-0 bottom-0 z-[75] border-t border-gold/20 bg-ink/[.96] px-2 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,.24)] backdrop-blur-xl md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-md items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: itemClass(pathname === "/"),
					"aria-current": pathname === "/" ? "page" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
						"aria-hidden": "true",
						className: "h-[19px] w-[19px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("الرئيسية", "Home") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: itemClass(pathname === "/menu"),
					"aria-current": pathname === "/menu" ? "page" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, {
						"aria-hidden": "true",
						className: "h-[19px] w-[19px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("المنيو", "Menu") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/order-now",
					className: itemClass(pathname === "/order-now"),
					"aria-current": pathname === "/order-now" ? "page" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
						"aria-hidden": "true",
						className: "h-[19px] w-[19px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("اطلب", "Order") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					hash: "location",
					className: itemClass(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"aria-hidden": "true",
						className: "h-[19px] w-[19px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("موقعنا", "Location") })]
				})
			]
		})
	});
}
var kamal_default = "/assets/kamal-BDgJ7O-K.jpg";
var styles_default = "/assets/styles-yOE4Ebqj.css";
function NotFoundComponent() {
	const { L } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: L("الصفحة غير موجودة", "Page not found")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: L("الصفحة التي تبحث عنها غير موجودة أو تم نقلها.", "The page you're looking for doesn't exist or has been moved.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: L("العودة للرئيسية", "Go home")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { L } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: L("تعذر تحميل هذه الصفحة", "This page didn't load")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: L("حدث خطأ من جهتنا. يمكنك تحديث الصفحة أو العودة للرئيسية.", "Something went wrong on our end. You can try refreshing or head back home.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: L("حاول مرة أخرى", "Try again")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: L("العودة للرئيسية", "Go home")
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "مطعم الكمال | فطور شعبي في الرصيفة" },
			{
				name: "description",
				content: "مطعم الكمال في الرصيفة: حمص، فول، فلافل، ساندويشات ومشروبات."
			},
			{
				name: "author",
				content: "Al Kamal Restaurant"
			},
			{
				property: "og:title",
				content: "مطعم الكمال"
			},
			{
				property: "og:description",
				content: "فطور شعبي في الرصيفة: حمص، فول، فلافل وساندويشات."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#15120f"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "مطعم الكمال"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg?v=2",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico?v=2"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.svg?v=2"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest?v=2"
			},
			{
				rel: "apple-touch-icon",
				href: kamal_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangProvider, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSheetProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailySalesProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileBottomNav, {})] }) }) }) }) })
	});
}
var $$splitComponentImporter$5 = () => import("./routes-NcphJV5I.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin-D0O9iZYn.mjs");
var Route$4 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./checkout-B-rew6Se.mjs");
var Route$3 = createFileRoute("/checkout")({
	beforeLoad: () => {
		throw redirect({
			to: "/menu",
			search: { category: "all" }
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./order-now-BOmHTlag.mjs");
var Route$2 = createFileRoute("/order-now")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./daily-sales-CSlWDIdh.mjs");
var Route$1 = createFileRoute("/admin/daily-sales")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./storage-DzTHqeoz.mjs");
var Route = createFileRoute("/admin/storage")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$4.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var CheckoutRoute = Route$3.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$6
});
var MenuRoute = Route$9.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => Route$6
});
var OrderConfirmedRoute = Route$8.update({
	id: "/order-confirmed",
	path: "/order-confirmed",
	getParentRoute: () => Route$6
});
var OrderNowRoute = Route$2.update({
	id: "/order-now",
	path: "/order-now",
	getParentRoute: () => Route$6
});
var TrackOrderRoute = Route$7.update({
	id: "/track-order",
	path: "/track-order",
	getParentRoute: () => Route$6
});
var AdminRouteChildren = {
	AdminDailySalesRoute: Route$1.update({
		id: "/daily-sales",
		path: "/daily-sales",
		getParentRoute: () => AdminRoute
	}),
	AdminStorageRoute: Route.update({
		id: "/storage",
		path: "/storage",
		getParentRoute: () => AdminRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CheckoutRoute,
	MenuRoute,
	OrderConfirmedRoute,
	OrderNowRoute,
	TrackOrderRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useDailySales as a, Price as c, getRouter, Route$9 as i, FoodImage as l, Route$7 as n, GoldButton as o, Route$8 as r, useCart as s, router_C5SONcax_exports as t };
