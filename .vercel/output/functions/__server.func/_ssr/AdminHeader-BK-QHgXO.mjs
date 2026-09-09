import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as ArrowRight, O as Languages, _ as Package, n as Wallet, r as UtensilsCrossed } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminHeader-BK-QHgXO.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHeader({ page }) {
	const { L, lang, toggle } = useLang();
	const linkClass = (active) => `inline-flex min-h-10 items-center justify-center gap-2 px-2 text-xs transition-colors sm:px-3 sm:text-sm ${active ? "border-b-2 border-gold text-gold" : "text-bone/70 hover:text-gold"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-gold/20 bg-charcoal/70 px-5 py-4 backdrop-blur sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1440px] items-center gap-3 sm:grid-cols-[1fr_auto_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "grid h-10 w-10 place-items-center border border-gold/45 text-gold",
						children: [
							page === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-4 w-4" }) : null,
							page === "daily-sales" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }) : null,
							page === "storage" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-lg",
						children: page === "menu" ? L("إدارة المنيو", "Menu manager") : page === "daily-sales" ? L("الأداء اليومي", "Daily performance") : L("المخزون", "Storage")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[.62rem] tracking-[.2em] text-gold",
						children: L("الكمال", "AL KAMAL")
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": L("تنقل الإدارة", "Admin navigation"),
					className: "order-3 flex flex-wrap justify-center border-t border-gold/15 pt-3 sm:order-none sm:border-0 sm:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							className: linkClass(page === "menu"),
							children: L("إدارة المنيو", "Menu manager")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/daily-sales",
							className: linkClass(page === "daily-sales"),
							children: L("الأداء اليومي", "Daily performance")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/storage",
							className: linkClass(page === "storage"),
							children: L("المخزون", "Storage")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: linkClass(false),
							children: [L("الموقع", "View site"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: toggle,
						className: "inline-flex min-h-10 items-center gap-2 border border-gold/30 px-3 text-sm text-bone transition-colors hover:border-gold hover:text-gold",
						"aria-label": L("التبديل إلى الإنجليزية", "Switch to Arabic"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "ar" ? "EN" : "ع" })]
					})
				})
			]
		})
	});
}
//#endregion
export { AdminHeader as t };
