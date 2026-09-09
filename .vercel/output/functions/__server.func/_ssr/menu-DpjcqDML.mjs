import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { i as publicMenuSections, n as getMenuItemPhoto, r as publicMenuOptionCount } from "./supabase-BvpBKmRv.mjs";
import { n as useMenu } from "./use-menu-Bfna45r-.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as LayoutGrid, c as SearchX, q as ArrowLeft, s as Search, t as X } from "../_libs/lucide-react.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
import { t as Reveal } from "./Reveal-BRYlWpEY.mjs";
import { c as Price, i as Route, l as FoodImage } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-DpjcqDML.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function optionAvailabilityKey(categoryId, itemNameAr, optionNameAr) {
	return `${categoryId}::${itemNameAr} — ${optionNameAr}`;
}
/** Editorial section image followed by a compact, scannable price list. */
function MenuSectionCard({ section, className, eager = false, availabilityByOptionKey }) {
	const { lang, L } = useLang();
	const generatedId = (0, import_react.useId)().replaceAll(":", "");
	const headingId = `menu-section-${section.id}-${generatedId}`;
	const summaryId = `${headingId}-summary`;
	const sectionName = L(section.nameAr, section.nameEn);
	const [openItemId, setOpenItemId] = (0, import_react.useState)(null);
	const optionCount = section.items.reduce((total, item) => total + item.options.length, 0);
	const quantityNumber = (0, import_react.useMemo)(() => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"), [lang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: `menu-${section.id}`,
		dir: lang === "ar" ? "rtl" : "ltr",
		"aria-labelledby": headingId,
		"aria-describedby": summaryId,
		className: cn("group/card relative isolate scroll-mt-32 overflow-hidden border border-gold/20 bg-ink/90 shadow-[0_28px_80px_-58px_rgba(0,0,0,.9)] transition-[border-color,box-shadow] duration-500 hover:border-gold/35 hover:shadow-[0_32px_88px_-56px_oklch(0.716_0.107_78.5/.28)] motion-reduce:transition-none", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative h-[15.5rem] overflow-hidden border-b border-gold/15 sm:h-[18rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
						src: section.image,
						alt: L(`صورة قسم ${section.nameAr}`, `${section.nameEn} section`),
						eager,
						className: "absolute inset-0 h-full w-full",
						imgClassName: "group-hover/card:scale-[1.04] group-hover/card:saturate-[1.04]",
						imgStyle: { objectPosition: section.imagePosition },
						zoom: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.96)_0%,oklch(0.12_0.004_60/.68)_34%,oklch(0.12_0.004_60/.1)_74%,oklch(0.12_0.004_60/.24)_100%)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: headingId,
							className: "font-display text-[2rem] leading-[1.25] text-bone drop-shadow-[0_3px_14px_rgba(0,0,0,.7)] sm:text-[2.5rem]",
							children: sectionName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: summaryId,
							className: "mt-2 text-xs text-bone/70 sm:text-sm",
							children: L(`الأصناف: ${quantityNumber.format(section.items.length)} · الخيارات: ${quantityNumber.format(optionCount)}`, `${quantityNumber.format(section.items.length)} items · ${quantityNumber.format(optionCount)} options`)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				"aria-label": L(`أصناف ${section.nameAr}`, `${section.nameEn} items`),
				className: cn("grid gap-px bg-gold/10 p-px", section.items.length > 3 && "md:grid-cols-2"),
				children: section.items.map((item) => {
					const isOpen = openItemId === item.id;
					const image = getMenuItemPhoto(section.id, item.nameAr, item.nameEn, section.image);
					const itemAvailable = item.options.every((option) => availabilityByOptionKey?.get(optionAvailabilityKey(section.id, item.nameAr, option.nameAr)) ?? true);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("group/dish relative bg-[oklch(0.165_0.005_60)] px-4 py-5 transition-colors duration-300 hover:bg-[oklch(0.185_0.007_60)] motion-reduce:transition-none sm:px-5 sm:py-6", item.featured && "bg-[linear-gradient(145deg,oklch(0.19_0.009_70),oklch(0.155_0.004_60))]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "absolute inset-y-0 start-0 w-px origin-center scale-y-0 bg-gold/80 transition-transform duration-300 group-hover/dish:scale-y-100 motion-reduce:transition-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setOpenItemId((current) => current === item.id ? null : item.id),
								"aria-expanded": isOpen,
								className: "flex w-full items-center gap-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
										src: image,
										alt: L(item.nameAr, item.nameEn),
										className: "h-16 w-16 shrink-0 border border-gold/15",
										zoom: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-display text-[1.05rem] leading-7 text-cream sm:text-lg",
											children: L(item.nameAr, item.nameEn)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-xs text-gold/75",
											children: isOpen ? L("إخفاء التفاصيل", "Hide details") : L("اضغط لعرض التفاصيل", "Tap to view details")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("shrink-0 border px-2 py-1 text-[0.6rem] font-medium tracking-[0.1em]", itemAvailable ? "border-emerald-300/35 text-emerald-200" : "border-bone/25 text-bone/70"),
										children: itemAvailable ? L("متوفر", "AVAILABLE") : L("غير متوفر", "NOT AVAILABLE")
									}),
									item.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex shrink-0 items-center gap-1.5 text-[0.6rem] font-medium text-gold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "h-1 w-1 rotate-45 bg-gold"
										}), L("مميّز", "Featured")]
									}) : null
								]
							}),
							isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"aria-label": L(`خيارات ${item.nameAr}`, `${item.nameEn} options`),
								className: "mt-3 border-t border-bone/[0.07]",
								children: item.options.map((option) => {
									const available = availabilityByOptionKey?.get(optionAvailabilityKey(section.id, item.nameAr, option.nameAr)) ?? true;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "group/option grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-bone/[0.055] py-2.5 last:border-b-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 text-sm leading-6 text-bone/75 transition-colors duration-300 group-hover/option:text-bone motion-reduce:transition-none",
											children: L(option.nameAr, option.nameEn)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex min-w-[7.5rem] items-center justify-end gap-2 border-s border-gold/10 ps-3 text-sm text-gold transition-colors duration-300 group-hover/option:text-gold-soft motion-reduce:transition-none",
											children: [option.price !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, {
												value: option.price,
												className: "font-semibold"
											}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("border px-2 py-1 text-[0.6rem] font-medium tracking-[0.1em]", available ? "border-emerald-300/35 text-emerald-200" : "border-bone/25 text-bone/70"),
												children: available ? L("متوفر", "AVAILABLE") : L("غير متوفر", "NOT AVAILABLE")
											})]
										})]
									}, option.id);
								})
							}) : null
						]
					}, item.id);
				})
			})
		]
	});
}
function includesQuery(value, query) {
	return value.toLocaleLowerCase().includes(query);
}
function Menu() {
	const { L, lang } = useLang();
	const { products } = useMenu();
	const { category: initialCategory } = Route.useSearch();
	const [active, setActive] = (0, import_react.useState)(initialCategory);
	const [term, setTerm] = (0, import_react.useState)("");
	const visibleSections = (0, import_react.useMemo)(() => {
		const query = term.trim().toLocaleLowerCase();
		return publicMenuSections.filter((section) => active === "all" || section.id === active).map((section) => {
			if (!query) return section;
			if (includesQuery(`${section.nameAr} ${section.nameEn}`, query)) return section;
			const items = section.items.filter((item) => includesQuery([
				item.nameAr,
				item.nameEn,
				...item.options.flatMap((option) => [option.nameAr, option.nameEn])
			].join(" "), query));
			return items.length ? {
				...section,
				items
			} : null;
		}).filter((section) => section !== null);
	}, [active, term]);
	const itemCount = visibleSections.reduce((total, section) => total + section.items.length, 0);
	const optionCount = visibleSections.reduce((total, section) => total + section.items.reduce((subtotal, item) => subtotal + item.options.length, 0), 0);
	const number = (0, import_react.useMemo)(() => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"), [lang]);
	const availabilityByOptionKey = (0, import_react.useMemo)(() => new Map(products.map((product) => [`${product.categoryId}::${product.nameAr}`, product.available])), [products]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate min-h-[390px] overflow-hidden border-b border-gold/15 bg-ink pt-[calc(4rem+env(safe-area-inset-top))] sm:min-h-[470px] sm:pt-[76px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
						src: "/images/levantine-bowls-premium.jpg",
						alt: L("أطباق الفطور الشعبي في مطعم الكمال", "Al Kamal breakfast dishes"),
						eager: true,
						zoom: false,
						className: "absolute inset-0 h-full w-full",
						imgClassName: "object-[48%_54%]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.004_60/.88),oklch(0.12_0.004_60/.66)_48%,oklch(0.12_0.004_60/.34))] rtl:bg-[linear-gradient(270deg,oklch(0.12_0.004_60/.9),oklch(0.12_0.004_60/.68)_48%,oklch(0.12_0.004_60/.34))]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 [background:radial-gradient(circle_at_75%_30%,oklch(0.716_0.107_78.5/.16),transparent_30rem)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-44 veil" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto flex min-h-[326px] max-w-[1360px] items-end px-5 pb-10 sm:min-h-[394px] sm:px-8 sm:pb-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "hero-enter hero-enter-1 text-5xl leading-[1.2] text-bone sm:text-7xl",
									children: L("المنيو", "Menu")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hero-enter hero-enter-2 mt-4 max-w-2xl text-base leading-8 text-bone/75 sm:text-lg",
									children: L("كل الأصناف مع الأحجام والأسعار.", "All items with sizes and prices.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hero-enter hero-enter-3 mt-6 flex w-fit max-w-full overflow-hidden border border-gold/20 bg-ink/55 text-xs text-bone/70 backdrop-blur-xl sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-4 py-3",
											children: [
												number.format(publicMenuSections.length),
												" ",
												L("أقسام", "sections")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "border-s border-gold/15 px-4 py-3",
											children: [
												number.format(publicMenuOptionCount),
												" ",
												L("خيارات", "options")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border-s border-gold/15 px-4 py-3 text-gold",
											children: L("بالدينار", "JOD")
										})
									]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-screen bg-charcoal px-4 pb-20 pt-5 sm:px-8 sm:pb-28 sm:pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_15%_10%,oklch(0.716_0.107_78.5/.08),transparent_30rem)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-[1360px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-[calc(4rem+env(safe-area-inset-top))] z-40 -mx-2 rounded-[1.6rem] border border-white/[.07] bg-[linear-gradient(135deg,oklch(0.17_0.006_55/.97),oklch(0.12_0.004_60/.96))] p-2.5 shadow-[0_28px_80px_-32px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl sm:top-[84px] sm:mx-0 sm:p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 xl:flex-row xl:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "group/search flex h-14 w-full items-center gap-3 rounded-2xl border border-white/[.08] bg-black/25 px-2.5 text-muted-foreground shadow-inner transition duration-300 focus-within:border-gold/55 focus-within:bg-black/40 focus-within:shadow-[0_0_0_4px_oklch(0.716_0.107_78.5/.08)] xl:w-[330px] xl:shrink-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[.08] text-gold transition duration-300 group-focus-within/search:scale-105 group-focus-within/search:border-gold/50 group-focus-within/search:bg-gold/[.14]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: term,
											onChange: (event) => setTerm(event.target.value),
											className: "h-full min-w-0 flex-1 bg-transparent text-base text-bone outline-none placeholder:text-muted-foreground sm:text-sm",
											placeholder: L("دوّر على صنف...", "Search the menu..."),
											"aria-label": L("البحث في المنيو", "Search the menu")
										}),
										term ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTerm(""),
											className: "grid h-9 w-9 place-items-center rounded-xl border border-transparent text-bone/55 transition hover:border-gold/25 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70",
											"aria-label": L("مسح البحث", "Clear search"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto py-0.5",
									role: "toolbar",
									"aria-label": L("تصفية أقسام المنيو", "Filter menu sections"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": active === "all",
										onClick: () => setActive("all"),
										className: `group/category relative flex min-h-12 shrink-0 items-center gap-2 overflow-hidden rounded-2xl border py-1.5 ps-1.5 pe-3.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/75 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${active === "all" ? "border-gold/75 bg-[linear-gradient(135deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_15px_32px_-18px_var(--gold)]" : "border-white/[.08] bg-white/[.025] text-bone/70 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/[.07] hover:text-bone"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-9 w-9 place-items-center rounded-xl border transition duration-300 ${active === "all" ? "border-ink/15 bg-ink/10" : "border-gold/20 bg-gold/[.08] text-gold group-hover/category:border-gold/45"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: L("الكل", "All")
										})]
									}), publicMenuSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": active === section.id,
										onClick: () => setActive(section.id),
										className: `group/category relative flex min-h-12 shrink-0 items-center gap-2 overflow-hidden rounded-2xl border py-1.5 ps-1.5 pe-3.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/75 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${active === section.id ? "border-gold/75 bg-[linear-gradient(135deg,var(--gold-soft),var(--gold))] text-ink shadow-[0_15px_32px_-18px_var(--gold)]" : "border-white/[.08] bg-white/[.025] text-bone/70 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/[.07] hover:text-bone"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `relative h-9 w-9 overflow-hidden rounded-xl border transition duration-300 ${active === section.id ? "border-ink/20 shadow-sm" : "border-gold/20 group-hover/category:border-gold/50"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: section.image,
												alt: "",
												"aria-hidden": "true",
												loading: "lazy",
												className: "h-full w-full object-cover transition duration-500 group-hover/category:scale-110 motion-reduce:transition-none",
												style: { objectPosition: section.imagePosition }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: L(section.nameAr, section.nameEn)
										})]
									}, section.id))]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[.06] pb-5 sm:mt-12 sm:pb-6",
							"aria-live": "polite",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl text-bone sm:text-3xl",
								children: active === "all" ? term ? L("نتائج البحث", "Search results") : L("كل الأصناف", "All items") : L(publicMenuSections.find((section) => section.id === active)?.nameAr ?? "المنيو", publicMenuSections.find((section) => section.id === active)?.nameEn ?? "Menu")
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-full border border-gold/15 bg-gold/[.05] px-4 py-2 text-xs text-bone/60 sm:text-sm",
								children: L(`الأصناف: ${number.format(itemCount)} · الخيارات: ${number.format(optionCount)}`, `${number.format(itemCount)} items · ${number.format(optionCount)} options`)
							})]
						}),
						visibleSections.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `mt-5 sm:mt-7 ${active === "all" && !term ? "columns-1 gap-7 lg:columns-2" : "mx-auto max-w-5xl"}`,
							children: visibleSections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: index % 4 * 70,
								className: "mb-5 break-inside-avoid sm:mb-7",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSectionCard, {
									section,
									eager: index < 2,
									availabilityByOptionKey
								})
							}, `${section.id}-${term}`))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							className: "mt-10 overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_50%_0%,oklch(0.716_0.107_78.5/.12),transparent_24rem),oklch(0.12_0.004_60/.72)] px-6 py-20 text-center shadow-[0_35px_90px_-55px_rgba(0,0,0,.95)] sm:py-28",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gold/[.08] shadow-[0_0_45px_-20px_var(--gold)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "h-6 w-6 text-gold" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-2xl text-bone sm:text-3xl",
									children: L("ما لقينا صنف بهالاسم", "We couldn't find that item")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground",
									children: L("جرّب كلمة ثانية أو ارجع لكل أقسام المنيو.", "Try another search or browse every menu section.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "luxury-cta mt-7",
									onClick: () => {
										setTerm("");
										setActive("all");
									},
									children: L("عرض المنيو كامل", "Show the full menu")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							className: "group relative mt-12 overflow-hidden rounded-[2rem] border border-gold/25 bg-ink shadow-[0_35px_90px_-48px_rgba(0,0,0,.95)] sm:mt-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
									src: "/images/falafel-wrap.jpg",
									alt: "",
									zoom: false,
									className: "absolute inset-y-0 end-0 hidden w-[48%] sm:block",
									imgClassName: "object-cover opacity-75 transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none",
									imgStyle: { objectPosition: "50% 56%" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.004_60)_48%,oklch(0.12_0.004_60/.82)_68%,transparent)] rtl:bg-[linear-gradient(270deg,oklch(0.12_0.004_60)_48%,oklch(0.12_0.004_60/.82)_68%,transparent)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -start-16 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative max-w-2xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "max-w-md font-display text-3xl leading-tight text-bone sm:text-4xl",
										children: L("كمّل طلبك على طلبات أو أشيائي.", "Complete your order on Talabat or MyThings.")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-md text-sm leading-7 text-bone/60",
										children: L("اختار الأصناف والأحجام اللي بدك إياها.", "Choose the items and sizes you want.")
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/order-now",
										className: "luxury-cta mt-7 w-full sm:w-auto",
										children: [L("اطلب الآن", "Order now"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 rtl:rotate-0 ltr:rotate-180" })]
									})]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Menu as component };
