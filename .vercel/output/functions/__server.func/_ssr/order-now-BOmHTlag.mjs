import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { G as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as restaurant } from "./restaurant-CFBERA6Q.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-now-BOmHTlag.js
var import_jsx_runtime = require_jsx_runtime();
var talabat_default = "/assets/talabat-NKwqEkIS.png";
var mythings_default = "/assets/mythings-BL85roUC.jpg";
function OrderNow() {
	const { L } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-charcoal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-ink px-4 pb-12 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: L("اطلب أونلاين", "ORDER ONLINE")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl text-bone sm:mt-4 sm:text-6xl",
							children: L("اطلب من الكمال", "Order from Al Kamal")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-7 text-muted-foreground",
							children: L("اختر طلبات أو أشيائي للانتقال مباشرةً إلى صفحة المطعم وإتمام طلبك.", "Choose your preferred ordering platform to go directly to our restaurant page and complete your order.")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-10 sm:px-8 sm:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-5xl gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: restaurant.talabatUrl,
						target: "_blank",
						rel: "noreferrer",
						"aria-label": L("افتح صفحة مطعم الكمال على طلبات", "Open Al Kamal on Talabat"),
						className: "group flex min-h-64 flex-col items-center justify-center border border-gold/25 bg-ink p-8 text-center shadow-[var(--shadow-lux)] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal sm:min-h-72",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-24 w-52 items-center justify-center rounded-xl bg-white p-5 shadow-sm sm:h-28 sm:w-60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: talabat_default,
									alt: "Talabat",
									className: "max-h-full max-w-full object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-7 flex items-center gap-2 font-display text-2xl text-bone group-hover:text-gold",
								children: [L("افتح طلبات", "Open Talabat"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 max-w-md text-sm leading-6 text-muted-foreground",
								children: L("رابط المطعم على طلبات لا يعمل حاليًا وهو قيد الصيانة. ابحث عن «مطعم الكمال» على طلبات وستجدنا.", "Our restaurant link on Talabat is currently unavailable and under maintenance. Please search for “مطعم الكمال” on Talabat to find us.")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: restaurant.myThingsUrl,
						target: "_blank",
						rel: "noreferrer",
						"aria-label": L("افتح صفحة مطعم الكمال على أشيائي", "Open Al Kamal on MyThings"),
						className: "group flex min-h-64 flex-col items-center justify-center border border-gold/25 bg-ink p-8 text-center shadow-[var(--shadow-lux)] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal sm:min-h-72",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-24 w-52 items-center justify-center overflow-hidden rounded-xl bg-white p-3 shadow-sm sm:h-28 sm:w-60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mythings_default,
									alt: "MyThings",
									className: "max-h-full max-w-full object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-7 flex items-center gap-2 font-display text-2xl text-bone group-hover:text-gold",
								children: [L("اطلب عبر أشيائي", "Order via MyThings"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-sm text-muted-foreground",
								children: L("اضغط للانتقال إلى أشيائي", "Click to continue to MyThings")
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { OrderNow as component };
