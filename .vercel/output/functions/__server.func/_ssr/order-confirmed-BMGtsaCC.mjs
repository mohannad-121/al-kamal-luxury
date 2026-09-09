import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ClipboardList, L as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
import { o as GoldButton, r as Route } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-BMGtsaCC.js
var import_jsx_runtime = require_jsx_runtime();
function Confirmed() {
	const { L } = useLang();
	const { order } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex min-h-[74dvh] items-center bg-ink px-4 py-[calc(6rem+env(safe-area-inset-top))] sm:px-8 sm:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/45 bg-gold/10 text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 eyebrow",
						children: L("تم تأكيد الطلب", "ORDER CONFIRMED")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl leading-tight text-bone sm:text-5xl",
						children: L("شكرًا! طلبك صار عندنا.", "Thanks! Your order is confirmed.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 leading-8 text-muted-foreground",
						children: L("خلّي رقم الطلب معك عشان تقدر تتابعه.", "Keep your order number to track it.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border border-gold/30 bg-charcoal/60 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: L("رقم الطلب", "ORDER NUMBER")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl tracking-wide text-gold",
							children: order || "AK-1049"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/track-order",
							search: { order },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
								size: "lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" }), L("تتبع الطلب", "Track order")]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
								size: "lg",
								variant: "outline",
								children: L("العودة للمنيو", "Back to menu")
							})
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Confirmed as component };
