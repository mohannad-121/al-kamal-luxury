import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Clock3, L as CircleCheck, s as Search } from "../_libs/lucide-react.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
import { n as trackOrder } from "./services-DNRuOIZy.mjs";
import { c as Price, n as Route, o as GoldButton } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-order-oY8lUAgw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var flow = [
	"received",
	"preparing",
	"ready",
	"on_the_way",
	"delivered"
];
var labels = {
	received: ["استلمنا طلبك", "Order received"],
	preparing: ["عم بنحضّر طلبك", "Preparing"],
	ready: ["طلبك جاهز", "Ready"],
	on_the_way: ["طلبك بالطريق", "On the way"],
	delivered: ["وصل طلبك", "Delivered"],
	cancelled: ["تم إلغاء الطلب", "Order cancelled"]
};
function TrackOrder() {
	const { L } = useLang();
	const { order: initial } = Route.useSearch();
	const [number, setNumber] = (0, import_react.useState)(initial);
	const [phone, setPhone] = (0, import_react.useState)("");
	const [order, setOrder] = (0, import_react.useState)(null);
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const search = async (event) => {
		event.preventDefault();
		setLoading(true);
		setOrder(await trackOrder(number, phone));
		setSearched(true);
		setLoading(false);
	};
	const current = order && order.status !== "cancelled" ? flow.indexOf(order.status) : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "min-h-screen bg-charcoal px-4 pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center eyebrow",
						children: L("تتبع طلبك", "ORDER TRACKING")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-center text-3xl text-bone sm:mt-4 sm:text-5xl",
						children: L("وين وصل طلبك؟", "Where is your order?")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: search,
						className: "mt-6 grid gap-3 border border-gold/20 bg-ink/50 p-4 sm:mt-8 sm:grid-cols-[1fr_1fr_auto] sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: number,
								onChange: (event) => setNumber(event.target.value),
								className: "h-12 border border-gold/20 bg-charcoal px-4 text-base text-bone outline-none focus:border-gold/60 sm:text-sm",
								placeholder: L("رقم الطلب: AK-1048", "Order number: AK-1048"),
								dir: "ltr"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: phone,
								onChange: (event) => setPhone(event.target.value),
								className: "h-12 border border-gold/20 bg-charcoal px-4 text-base text-bone outline-none focus:border-gold/60 sm:text-sm",
								placeholder: L("رقم الموبايل", "Mobile number"),
								dir: "ltr"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
								disabled: loading,
								type: "submit",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), L("تتبع", "Track")]
							})
						]
					}),
					searched && !order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border border-gold/15 bg-ink/40 p-7 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-bone",
							children: L("ما قدرنا نلاقي هالطلب", "We couldn’t find this order")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: L("تأكد من رقم الطلب ورقم الموبايل وحاول مرة ثانية.", "Check the order number and mobile number, then try again.")
						})]
					}),
					order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-7 border border-gold/25 bg-ink p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-between gap-3 border-b border-gold/15 pb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: order.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl text-bone",
									children: order.type === "delivery" ? L("طلب توصيل", "Delivery order") : L("طلب استلام", "Pickup order")
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-fit border border-gold/30 px-3 py-2 text-sm text-gold",
									children: L(...labels[order.status])
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-8 grid gap-5 sm:grid-cols-5",
								children: flow.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative text-center sm:text-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `mx-auto grid h-8 w-8 place-items-center rounded-full border sm:mx-0 ${index <= current ? "border-gold bg-gold text-ink" : "border-gold/25 text-muted-foreground"}`,
										children: index <= current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index + 1 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `mt-2 text-xs ${index <= current ? "text-gold" : "text-muted-foreground"}`,
										children: L(...labels[step])
									})]
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 border-t border-gold/15 pt-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: L("تفاصيل الطلب", "ORDER ITEMS")
									}),
									order.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-bone/80",
											children: [
												item.qty,
												"× ",
												L(item.nameAr, item.nameEn ?? item.nameAr)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: item.price * item.qty })
										})]
									}, `${item.nameAr}-${index}`)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 flex justify-between border-t border-gold/15 pt-4 font-display text-lg text-bone",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("الإجمالي", "Total") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: order.total })
										})]
									})
								]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bg-ink px-5 py-14 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-bone",
				children: L("لسا ما طلبت؟", "Haven’t ordered yet?")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
					className: "mt-4",
					children: L("اطلب الآن", "Order now")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { TrackOrder as component };
