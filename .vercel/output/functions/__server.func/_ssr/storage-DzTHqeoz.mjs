import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { R as CircleAlert, _ as Package, l as RotateCcw, m as Plus, s as Search, t as X, y as Minus } from "../_libs/lucide-react.mjs";
import { t as AdminHeader } from "./AdminHeader-BK-QHgXO.mjs";
import { a as useDailySales } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storage-DzTHqeoz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var breadIds = /* @__PURE__ */ new Set([
	"normal-bread",
	"kaak-bread",
	"tortilla-bread",
	"shrak-bread",
	"small-french-bread"
]);
var liquidIds = /* @__PURE__ */ new Set(["oil", "tahini"]);
function getCategory(id) {
	if (breadIds.has(id)) return "breads";
	if (liquidIds.has(id)) return "liquids";
	return "mains";
}
function getUnitLabel(unit, lang) {
	if (lang === "ar") switch (unit) {
		case "piece": return "قطعة";
		case "g": return "غرام";
		case "ml": return "مل";
		default: return unit ?? "قطعة";
	}
	switch (unit) {
		case "piece": return "pieces";
		case "g": return "g";
		case "ml": return "ml";
		default: return unit ?? "pcs";
	}
}
function getStep(unit) {
	return unit === "piece" ? 1 : 100;
}
function Storage() {
	const { L, lang } = useLang();
	const dailySales = useDailySales();
	const ingredients = dailySales?.ingredients ?? [];
	const inventory = dailySales?.inventory ?? {};
	const updateStock = dailySales?.updateStock;
	const resetAllStockToZero = dailySales?.resetAllStockToZero;
	const databaseError = dailySales?.error ?? null;
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [message, setMessage] = (0, import_react.useState)("");
	const [resetConfirmOpen, setResetConfirmOpen] = (0, import_react.useState)(false);
	const [savingId, setSavingId] = (0, import_react.useState)(null);
	const [inputState, setInputState] = (0, import_react.useState)({});
	const filteredIngredients = (0, import_react.useMemo)(() => {
		const query = searchQuery.trim().toLocaleLowerCase();
		return ingredients.filter((item) => {
			if (!item) return false;
			const category = getCategory(item.id);
			if (activeCategory !== "all" && category !== activeCategory) return false;
			if (!query) return true;
			return (item.nameAr ?? "").toLocaleLowerCase().includes(query) || (item.nameEn ?? "").toLocaleLowerCase().includes(query) || (item.id ?? "").toLocaleLowerCase().includes(query);
		});
	}, [
		activeCategory,
		ingredients,
		searchQuery
	]);
	const handleQtyChange = async (ingredientId, value) => {
		if (!updateStock) return;
		const safeQty = Math.max(0, Math.round(value));
		setSavingId(ingredientId);
		try {
			await updateStock(ingredientId, safeQty);
		} catch {
			setMessage(L("تعذر حفظ الكمية، يرجى المحاولة مرة أخرى.", "Unable to save quantity."));
		} finally {
			setSavingId(null);
		}
	};
	const handleStep = (ingredientId, currentQty, step) => {
		const nextQty = Math.max(0, currentQty + step);
		setInputState((prev) => ({
			...prev,
			[ingredientId]: String(nextQty)
		}));
		handleQtyChange(ingredientId, nextQty);
	};
	const handleResetAll = async () => {
		if (!resetAllStockToZero) return;
		setResetConfirmOpen(false);
		try {
			await resetAllStockToZero();
			setInputState({});
			setMessage(L("تم التصفير: جميع الكميات في المخزون أصبحت 0 الآن.", "Inventory reset: All item quantities are now 0."));
		} catch {
			setMessage(L("حدث خطأ أثناء تصفير المخزون.", "Error resetting inventory."));
		}
	};
	const totalItemsCount = ingredients.length;
	const inStockCount = ingredients.filter((item) => (inventory[item.id] ?? item.availableQuantity ?? 0) > 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-ink pb-16 text-bone",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, { page: "storage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1360px] px-4 py-6 sm:px-8 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 border-b border-gold/15 pb-6 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: L("المخزون اليدوي", "MANUAL INVENTORY")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-3xl text-bone sm:text-4xl",
							children: L("إدارة كميات المخزون", "Stock Management")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 max-w-2xl text-sm text-bone/70",
							children: L("تحكم مباشر وبسيط في كميات المخزون. أضف أو انقص أو أدخل الكمية الحالية يدوياً بدون أي خصم آلي.", "Direct and simple manual stock control. Add, subtract, or enter current stock manually with zero automatic deductions.")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setResetConfirmOpen(true),
							className: "inline-flex h-11 items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 text-xs font-medium text-red-200 transition hover:border-red-500 hover:bg-red-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), L("تصفير الكل (0)", "Reset All to 0")]
						})
					})]
				}),
				message || databaseError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message || databaseError })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMessage(""),
						className: "text-gold/70 hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}) : null,
				resetConfirmOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md rounded-2xl border border-gold/30 bg-charcoal p-6 shadow-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl text-bone",
								children: L("تأكيد تصفير المخزون؟", "Confirm Reset All Inventory?")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-bone/70",
								children: L("سيتم تغيير كمية جميع المواد والأخباز في المخزون لتصبح 0. يمكنك إدخال الكميات الجديدة يدوياً في أي وقت.", "This will reset all stock quantities to 0. You can enter new stock quantities manually anytime.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex justify-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setResetConfirmOpen(false),
									className: "rounded-xl border border-white/10 px-4 py-2 text-sm text-bone/80 hover:bg-white/5",
									children: L("إلغاء", "Cancel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void handleResetAll(),
									className: "rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700",
									children: L("تأكيد التصفير (0)", "Yes, Reset All to 0")
								})]
							})
						]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							{
								id: "all",
								labelAr: "الكل",
								labelEn: "All",
								count: totalItemsCount
							},
							{
								id: "breads",
								labelAr: "المخبوزات والخبز 🍞",
								labelEn: "Breads 🍞",
								count: ingredients.filter((i) => breadIds.has(i.id)).length
							},
							{
								id: "mains",
								labelAr: "المواد والأصناف 🥣",
								labelEn: "Ingredients 🥣",
								count: ingredients.filter((i) => !breadIds.has(i.id) && !liquidIds.has(i.id)).length
							},
							{
								id: "liquids",
								labelAr: "الزيوت والسوائل 🫗",
								labelEn: "Liquids 🫗",
								count: ingredients.filter((i) => liquidIds.has(i.id)).length
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveCategory(tab.id),
							className: `flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs font-medium transition ${activeCategory === tab.id ? "border-gold bg-gold/15 text-gold shadow-sm" : "border-white/10 bg-white/[0.02] text-bone/70 hover:border-gold/30 hover:text-bone"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.labelAr }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-ink/60 px-1.5 py-0.5 text-[0.65rem] text-gold",
								children: tab.count
							})]
						}, tab.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: L("بحث في المخزون...", "Search inventory..."),
								className: "h-10 w-full rounded-xl border border-white/10 bg-charcoal/70 ps-9 pe-8 text-xs text-bone outline-none transition focus:border-gold/50 focus:bg-charcoal"
							}),
							searchQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSearchQuery(""),
								className: "absolute end-3 top-1/2 -translate-y-1/2 text-bone/40 hover:text-bone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/15 bg-charcoal/30 px-4 py-3 text-xs text-bone/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [L("إجمالي المواد:", "Total items:"), " "] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-gold",
							children: totalItemsCount
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [L("مواد متوفرة بكتلة أكبر من 0:", "Items in stock (>0):"), " "] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-emerald-400",
							children: inStockCount
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [L("مواد بكتلة 0 (غير متوفرة):", "Items at 0:"), " "] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-amber-300",
							children: totalItemsCount - inStockCount
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: filteredIngredients.map((item) => {
						const currentQty = inventory[item.id] ?? item.availableQuantity ?? 0;
						const isSaving = savingId === item.id;
						const step = getStep(item.unit);
						const unitLabel = getUnitLabel(item.unit, lang);
						const isBread = breadIds.has(item.id);
						const inputValue = inputState[item.id] ?? String(currentQty);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `group relative flex flex-col justify-between rounded-2xl border p-4 transition duration-300 ${currentQty > 0 ? "border-gold/25 bg-charcoal/50 hover:border-gold/50" : "border-white/10 bg-charcoal/20 opacity-85 hover:border-white/20"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium text-gold",
									children: [isBread ? "🍞 " : "", unitLabel]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-lg text-bone",
									children: L(item.nameAr ?? item.id, item.nameEn ?? item.id)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${currentQty > 0 ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400" : "border border-amber-500/30 bg-amber-500/15 text-amber-300"}`,
										children: currentQty > 0 ? `${currentQty} ${unitLabel}` : L("غير متوفر (0)", "Out of stock (0)")
									})
								})]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: currentQty <= 0 || isSaving,
											onClick: () => handleStep(item.id, currentQty, -step),
											className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ink/80 text-bone shadow-inner transition hover:border-gold hover:bg-gold/15 hover:text-gold active:scale-95 disabled:pointer-events-none disabled:opacity-30",
											"aria-label": L(`أنقص ${item.nameAr}`, `Decrease ${item.nameEn}`),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 0,
												step,
												value: inputValue,
												onChange: (e) => {
													const valStr = e.target.value;
													setInputState((prev) => ({
														...prev,
														[item.id]: valStr
													}));
													const parsed = Number(valStr);
													if (Number.isFinite(parsed) && valStr.trim() !== "") handleQtyChange(item.id, parsed);
												},
												onBlur: () => {
													setInputState((prev) => ({
														...prev,
														[item.id]: String(currentQty)
													}));
												},
												className: "h-12 w-full rounded-xl border border-gold/30 bg-ink px-3 text-center font-display text-xl font-bold text-gold outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-[0.65rem] text-bone/40",
												children: unitLabel
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: isSaving,
											onClick: () => handleStep(item.id, currentQty, step),
											className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ink/80 text-bone shadow-inner transition hover:border-gold hover:bg-gold/15 hover:text-gold active:scale-95 disabled:pointer-events-none disabled:opacity-30",
											"aria-label": L(`أضف ${item.nameAr}`, `Increase ${item.nameEn}`),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: [
										{
											label: "+1",
											val: 1
										},
										{
											label: "+5",
											val: 5
										},
										{
											label: "+10",
											val: 10
										},
										{
											label: "+50",
											val: 50
										}
									].map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleStep(item.id, currentQty, preset.val),
										className: "flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-1 text-[0.7rem] font-medium text-bone/70 transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold",
										children: preset.label
									}, preset.label))
								})]
							})]
						}, item.id);
					})
				}),
				filteredIngredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 rounded-2xl border border-dashed border-white/10 p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto h-12 w-12 text-bone/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-bone/70",
						children: L("لم يتم العثور على أي صنف بهذا الاسم.", "No inventory items found.")
					})]
				}) : null
			]
		})]
	});
}
//#endregion
export { Storage as component };
