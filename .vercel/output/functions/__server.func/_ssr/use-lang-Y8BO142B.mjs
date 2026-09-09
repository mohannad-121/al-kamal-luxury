import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-lang-Y8BO142B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var KEY = "alkamal.lang";
function LangProvider({ children }) {
	const [lang, setLang] = (0, import_react.useState)("ar");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(KEY);
		if (saved === "en" || saved === "ar") setLang(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		const dir = lang === "ar" ? "rtl" : "ltr";
		document.documentElement.setAttribute("dir", dir);
		document.documentElement.setAttribute("lang", lang);
		localStorage.setItem(KEY, lang);
	}, [lang]);
	const toggle = (0, import_react.useCallback)(() => setLang((p) => p === "ar" ? "en" : "ar"), []);
	const L = (0, import_react.useCallback)((ar, en) => lang === "ar" ? ar : en, [lang]);
	const value = (0, import_react.useMemo)(() => ({
		lang,
		dir: lang === "ar" ? "rtl" : "ltr",
		toggle,
		L
	}), [
		lang,
		toggle,
		L
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useLang() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useLang must be used inside LangProvider");
	return ctx;
}
//#endregion
export { useLang as n, LangProvider as t };
