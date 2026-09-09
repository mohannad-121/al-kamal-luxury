import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Clock3, N as Globe, P as Facebook, S as MapPin, b as MessageCircle, h as Phone, k as Instagram, s as Search, t as X, v as Music2, x as Menu } from "../_libs/lucide-react.mjs";
import { t as restaurant } from "./restaurant-CFBERA6Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-B7twb3ra.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/",
		ar: "الرئيسية",
		en: "Home"
	},
	{
		to: "/menu",
		ar: "المنيو",
		en: "Menu"
	},
	{
		to: "/order-now",
		ar: "اطلب الآن",
		en: "Order now"
	},
	{
		to: "/",
		hash: "popular",
		ar: "الأكثر طلبًا",
		en: "Popular"
	},
	{
		to: "/",
		hash: "location",
		ar: "موقعنا",
		en: "Find us"
	}
];
var navControl = "grid h-11 w-11 touch-manipulation place-items-center rounded-[var(--control-radius)] border border-transparent text-bone/70 transition-[background-color,border-color,color] duration-200 ease-out hover:border-gold/25 hover:bg-gold/[.06] hover:text-gold-soft active:bg-gold/[.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none";
function Navbar() {
	const { L, toggle, lang } = useLang();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const mobileMenuRef = (0, import_react.useRef)(null);
	const menuTriggerRef = (0, import_react.useRef)(null);
	const closeButtonRef = (0, import_react.useRef)(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setMobileOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!mobileOpen) return;
		const previousOverflow = document.body.style.overflow;
		const menuTrigger = menuTriggerRef.current;
		const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				setMobileOpen(false);
				return;
			}
			if (event.key !== "Tab") return;
			const focusable = mobileMenuRef.current?.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])");
			if (!focusable?.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.cancelAnimationFrame(focusFrame);
			window.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
			menuTrigger?.focus();
		};
	}, [mobileOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-[80] border-b border-gold/10 bg-ink/75 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none", scrolled ? "border-gold/20 bg-ink/[.95] shadow-[0_10px_28px_-22px_rgba(0,0,0,.9)]" : "lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:h-[76px] sm:gap-5 sm:px-8 sm:pt-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "group flex min-w-0 items-center gap-2.5 rounded-[var(--control-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-3 focus-visible:ring-offset-ink sm:gap-3",
					"aria-label": L("مطعم الكمال - الرئيسية", "Al Kamal Restaurant - Home"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[var(--control-radius)] border border-gold/30 bg-ink/75 p-1 transition-colors duration-200 group-hover:border-gold/55 motion-reduce:transition-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/favicon.svg",
							alt: "",
							className: "h-full w-full object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-display text-[0.9rem] text-bone sm:text-[0.95rem]",
							children: L(restaurant.nameAr, restaurant.nameEn)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-[0.56rem] tracking-[0.18em] text-gold/75 sm:text-[0.6rem] sm:tracking-[0.22em]",
							children: L("الرصيفة", "RUSSEIFA")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-4 lg:flex",
					"aria-label": L("التنقل الرئيسي", "Primary navigation"),
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						hash: "hash" in l ? l.hash : void 0,
						"aria-current": pathname === l.to && !("hash" in l) ? "page" : void 0,
						className: cn("relative rounded-[var(--control-radius)] px-2 py-2.5 text-[0.84rem] transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-center after:bg-gold after:transition-transform after:duration-200 hover:text-gold-soft hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 motion-reduce:transition-none motion-reduce:after:transition-none", pathname === l.to && !("hash" in l) ? "text-gold-soft after:scale-x-100" : "text-bone/72 after:scale-x-0"),
						children: L(l.ar, l.en)
					}, `${l.to}-${l.ar}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1 sm:gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							className: navControl,
							"aria-label": L("البحث في المنيو", "Search the menu"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"aria-hidden": "true",
								className: "h-[18px] w-[18px]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: toggle,
							className: cn(navControl, "sm:w-auto sm:grid-cols-[auto_auto] sm:gap-1.5 sm:px-3"),
							"aria-label": L("تغيير اللغة", "Change language"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[0.7rem] font-medium tracking-[0.12em] sm:inline",
								children: lang === "ar" ? "EN" : "AR"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: menuTriggerRef,
							type: "button",
							onClick: () => setMobileOpen(true),
							className: cn(navControl, "text-bone lg:hidden"),
							"aria-label": L("فتح القائمة", "Open menu"),
							"aria-expanded": mobileOpen,
							"aria-controls": "mobile-navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								"aria-hidden": "true",
								className: "h-5 w-5"
							})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("hairline transition-opacity duration-700 motion-reduce:transition-none", scrolled ? "opacity-100" : "opacity-0") })]
	}), mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "mobile-navigation",
		ref: mobileMenuRef,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": L("القائمة الرئيسية", "Main menu"),
		className: "fixed inset-0 z-[100] flex flex-col overflow-hidden overscroll-contain bg-ink animate-in fade-in duration-200 motion-reduce:animate-none lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-[72px] items-center justify-between px-5 pt-[env(safe-area-inset-top)] sm:px-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg text-gold-soft",
					children: L(restaurant.nameAr, restaurant.nameEn)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeButtonRef,
					type: "button",
					onClick: () => setMobileOpen(false),
					className: cn(navControl, "border-gold/25 text-bone"),
					"aria-label": L("إغلاق القائمة", "Close menu"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						"aria-hidden": "true",
						className: "h-4 w-4"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "relative flex flex-1 flex-col justify-center gap-1 px-7 py-6 sm:px-10",
				"aria-label": L("روابط القائمة", "Menu links"),
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					hash: "hash" in l ? l.hash : void 0,
					onClick: () => setMobileOpen(false),
					"aria-current": pathname === l.to && !("hash" in l) ? "page" : void 0,
					className: cn("flex min-h-16 items-center border-b border-gold/15 px-2 py-4 font-display text-[1.35rem] text-bone transition-[background-color,border-color,color] duration-200 hover:border-gold/30 hover:bg-gold/[.035] hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-soft/65 motion-reduce:transition-none sm:text-2xl", pathname === l.to && !("hash" in l) && "border-gold/30 bg-gold/[.04] text-gold-soft"),
					children: L(l.ar, l.en)
				}, `m-${l.to}-${l.ar}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative px-7 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: toggle,
					className: "flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--control-radius)] border border-gold/30 bg-transparent px-5 py-2.5 text-sm text-bone/80 transition-[background-color,border-color,color] duration-200 hover:border-gold/55 hover:bg-gold/[.05] hover:text-gold-soft active:bg-gold/[.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 motion-reduce:transition-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
						"aria-hidden": "true",
						className: "h-4 w-4 text-gold"
					}), lang === "ar" ? "English" : "العربية"]
				})
			})
		]
	}) : null] });
}
function SiteFooter() {
	const { L } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative border-t border-gold/20 bg-[#0b0a09] px-5 pb-28 pt-14 sm:px-8 sm:pb-12 sm:pt-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1360px] gap-9 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 lg:grid-cols-[1.25fr_.75fr_1fr] lg:gap-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "footer-brand",
					className: "sm:col-span-2 lg:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "group inline-flex max-w-full items-center gap-4 rounded-[var(--control-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-3 focus-visible:ring-offset-[#0b0a09]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-13 w-13 shrink-0 place-items-center overflow-hidden rounded-[var(--control-radius)] border border-gold/30 bg-ink/70 p-1.5 transition-colors duration-200 group-hover:border-gold/55 motion-reduce:transition-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/favicon.svg",
									alt: "",
									className: "h-full w-full object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								id: "footer-brand",
								className: "min-w-0 font-display text-2xl leading-tight text-gold-soft transition-colors duration-200 group-hover:text-gold sm:text-3xl",
								children: L(restaurant.nameAr, restaurant.nameEn)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:mt-5",
							children: L(restaurant.sloganAr, restaurant.sloganEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: restaurant.social.instagram,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "Instagram",
									className: "grid h-10 w-10 place-items-center border border-gold/20 text-gold transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: restaurant.social.facebook,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "Facebook",
									className: "grid h-10 w-10 place-items-center border border-gold/20 text-gold transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: restaurant.social.tiktok,
									target: "_blank",
									rel: "noreferrer",
									"aria-label": "TikTok",
									className: "grid h-10 w-10 place-items-center border border-gold/20 text-gold transition-colors hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-4 w-4" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": L("روابط سريعة", "Quick links"),
					className: "border-t border-gold/12 pt-7 sm:border-t-0 sm:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: L("روابط سريعة", "QUICK LINKS")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid text-sm text-bone/72",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								className: "flex min-h-11 items-center border-b border-gold/[.08] text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: L("المنيو", "Menu")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/order-now",
								className: "flex min-h-11 items-center border-b border-gold/[.08] text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: L("اطلب الآن", "Order now")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "location",
								className: "flex min-h-11 items-center text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: L("موقعنا", "Our location")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
					className: "border-t border-gold/12 pt-7 text-sm not-italic text-bone/72 sm:border-t-0 sm:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: L("تواصل", "CONTACT")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${restaurant.phone.replace(/\s/g, "")}`,
								className: "flex min-h-11 items-center gap-3 rounded-[var(--control-radius)] transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-6 shrink-0 place-items-center text-gold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
										"aria-hidden": "true",
										className: "h-3.5 w-3.5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									dir: "ltr",
									children: restaurant.phone
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: restaurant.whatsapp,
								target: "_blank",
								rel: "noreferrer",
								className: "flex min-h-11 items-center gap-3 rounded-[var(--control-radius)] transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-6 shrink-0 place-items-center text-gold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										"aria-hidden": "true",
										className: "h-3.5 w-3.5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("واتساب", "WhatsApp") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: restaurant.mapsUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "flex min-h-11 items-start gap-3 rounded-[var(--control-radius)] py-1.5 leading-6 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-6 shrink-0 place-items-center text-gold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										"aria-hidden": "true",
										className: "h-3.5 w-3.5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L(restaurant.addressAr, restaurant.addressEn) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-11 items-start gap-3 py-1.5 leading-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8 w-6 shrink-0 place-items-center text-gold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
										"aria-hidden": "true",
										className: "h-3.5 w-3.5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L(restaurant.hours[0].timeAr, restaurant.hours[0].timeEn) })]
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-11 max-w-[1360px] border-t border-gold/15 pt-5 text-center text-[0.7rem] text-muted-foreground sm:mt-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				L(restaurant.nameAr, restaurant.nameEn)
			] })
		})]
	});
}
//#endregion
export { SiteFooter as n, Navbar as t };
