import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-BRYlWpEY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0, as = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const reducedMotion = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
		if (reducedMotion?.matches || !("IntersectionObserver" in window)) {
			setShown(true);
			return;
		}
		const io = new window.IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setShown(true);
					io.disconnect();
				}
			});
		}, {
			threshold: .04,
			rootMargin: "0px 0px -2% 0px"
		});
		const revealOnReducedMotion = (event) => {
			if (event.matches) {
				setShown(true);
				io.disconnect();
			}
		};
		reducedMotion?.addEventListener("change", revealOnReducedMotion);
		io.observe(el);
		return () => {
			reducedMotion?.removeEventListener("change", revealOnReducedMotion);
			io.disconnect();
		};
	}, []);
	const Tag = as;
	const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("reveal motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none", shown && "reveal-in", className),
		style: { transitionDelay: `${safeDelay}ms` },
		children
	});
}
//#endregion
export { Reveal as t };
