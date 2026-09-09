import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useLang } from "./use-lang-Y8BO142B.mjs";
import { a as supabase, i as publicMenuSections } from "./supabase-BvpBKmRv.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as LoaderCircle, F as Clock3, H as CalendarDays, S as MapPin, U as Building2, W as Award, a as Star, f as Quote, q as ArrowLeft, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as restaurant } from "./restaurant-CFBERA6Q.mjs";
import { n as SiteFooter, t as Navbar } from "./SiteFooter-B7twb3ra.mjs";
import { t as Reveal } from "./Reveal-BRYlWpEY.mjs";
import { c as Price, l as FoodImage, o as GoldButton } from "./router-C5SONcax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NcphJV5I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Create_a_high_end_cinematic_u_default = "/assets/Create_a_high_end_cinematic_u-CWj1aLX5.mp4";
var chef_jpg_asset_default = {
	version: 1,
	asset_id: "606a7f79-c733-4ca2-abbd-ac13074d868c",
	project_id: "aeaa497b-7cb5-4fba-8ba4-5983648e5008",
	url: "/images/chef.jpg",
	r2_key: "a/v1/aeaa497b-7cb5-4fba-8ba4-5983648e5008/606a7f79-c733-4ca2-abbd-ac13074d868c/chef.jpg",
	original_filename: "chef.jpg",
	size: 144057,
	content_type: "image/jpeg",
	created_at: "2026-08-18T10:33:52Z"
};
var storefront_jpg_asset_default = {
	version: 1,
	asset_id: "14006d32-8411-486f-8cfc-e446bd5dcd9e",
	project_id: "aeaa497b-7cb5-4fba-8ba4-5983648e5008",
	url: "/images/storefront.jpg",
	r2_key: "a/v1/aeaa497b-7cb5-4fba-8ba4-5983648e5008/14006d32-8411-486f-8cfc-e446bd5dcd9e/storefront.jpg",
	original_filename: "storefront.jpg",
	size: 245036,
	content_type: "image/jpeg",
	created_at: "2026-08-18T10:33:46Z"
};
var REVIEW_COOLDOWN_KEY = "alkamal.review-submitted-at";
var REVIEW_COOLDOWN_MS = 6e5;
function ReviewSubmissionForm({ onPublished }) {
	const { L, lang } = useLang();
	const [name, setName] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	const [comment, setComment] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const submit = async (event) => {
		event.preventDefault();
		setMessage("");
		setIsSuccess(false);
		if (name.trim().length < 2 || name.trim().length > 80 || !rating || comment.trim().length < 8) {
			setMessage(L("اكتب اسمك، اختار تقييم، واحكيلنا عن تجربتك.", "Enter your name, choose a rating, and tell us about your experience."));
			return;
		}
		const lastSubmission = Number(localStorage.getItem(REVIEW_COOLDOWN_KEY) ?? 0);
		if (Date.now() - lastSubmission < REVIEW_COOLDOWN_MS) {
			setMessage(L("استنى كم دقيقة قبل ما تبعث مراجعة ثانية.", "Please wait a few minutes before posting again."));
			return;
		}
		const submittedName = name.trim();
		const submittedComment = comment.trim();
		setSubmitting(true);
		const { data: reviewId, error } = await supabase.rpc("submit_review", {
			p_name: submittedName,
			p_rating: rating,
			p_comment: submittedComment,
			p_language: lang,
			p_website: website
		});
		setSubmitting(false);
		if (error) {
			setMessage(L("ما قدرنا نرسل مراجعتك. جرّب مرة ثانية.", "We couldn't post your review. Try again."));
			return;
		}
		onPublished({
			id: typeof reviewId === "string" ? reviewId : crypto.randomUUID(),
			name: submittedName,
			textAr: lang === "ar" ? submittedComment : null,
			textEn: lang === "en" ? submittedComment : null,
			rating,
			cityAr: null,
			cityEn: null
		});
		localStorage.setItem(REVIEW_COOLDOWN_KEY, String(Date.now()));
		setName("");
		setRating(0);
		setComment("");
		setWebsite("");
		setIsSuccess(true);
		setMessage(L("شكرًا! مراجعتك صارت على الموقع.", "Thanks! Your review is live."));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "relative mt-8 overflow-hidden border border-gold/20 bg-ink/65 p-6 shadow-[0_28px_80px_-56px_rgba(0,0,0,.9)] sm:mt-10 sm:p-8 lg:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute start-0 top-0 h-14 w-14 border-s border-t border-gold/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -end-20 -top-24 h-64 w-64 rounded-full bg-gold/[.06] blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-bone sm:text-3xl",
						children: L("كيف كانت تجربتك معنا؟", "How was your visit?")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-7 text-muted-foreground",
						children: L("مراجعتك رح تظهر مباشرة بعد الإرسال.", "Your review appears as soon as you send it.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 grid gap-5 md:grid-cols-[.8fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm text-bone",
							children: [L("الاسم", "Name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (event) => setName(event.target.value),
								maxLength: 80,
								autoComplete: "name",
								className: "h-12 border border-gold/25 bg-charcoal/55 px-4 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold",
								placeholder: L("اكتب اسمك الأول", "Your first name"),
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm text-bone",
								children: L("تقييمك", "Your rating")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 items-center gap-1",
								role: "radiogroup",
								"aria-label": L("التقييم من خمس نجوم", "Rating out of five stars"),
								children: Array.from({ length: 5 }, (_, index) => {
									const value = index + 1;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": rating === value,
										"aria-label": L(value === 1 ? "نجمة واحدة" : value === 2 ? "نجمتان" : `${value} نجوم`, `${value} stars`),
										onClick: () => setRating(value),
										className: "rounded-sm p-1.5 text-gold transition duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											className: "h-6 w-6",
											fill: value <= rating ? "currentColor" : "none"
										})
									}, value);
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 grid gap-2 text-sm text-bone",
						children: [L("تعليقك", "Your comment"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: comment,
							onChange: (event) => setComment(event.target.value),
							minLength: 8,
							maxLength: 500,
							rows: 4,
							className: "min-h-32 resize-y border border-gold/25 bg-charcoal/55 p-4 leading-7 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold",
							placeholder: L("احكيلنا شو رأيك", "Tell us what you think"),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -start-[10000px] top-auto h-px w-px overflow-hidden",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "review-website",
							children: "Website"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "review-website",
							tabIndex: -1,
							autoComplete: "off",
							value: website,
							onChange: (event) => setWebsite(event.target.value)
						})]
					}),
					message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-4 text-sm ${isSuccess ? "text-gold-soft" : "text-destructive"}`,
						role: "status",
						children: message
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
						type: "submit",
						size: "lg",
						disabled: submitting,
						className: "mt-6 w-full sm:w-auto",
						children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "h-4 w-4 animate-spin",
							"aria-hidden": "true"
						}) : null, submitting ? L("جارٍ الإرسال...", "Sending...") : L("إرسال المراجعة", "Submit review")]
					})
				]
			})
		]
	});
}
function SectionHeading({ eyebrow, title, sub, align = "start", tone = "dark", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		className: cn("max-w-2xl", align === "center" && "mx-auto text-center", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-3", align === "center" && "justify-center"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: eyebrow
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: cn("mt-4 text-3xl leading-[1.25] sm:text-4xl md:text-5xl", !eyebrow && "mt-0", tone === "light" ? "text-ink" : "text-bone"),
				children: title
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-4 max-w-xl text-[0.95rem] leading-relaxed", align === "center" && "mx-auto", tone === "light" ? "text-ink/70" : "text-muted-foreground"),
				children: sub
			}) : null
		]
	});
}
function useReviews() {
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const refresh = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data, error } = await supabase.from("reviews").select("id, customer_name, review_ar, review_en, rating, city_ar, city_en").order("created_at", { ascending: false }).limit(6);
		if (!error) setReviews((data ?? []).map((review) => ({
			id: review.id,
			name: review.customer_name,
			textAr: review.review_ar,
			textEn: review.review_en,
			rating: Number(review.rating),
			cityAr: review.city_ar,
			cityEn: review.city_en
		})));
		setLoading(false);
	}, []);
	const addReview = (0, import_react.useCallback)((review) => {
		setReviews((current) => [review, ...current.filter((item) => item.id !== review.id)].slice(0, 6));
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	return {
		reviews,
		loading,
		refresh,
		addReview
	};
}
var homepageHighlights = [
	"fatteh",
	"sandwich-falafel",
	"falafel-classic",
	"potato-box"
].flatMap((id) => {
	const section = publicMenuSections.find((candidate) => candidate.items.some((item) => item.id === id));
	const item = section?.items.find((candidate) => candidate.id === id);
	return section && item ? [{
		section,
		item
	}] : [];
});
var categoryLayouts = [
	"sm:col-span-2 lg:col-span-2 lg:row-span-2",
	"",
	"",
	"sm:col-span-2 lg:col-span-2",
	"",
	"",
	"sm:col-span-2 lg:col-span-2",
	"sm:col-span-2 lg:col-span-2"
];
function useHeroVideo() {
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const connection = navigator.connection;
		const sync = () => setEnabled(!motion.matches && !connection?.saveData);
		sync();
		motion.addEventListener("change", sync);
		return () => motion.removeEventListener("change", sync);
	}, []);
	return enabled;
}
function Index() {
	const { L, lang } = useLang();
	const { reviews, loading: reviewsLoading, addReview } = useReviews();
	const playHeroVideo = useHeroVideo();
	const number = (0, import_react.useMemo)(() => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"), [lang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate min-h-[clamp(700px,94svh,900px)] overflow-hidden bg-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
						src: storefront_jpg_asset_default.url,
						alt: L("واجهة مطعم الكمال ليلاً", "Al Kamal restaurant storefront at night"),
						eager: true,
						zoom: false,
						className: "absolute inset-0 h-full w-full",
						imgClassName: "animate-ken object-[58%_center]"
					}),
					playHeroVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "hero-video absolute inset-0 h-full w-full object-cover object-center",
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						preload: "metadata",
						poster: storefront_jpg_asset_default.url,
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: Create_a_high_end_cinematic_u_default,
							type: "video/mp4"
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(270deg,oklch(0.105_0.004_60/.94),oklch(0.105_0.004_60/.7)_46%,oklch(0.105_0.004_60/.24))] ltr:bg-[linear-gradient(90deg,oklch(0.105_0.004_60/.94),oklch(0.105_0.004_60/.7)_46%,oklch(0.105_0.004_60/.24))]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 [background:radial-gradient(circle_at_73%_42%,oklch(0.79_0.09_82/.12),transparent_24rem)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[46%] veil" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-4 border border-gold/10 sm:inset-7" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient-glow pointer-events-none absolute -end-28 top-28 h-80 w-80 rounded-full bg-gold/10 blur-[90px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-[clamp(700px,94svh,900px)] max-w-[1400px] flex-col justify-end px-5 pb-9 pt-28 sm:px-8 sm:pb-12 lg:pb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl pb-9 sm:pb-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hero-enter hero-enter-1 flex items-center gap-3 text-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-11 bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow",
										children: L("من قلب الرصيفة", "FROM RUSSEIFA")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "hero-enter hero-enter-2 mt-5 text-[clamp(3rem,8vw,7.1rem)] leading-[1.12] text-bone sm:mt-7",
									children: [L("فطور شعبي،", "Jordanian breakfast,"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-gold-gradient",
										children: L("على أصوله.", "the traditional way.")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hero-enter hero-enter-3 mt-5 max-w-2xl text-base leading-8 text-bone/78 sm:mt-7 sm:text-lg sm:leading-9",
									children: L("حمص وفول وفلافل وساندويشات، بنحضّرهم طازة كل يوم.", "Hummus, foul, falafel and sandwiches, made fresh every day.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hero-enter hero-enter-4 mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/menu",
										search: { category: "all" },
										className: "luxury-cta w-full sm:w-auto",
										children: [L("شوف المنيو", "View the menu"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 ltr:rotate-180" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/order-now",
										className: "luxury-cta luxury-cta-outline w-full sm:w-auto",
										children: L("اطلب الآن", "Order now")
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hero-enter hero-enter-4 grid border-y border-gold/18 bg-ink/28 backdrop-blur-md sm:grid-cols-3",
							children: [
								L("تحضير يومي", "Prepared daily"),
								L("فطور شعبي", "Jordanian breakfast"),
								L("الرصيفة، الزرقاء", "Russeifa, Zarqa")
							].map((title, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center justify-between gap-4 px-5 py-4 ${index ? "border-t border-gold/15 sm:border-s sm:border-t-0" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-bone/80 sm:text-base",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
								})]
							}, title))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -start-40 top-20 h-96 w-96 rounded-full bg-gold/[.045] blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-[1360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: L("اختار قسمك", "Choose a section") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/menu",
							search: { category: "all" },
							className: "group hidden items-center gap-2 pb-1 text-sm text-gold transition-colors hover:text-gold-soft sm:flex",
							children: [L("المنيو كامل", "Full menu"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid auto-rows-[210px] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4",
						children: publicMenuSections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: index % 4 * 70,
							className: categoryLayouts[index],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/menu",
								search: { category: section.id },
								className: "group relative block h-full overflow-hidden border border-gold/18 bg-charcoal focus-visible:ring-2 focus-visible:ring-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
										src: section.image,
										alt: L(section.nameAr, section.nameEn),
										className: "absolute inset-0 h-full w-full",
										imgStyle: { objectPosition: section.imagePosition }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.94),oklch(0.12_0.004_60/.14)_70%)] transition-colors duration-700 group-hover:bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.88),oklch(0.12_0.004_60/.04)_72%)]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 border border-transparent transition-[inset,border-color] duration-700 group-hover:inset-2 group-hover:border-gold/45" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-[0.65rem] text-gold",
											children: [
												number.format(section.items.length),
												" ",
												L("أصناف", "items")
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block font-display text-2xl text-bone sm:text-3xl",
											children: L(section.nameAr, section.nameEn)
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 shrink-0 place-items-center border border-gold/35 bg-ink/45 text-gold backdrop-blur transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 ltr:rotate-180" })
										})]
									})
								]
							})
						}, section.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "popular",
				className: "relative overflow-hidden bg-charcoal px-5 py-16 sm:px-8 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-35" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: L("الأكثر طلبًا", "Most ordered") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							search: { category: "all" },
							className: "luxury-cta luxury-cta-outline sm:mb-1",
							children: L("شوف كل الأسعار", "See all prices")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: homepageHighlights.map(({ item, section }, index) => {
							const priced = item.options.filter((option) => option.price !== void 0);
							const from = priced.length ? Math.min(...priced.map((option) => option.price)) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: index * 80,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/menu",
									search: { category: section.id },
									className: "group block h-full overflow-hidden border border-gold/18 bg-ink transition-[transform,border-color,box-shadow] duration-700 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_80px_-48px_oklch(0.716_0.107_78.5/.5)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-[5/4] overflow-hidden",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
												src: section.image,
												alt: L(item.nameAr, item.nameEn),
												className: "h-full w-full",
												imgStyle: { objectPosition: section.imagePosition }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute end-4 top-4 border border-gold/30 bg-ink/65 px-2.5 py-1 text-[0.65rem] text-gold backdrop-blur",
												children: L(section.nameAr, section.nameEn)
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 sm:p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-xl leading-8 text-bone transition-colors group-hover:text-gold-soft",
													children: L(item.nameAr, item.nameEn)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mt-1 h-4 w-4 shrink-0 text-gold transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 flex flex-wrap gap-2",
												children: item.options.slice(0, 3).map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "border border-gold/15 bg-charcoal/60 px-2.5 py-1 text-xs text-bone/65",
													children: L(option.nameAr, option.nameEn)
												}, option.id))
											}),
											from !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-5 flex items-baseline justify-between border-t border-gold/12 pt-4 text-sm text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L("يبدأ من", "From") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Price, {
													value: from,
													className: "text-lg font-medium text-gold"
												})]
											}) : null
										]
									})]
								})
							}, item.id);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1.06fr_.94fr] lg:items-stretch lg:gap-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "group relative min-h-[400px] overflow-hidden border border-gold/20 sm:min-h-[540px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
								src: "/images/levantine-bowls-premium.jpg",
								alt: L("حمص وفول ومسبّحة وقدسية", "Hummus, foul, msabbaha and qudsiyeh"),
								className: "absolute inset-0 h-full w-full",
								imgClassName: "object-[50%_55%]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-5 border border-gold/20 transition-[inset,border-color] duration-700 group-hover:inset-7 group-hover:border-gold/45" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center lg:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: L("فطور طازة كل صباح", "Fresh breakfast every morning") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid grid-cols-3 border-y border-gold/15",
								children: [
									["تحضير يومي", "MADE DAILY"],
									["مكونات طازة", "FRESH INGREDIENTS"],
									["على الطلب", "MADE TO ORDER"]
								].map(([ar, en], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
									delay: index * 90,
									className: `px-3 py-6 text-center ${index ? "border-s border-gold/15" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										className: "mx-auto block h-1.5 w-1.5 rotate-45 bg-gold"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-medium text-bone sm:text-base",
										children: L(ar, en)
									})]
								}, en))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 260,
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/menu",
									search: { category: "boxes" },
									className: "luxury-cta w-full sm:w-auto",
									children: [L("شوف الأصناف", "View items"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 ltr:rotate-180" })]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "experience",
				className: "relative overflow-hidden bg-charcoal px-5 py-16 sm:px-8 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,oklch(0.716_0.107_78.5/.12),transparent_31rem)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch lg:gap-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "group relative min-h-[440px] overflow-hidden border border-gold/30 bg-ink sm:min-h-[560px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
								src: chef_jpg_asset_default.url,
								alt: L("شيف مطعم الكمال", "Al Kamal chef"),
								className: "absolute inset-0 h-full w-full",
								imgClassName: "object-[29%_center] transition-transform duration-700 group-hover:scale-[1.025]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.94),transparent_58%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-0 start-0 end-0 border-t border-gold/25 bg-ink/70 px-5 py-5 backdrop-blur-sm sm:px-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-gold sm:text-3xl",
									children: L("شيف مطعم الكمال", "AL KAMAL CHEF")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-bone/65",
									children: L("خبرة مهنية في الضيافة والمطبخ الأردني", "Professional experience in Jordanian hospitality and cuisine")
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center lg:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: L("خبرة تُقدَّم في كل طبق", "Experience served in every plate") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl leading-8 text-muted-foreground",
								children: L("رحلة مهنية تجمع بين التعليم المتخصص وخبرة الضيافة في أبرز فنادق الأردن.", "A professional journey shaped by specialist education and hospitality experience at leading Jordanian hotels.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid gap-4 sm:grid-cols-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									className: "border border-gold/25 bg-ink/65 p-5 sm:col-span-3 sm:p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-11 w-11 shrink-0 place-items-center border border-gold/35 bg-gold/10 text-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium tracking-[0.16em] text-gold",
												children: L("التعليم المتخصص", "SPECIALIST EDUCATION")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-2 font-display text-xl leading-7 text-bone sm:text-2xl",
												children: L("الجامعة الأردنية التطبيقية", "Jordan Applied University")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-bone/65",
												children: L("كلية تعليم الضيافة والسياحة", "College of Hospitality and Tourism Education")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-4 inline-flex items-center gap-2 border-t border-gold/15 pt-3 text-xs text-gold/85",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
													dateTime: "2012-03-01",
													children: L("1/3/2012", "1 March 2012")
												})]
											})
										] })]
									})
								}), [
									["شهادة خبرة من فندق لاند مارك", "Experience certificate — Landmark Amman Hotel"],
									["شهادة خبرة من فندق سنشري بارك", "Experience certificate — Century Park Hotel"],
									["شهادة خبرة من فندق فور سيزونز", "Experience certificate — Four Seasons Hotel"]
								].map(([nameAr, nameEn], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
									delay: (index + 1) * 80,
									className: "border border-gold/20 bg-ink/40 p-5 transition-colors hover:border-gold/45",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 font-display text-lg leading-7 text-bone",
											children: L(nameAr, nameEn)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs tracking-[0.13em] text-bone/50",
											children: L("خبرة فندقية في الأردن", "JORDAN HOTEL EXPERIENCE")
										})
									]
								}, nameEn))]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "reviews",
				className: "relative overflow-hidden bg-charcoal px-5 py-16 sm:px-8 sm:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute end-0 top-0 h-96 w-96 rounded-full bg-gold/[.045] blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-[1360px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: L("آراء الزباين", "Customer reviews") }),
						reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-9 grid gap-4 md:grid-cols-3",
							children: [
								1,
								2,
								3
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-56 animate-pulse border border-gold/15 bg-ink/55",
								"aria-hidden": "true"
							}, item))
						}) : reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: reviews.map((review, index) => {
								const text = lang === "ar" ? review.textAr ?? review.textEn : review.textEn ?? review.textAr;
								const city = lang === "ar" ? review.cityAr ?? review.cityEn : review.cityEn ?? review.cityAr;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: index % 3 * 80,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "group relative h-full overflow-hidden border border-gold/18 bg-ink/65 p-6 transition-colors duration-500 hover:border-gold/40 sm:p-7",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
												className: "h-7 w-7 text-gold/70 transition-transform duration-500 group-hover:-translate-y-1",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-5 flex text-gold",
												"aria-label": L(`${number.format(review.rating)} من ٥ نجوم`, `${review.rating} out of 5 stars`),
												children: Array.from({ length: 5 }, (_, starIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
													className: "h-4 w-4",
													fill: starIndex < review.rating ? "currentColor" : "none"
												}, starIndex))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-5 min-h-16 text-base leading-8 text-bone/85",
												children: text
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-7 border-t border-gold/12 pt-4 font-display text-lg text-gold",
												children: [review.name, city ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-sans text-sm text-muted-foreground",
													children: [" · ", city]
												}) : null]
											})
										]
									})
								}, review.id);
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 120,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewSubmissionForm, { onPublished: addReview })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "location",
				className: "relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1360px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "luxury-panel overflow-hidden p-5 sm:p-8 lg:p-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 lg:grid-cols-[1fr_.78fr] lg:gap-14",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: L("موقعنا", "LOCATION")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-3xl text-bone sm:text-5xl",
									children: L("مستنيينكم عالفطور.", "Come by for breakfast.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-5 flex max-w-lg items-start gap-3 leading-7 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-1 h-5 w-5 shrink-0 text-gold" }), L(restaurant.addressAr, restaurant.addressEn)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: restaurant.mapsUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "luxury-cta mt-7 w-full sm:w-auto",
									children: [L("إرشادات الطريق", "Get directions"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 ltr:rotate-180" })]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-gold/15 pt-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-3 font-display text-2xl text-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-5 w-5" }), L("ساعات العمل", "Opening hours")]
								}), restaurant.hours.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex justify-between gap-6 border-b border-gold/10 pb-4 text-sm text-bone/75",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: L(hour.daysAr, hour.daysEn) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										dir: "ltr",
										className: "shrink-0",
										children: L(hour.timeAr, hour.timeEn)
									})]
								}, hour.daysEn))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: restaurant.mapsUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "group relative mt-8 block overflow-hidden border border-gold/20",
							"aria-label": L("عرض موقع المطعم على الخريطة", "View restaurant location on Google Maps"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodImage, {
									src: "/images/location-map.png",
									alt: L("خريطة موقع مطعم الكمال في الرصيفة، الزرقاء", "Al Kamal Restaurant location in Russeifa, Zarqa"),
									className: "aspect-[16/9] w-full sm:aspect-[21/8]",
									imgClassName: "transition-transform duration-700 group-hover:scale-[1.035]",
									zoom: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute bottom-4 start-4 flex items-center gap-2 border border-gold/25 bg-ink/65 px-3 py-2 text-sm text-bone backdrop-blur sm:bottom-6 sm:start-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold" }), L("موقعنا في الرصيفة، الزرقاء", "Find us in Russeifa, Zarqa")]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
