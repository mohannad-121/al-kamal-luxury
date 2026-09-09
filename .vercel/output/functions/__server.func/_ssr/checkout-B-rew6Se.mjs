import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as LoaderCircle, V as Check, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
import { t as createOrder } from "./services-DNRuOIZy.mjs";
import { c as Price, o as GoldButton, s as useCart } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-B-rew6Se.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var deliveryAreas = [
	{
		id: "a1",
		nameAr: "خلدا",
		nameEn: "Khalda",
		fee: 1.5,
		active: true
	},
	{
		id: "a2",
		nameAr: "تلاع العلي",
		nameEn: "Tla' Al Ali",
		fee: 1.5,
		active: true
	},
	{
		id: "a3",
		nameAr: "الجبيهة",
		nameEn: "Al Jubaiha",
		fee: 2,
		active: true
	},
	{
		id: "a4",
		nameAr: "الصويفية",
		nameEn: "Sweifieh",
		fee: 2,
		active: true
	},
	{
		id: "a5",
		nameAr: "عبدون",
		nameEn: "Abdoun",
		fee: 2.5,
		active: false
	}
];
var fieldClass = "mt-2 h-13 w-full border border-gold/20 bg-ink/60 px-4 text-base text-bone outline-none transition-colors placeholder:text-muted-foreground focus:border-gold/60 sm:h-12 sm:text-sm";
function Checkout() {
	const { L } = useLang();
	const cart = useCart();
	const navigate = useNavigate();
	const [type, setType] = (0, import_react.useState)("delivery");
	const [area, setArea] = (0, import_react.useState)(deliveryAreas[0]?.id ?? "");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const selectedArea = deliveryAreas.find((candidate) => candidate.id === area);
	const delivery = type === "delivery" ? selectedArea?.fee ?? 0 : 0;
	const total = Math.max(0, cart.subtotal + delivery - cart.discount);
	const submit = async (event) => {
		event.preventDefault();
		if (!cart.lines.length) return;
		const form = new FormData(event.currentTarget);
		setSubmitting(true);
		const order = await createOrder({
			name: String(form.get("name")),
			phone: String(form.get("phone")),
			type,
			...type === "delivery" ? {
				area: selectedArea ? L(selectedArea.nameAr, selectedArea.nameEn) : "",
				street: String(form.get("street")),
				building: String(form.get("building")),
				floor: String(form.get("floor")),
				details: String(form.get("details"))
			} : {},
			notes: String(form.get("notes") || ""),
			payment: type === "delivery" ? L("الدفع عند التوصيل", "Cash on delivery") : L("الدفع عند الاستلام", "Cash on pickup"),
			lines: cart.lines,
			subtotal: cart.subtotal,
			delivery,
			discount: cart.discount,
			total
		});
		cart.clear();
		await navigate({
			to: "/order-confirmed",
			search: { order: order.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "min-h-screen bg-charcoal px-4 pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "inline-flex items-center gap-1 text-sm text-gold hover:text-gold-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), L("العودة للمنيو", "Back to menu")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-5 sm:mt-6 sm:gap-8 lg:grid-cols-[1fr_380px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "border border-gold/20 bg-ink/45 p-4 pb-24 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: L("خطوة أخيرة", "ONE LAST STEP")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 text-2xl text-bone sm:text-4xl",
								children: L("بيانات الطلب", "Order details")
							}),
							!cart.lines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 border border-gold/15 bg-charcoal/40 p-8 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-bone",
									children: L("سلتك فاضية.", "Your cart is empty.")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
										className: "mt-5",
										children: L("تصفح المنيو", "Browse menu")
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm text-bone",
										children: [L("الاسم الكامل", "Full name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "name",
											className: fieldClass,
											placeholder: L("اكتب اسمك", "Your name")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm text-bone",
										dir: "rtl",
										children: [L("رقم الموبايل", "Mobile number"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "phone",
											type: "tel",
											className: fieldClass,
											placeholder: "07X XXX XXXX",
											dir: "ltr"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-bone",
										children: L("طريقة الاستلام", "Delivery or pickup")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 grid grid-cols-2 gap-3",
										children: ["delivery", "pickup"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setType(value),
											className: `border p-4 text-start text-sm transition-colors ${type === value ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-bone/70"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `mb-2 h-4 w-4 ${type === value ? "opacity-100" : "opacity-0"}` }), value === "delivery" ? L("توصيل", "Delivery") : L("استلام من المطعم", "Pickup")]
										}, value))
									})]
								}),
								type === "delivery" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-7 grid gap-5 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm text-bone",
											children: [L("المنطقة", "Area"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: area,
												onChange: (event) => setArea(event.target.value),
												className: fieldClass,
												children: deliveryAreas.filter((candidate) => candidate.active).map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: candidate.id,
													children: [
														L(candidate.nameAr, candidate.nameEn),
														" · ",
														candidate.fee.toFixed(2),
														" ",
														L("د.أ", "JOD")
													]
												}, candidate.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm text-bone",
											children: [L("الشارع", "Street"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												name: "street",
												className: fieldClass
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm text-bone",
											children: [L("رقم البناية", "Building"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												name: "building",
												className: fieldClass
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm text-bone",
											children: [L("الطابق / الشقة", "Floor / apartment"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "floor",
												className: fieldClass
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm text-bone sm:col-span-2",
											children: [L("علامة مميزة أو تفاصيل العنوان", "Landmark or address details"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												name: "details",
												className: fieldClass
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-7 block text-sm text-bone",
									children: [L("ملاحظات الطلب", "Order notes"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "notes",
										rows: 3,
										className: `${fieldClass} h-auto py-3`,
										placeholder: L("مثلاً: شطة على جنب", "e.g. chili on the side")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
									disabled: submitting,
									size: "lg",
									className: "sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 mt-6 w-full shadow-[0_12px_28px_rgba(0,0,0,.45)] sm:static sm:mt-8 sm:shadow-none",
									children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : L("تأكيد الطلب", "Place order")
								})
							] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit border border-gold/20 bg-ink p-4 sm:p-6 lg:sticky lg:top-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: L("ملخص طلبك", "YOUR ORDER")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 divide-y divide-gold/10",
								children: cart.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-bone/80",
										children: [
											line.qty,
											"× ",
											L(line.nameAr, line.nameEn)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: line.unitPrice * line.qty })
									})]
								}, line.lineId))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-5 space-y-3 border-t border-gold/15 pt-5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: L("المجموع", "Subtotal") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: cart.subtotal }) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: L("التوصيل", "Delivery") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: delivery }) })]
									}),
									cart.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-gold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: L("خصم", "Discount") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["− ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: cart.discount })] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between border-t border-gold/15 pt-4 font-display text-xl text-bone",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: L("الإجمالي", "Total") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, { value: total })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs leading-6 text-muted-foreground",
								children: L("الدفع كاش عند الاستلام، ورقم التتبع بيطلع بعد تأكيد الطلب.", "Pay cash on delivery or pickup. Tracking appears after confirmation.")
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { Checkout as component };
