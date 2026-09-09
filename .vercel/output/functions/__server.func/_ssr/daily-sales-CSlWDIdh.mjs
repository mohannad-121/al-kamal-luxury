import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { n as useMenu, r as websiteMenuCategories } from "./use-menu-Bfna45r-.mjs";
import { B as ChevronDown, E as LoaderCircle, M as History, _ as Package, d as ReceiptText, m as Plus, n as Wallet, s as Search, y as Minus } from "../_libs/lucide-react.mjs";
import { t as AdminHeader } from "./AdminHeader-BK-QHgXO.mjs";
import { a as useDailySales, c as Price, l as FoodImage } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-sales-CSlWDIdh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatAmount(value, unit, lang) {
	const number = new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", { maximumFractionDigits: 1 }).format(value);
	const units = lang === "ar" ? {
		g: "غ",
		ml: "مل",
		piece: "قطعة",
		kg: "كغ",
		l: "لتر"
	} : {
		g: "g",
		ml: "ml",
		piece: "pieces",
		kg: "kg",
		l: "L"
	};
	if (unit === "g" && value >= 1e3) return `${new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", { maximumFractionDigits: 1 }).format(value / 1e3)} ${units.kg}`;
	if (unit === "ml" && value >= 1e3) return `${new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-US", { maximumFractionDigits: 1 }).format(value / 1e3)} ${units.l}`;
	return `${number} ${units[unit]}`;
}
function todayLabel(date, lang) {
	return new Intl.DateTimeFormat(lang === "ar" ? "ar-JO" : "en-US", {
		dateStyle: "full",
		timeZone: "Asia/Amman"
	}).format(/* @__PURE__ */ new Date(`${date}T12:00:00`));
}
function DailySales() {
	const { L, lang } = useLang();
	const { products } = useMenu();
	const { activeDate, quantities, salesEntries, history, totalRevenue, totalItemsSold, recordSale, undoSale, closeDay, ingredients, error: databaseError } = useDailySales();
	const [categoryId, setCategoryId] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [stockMessage, setStockMessage] = (0, import_react.useState)("");
	const [isConfirmingClose, setIsConfirmingClose] = (0, import_react.useState)(false);
	const [pendingSaleId, setPendingSaleId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (databaseError) setStockMessage(databaseError);
	}, [databaseError]);
	const activeCategories = websiteMenuCategories.filter((category) => category.active);
	const query = search.trim().toLocaleLowerCase();
	const visibleProducts = products.filter((product) => {
		const matchesCategory = categoryId === "all" || product.categoryId === categoryId;
		const matchesSearch = !query || product.nameAr.toLocaleLowerCase().includes(query) || product.nameEn.toLocaleLowerCase().includes(query);
		return matchesCategory && matchesSearch;
	});
	const sell = async (product) => {
		setPendingSaleId(product.id);
		try {
			if (!(await recordSale(product)).ok) {
				setStockMessage(L("تعذر تسجيل البيع. يرجى المحاولة مرة أخرى.", "Sale not recorded. Please try again."));
				return;
			}
			setStockMessage("");
		} finally {
			setPendingSaleId(null);
		}
	};
	const removeSale = async (product) => {
		setPendingSaleId(product.id);
		try {
			if (await undoSale(product)) setStockMessage("");
		} finally {
			setPendingSaleId(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-ink pb-12 text-bone",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHeader, { page: "daily-sales" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: L("مبيعات اليوم", "TODAY'S SALES")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl text-bone sm:text-4xl",
								children: L("الأداء اليومي", "Daily performance")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: todayLabel(activeDate, lang)
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setIsConfirmingClose(true),
							className: "inline-flex min-h-11 items-center gap-2 border border-gold/45 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, { className: "h-4 w-4" }), L("إغلاق اليوم", "End day / Close day")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {}),
								label: L("إيراد اليوم", "Today's revenue"),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: totalRevenue }),
								accent: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {}),
								label: L("إجمالي القطع", "Total items sold"),
								value: totalItemsSold
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, {}),
								label: L("عمليات البيع", "Sales entries"),
								value: salesEntries
							})
						]
					}),
					stockMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between gap-3 border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stockMessage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStockMessage(""),
							className: "text-red-100/70 hover:text-red-100",
							children: "×"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: L("سجل البيع", "ONE-TAP SALES")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-2xl text-bone",
									children: L("سجل المبيعات", "Record a sale")
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex h-11 min-w-[min(100%,18rem)] items-center gap-2 border border-gold/25 bg-charcoal/50 px-3 text-bone/70 focus-within:border-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: search,
										onChange: (event) => setSearch(event.target.value),
										placeholder: L("ابحث عن صنف", "Search menu items"),
										className: "min-w-0 flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone/35"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2 overflow-x-auto pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterButton, {
									active: categoryId === "all",
									onClick: () => setCategoryId("all"),
									children: L("الكل", "All")
								}), activeCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterButton, {
									active: categoryId === category.id,
									onClick: () => setCategoryId(category.id),
									children: L(category.nameAr, category.nameEn)
								}, category.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
								children: visibleProducts.map((product) => {
									const category = websiteMenuCategories.find((item) => item.id === product.categoryId);
									const quantity = quantities[product.id] ?? 0;
									const unitPrice = product.price - (product.discount ?? 0);
									product.recipe?.length;
									const canSell = product.available;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "overflow-hidden border border-gold/20 bg-charcoal/45",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
											src: product.image,
											alt: L(product.nameAr, product.nameEn),
											className: "aspect-[16/8] w-full",
											zoom: false
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[.62rem] tracking-[.14em] text-gold",
															children: category ? L(category.nameAr, category.nameEn) : product.categoryId
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "mt-1 truncate font-display text-xl text-bone",
															children: L(product.nameAr, product.nameEn)
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "shrink-0 text-gold",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: unitPrice })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 grid grid-cols-2 gap-2 border-y border-gold/10 py-3 text-sm",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-bone/55",
															children: L("الكمية", "Sold")
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-right font-medium text-bone",
															children: quantity
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-bone/55",
															children: L("الإيراد", "Revenue")
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-right text-gold",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: quantity * unitPrice })
														})
													]
												}),
												!product.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-xs text-amber-200",
													children: L("هذا الصنف غير متوفر حالياً.", "This item is currently unavailable.")
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => void removeSale(product),
														disabled: !quantity || pendingSaleId === product.id,
														"aria-busy": pendingSaleId === product.id,
														"aria-label": L(`إزالة ${product.nameAr}`, `Remove ${product.nameEn}`),
														className: "grid min-h-14 place-items-center border border-gold/25 text-gold transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-35",
														children: pendingSaleId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-5 w-5" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => void sell(product),
														disabled: !canSell || pendingSaleId === product.id,
														className: "inline-flex min-h-14 items-center justify-center gap-2 bg-gold px-4 text-base font-semibold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:bg-gold/35",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" }),
															" ",
															L("تسجيل بيع", "Add sale")
														]
													})]
												})
											]
										})]
									}, product.id);
								})
							}),
							!visibleProducts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 text-center text-sm text-muted-foreground",
								children: L("لا توجد أصناف مطابقة.", "No matching menu items.")
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 border border-gold/20 bg-charcoal/35",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-b border-gold/15 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: L("تقارير محفوظة", "DAILY HISTORY")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl text-bone",
								children: L("سجل الأيام", "Previous days")
							})] })]
						}), history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-gold/10",
							children: history.map((report) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportRow, {
								report,
								ingredients
							}, report.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-8 text-center text-sm text-muted-foreground",
							children: L("لا توجد تقارير مغلقة بعد.", "No closed-day reports yet.")
						})]
					})
				]
			}),
			isConfirmingClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "close-day-title",
					className: "w-full max-w-md border border-gold/35 bg-charcoal p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: L("تأكيد", "CONFIRM")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "close-day-title",
							className: "mt-2 font-display text-3xl text-bone",
							children: L("إغلاق اليوم؟", "Close this day?")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-bone/65",
							children: L("سيتم حفظ التقرير والمخزون المتبقي، ثم يبدأ سجل مبيعات جديد. لا يمكن حذف التقرير من هنا.", "The report and remaining inventory will be saved, then a new sales record will begin. Previous reports stay available.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsConfirmingClose(false),
								className: "min-h-11 border border-gold/25 text-sm text-bone/75 hover:border-gold",
								children: L("إلغاء", "Cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									closeDay().then((report) => {
										if (report) setIsConfirmingClose(false);
									});
								},
								className: "min-h-11 bg-gold px-4 text-sm font-medium text-ink hover:bg-gold-soft",
								children: L("حفظ وإغلاق", "Save & close")
							})]
						})
					]
				})
			}) : null
		]
	});
}
function SummaryCard({ icon, label, value, accent, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `border p-4 ${accent ? "border-gold/45 bg-gold/10" : "border-gold/20 bg-charcoal/35"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-gold",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[.62rem] tracking-[.12em]",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-4 font-display text-bone ${compact ? "text-xl" : "text-3xl"}`,
			children: value
		})]
	});
}
function FilterButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `shrink-0 border px-3 py-2 text-sm transition-colors ${active ? "border-gold bg-gold text-ink" : "border-gold/25 text-bone/70 hover:border-gold hover:text-gold"}`,
		children
	});
}
function ReportRow({ report, ingredients }) {
	const { L, lang } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex cursor-pointer list-none items-center justify-between gap-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-bone",
				children: todayLabel(report.date, lang)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-bone/50",
				children: [
					report.totalItemsSold,
					" ",
					L("قطعة", "items"),
					" ·",
					" ",
					report.bestSellingProduct ? L(report.itemSales.find((item) => item.nameEn === report.bestSellingProduct)?.nameAr ?? report.bestSellingProduct, report.bestSellingProduct) : L("لا توجد مبيعات", "No sales")
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-gold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: report.totalRevenue }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 transition-transform group-open:rotate-180" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 border-t border-gold/10 p-5 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[.12em] text-gold",
				children: L("مبيعات الأصناف", "ITEM SALES")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2 text-sm",
				children: report.itemSales.length ? report.itemSales.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-3 text-bone/75",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						L(item.nameAr, item.nameEn),
						" × ",
						item.quantity
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: item.revenue }) })]
				}, item.productId)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: L("لم تُسجَّل أي مبيعات.", "No sales were recorded.")
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[.12em] text-gold",
				children: L("استخدام المكونات", "INGREDIENT USAGE")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2 text-sm",
				children: Object.entries(report.ingredientUsage).length ? Object.entries(report.ingredientUsage).map(([id, amount]) => {
					const ingredient = ingredients.find((item) => item.id === id);
					return ingredient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 text-bone/75",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L(ingredient.nameAr, ingredient.nameEn) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatAmount(amount, ingredient.unit, lang) })]
					}, id) : null;
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: L("لم تُستخدم أي مكونات.", "No ingredients were used.")
				})
			})] })]
		})]
	});
}
//#endregion
export { DailySales as component };
