import { r as products, t as hiddenProductIds } from "./menu-CcVp0Adn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-DNRuOIZy.js
var delay = (value, ms = 120) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
var ORDERS_KEY = "alkamal.orders.v2";
var storedOrders = () => {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(ORDERS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
};
var persistOrders = (orders) => {
	if (typeof window !== "undefined") localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};
products.filter((product) => !hiddenProductIds.has(product.id));
var createOrder = async (input) => {
	const order = {
		id: `AK-${1049 + storedOrders().length}`,
		customer: input.name,
		phone: input.phone,
		type: input.type,
		...input.area ? { area: input.area } : {},
		address: [
			input.street,
			input.building,
			input.floor,
			input.details
		].filter(Boolean).join("، "),
		items: input.lines.map((line) => ({
			nameAr: line.nameAr,
			nameEn: line.nameEn,
			qty: line.qty,
			extrasAr: line.extras.map((extra) => extra.nameAr),
			extrasEn: line.extras.map((extra) => extra.nameEn),
			...line.note ? { note: line.note } : {},
			price: line.unitPrice
		})),
		subtotal: input.subtotal,
		delivery: input.delivery,
		discount: input.discount,
		total: input.total,
		payment: input.payment,
		status: "received",
		createdAt: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit"
		}),
		...input.notes ? { notes: input.notes } : {}
	};
	persistOrders([order, ...storedOrders()]);
	return delay(order);
};
var trackOrder = async (id, phone) => {
	const order = storedOrders().find((candidate) => candidate.id.toLowerCase() === id.trim().toLowerCase());
	const phoneMatches = !phone || order?.phone.replace(/\D/g, "") === phone.replace(/\D/g, "");
	return delay(order && phoneMatches ? order : null, 400);
};
//#endregion
export { trackOrder as n, createOrder as t };
