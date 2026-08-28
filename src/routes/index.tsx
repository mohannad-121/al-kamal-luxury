import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, Clock3, MapPin, Quote, Star } from "lucide-react";
import heroVideo from "../../videos/Create_a_high_end_cinematic_u.mp4";
import storefront from "@/assets/storefront.jpg.asset.json";
import { FoodImage } from "@/components/FoodImage";
import { Navbar } from "@/components/Navbar";
import { Price } from "@/components/Price";
import { Reveal } from "@/components/Reveal";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { restaurant } from "@/config/restaurant";
import {
  publicMenuSections,
  type PublicMenuItem,
  type PublicMenuSection,
} from "@/data/public-menu";
import { useLang } from "@/hooks/use-lang";
import { useReviews } from "@/hooks/use-reviews";

export const Route = createFileRoute("/")({ component: Index });

interface HomeHighlight {
  item: PublicMenuItem;
  section: PublicMenuSection;
}

const highlightIds = ["fatteh", "sandwich-falafel", "falafel-classic", "potato-box"];

const homepageHighlights: HomeHighlight[] = highlightIds.flatMap((id) => {
  const section = publicMenuSections.find((candidate) =>
    candidate.items.some((item) => item.id === id),
  );
  const item = section?.items.find((candidate) => candidate.id === id);
  return section && item ? [{ section, item }] : [];
});

const categoryLayouts = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-2",
  "sm:col-span-2 lg:col-span-2",
];

function useHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const sync = () => setEnabled(!motion.matches && !connection?.saveData);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return enabled;
}

function Index() {
  const { L, lang } = useLang();
  const { reviews, loading: reviewsLoading } = useReviews();
  const playHeroVideo = useHeroVideo();
  const number = useMemo(() => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"), [lang]);

  return (
    <main className="bg-ink">
      <Navbar />

      <section className="relative isolate min-h-[clamp(700px,94svh,900px)] overflow-hidden bg-ink">
        <FoodImage
          src={storefront.url}
          alt={L("واجهة مطعم الكمال ليلاً", "Al Kamal restaurant storefront at night")}
          eager
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="animate-ken object-[58%_center]"
        />
        {playHeroVideo ? (
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={storefront.url}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(270deg,oklch(0.105_0.004_60/.94),oklch(0.105_0.004_60/.7)_46%,oklch(0.105_0.004_60/.24))] ltr:bg-[linear-gradient(90deg,oklch(0.105_0.004_60/.94),oklch(0.105_0.004_60/.7)_46%,oklch(0.105_0.004_60/.24))]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_73%_42%,oklch(0.79_0.09_82/.12),transparent_24rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] veil" />
        <div className="pointer-events-none absolute inset-4 border border-gold/10 sm:inset-7" />
        <div className="ambient-glow pointer-events-none absolute -end-28 top-28 h-80 w-80 rounded-full bg-gold/10 blur-[90px]" />

        <div className="relative mx-auto flex min-h-[clamp(700px,94svh,900px)] max-w-[1400px] flex-col justify-end px-5 pb-9 pt-28 sm:px-8 sm:pb-12 lg:pb-14">
          <div className="max-w-3xl pb-9 sm:pb-12">
            <div className="hero-enter hero-enter-1 flex items-center gap-3 text-gold">
              <span className="h-px w-11 bg-gold" />
              <span className="eyebrow">{L("من قلب الرصيفة", "FROM RUSSEIFA")}</span>
            </div>
            <h1 className="hero-enter hero-enter-2 mt-5 text-[clamp(3rem,8vw,7.1rem)] leading-[1.12] text-bone sm:mt-7">
              {L("فطور شعبي،", "Jordanian breakfast,")}
              <span className="mt-1 block text-gold-gradient">
                {L("على أصوله.", "the traditional way.")}
              </span>
            </h1>
            <p className="hero-enter hero-enter-3 mt-5 max-w-2xl text-base leading-8 text-bone/78 sm:mt-7 sm:text-lg sm:leading-9">
              {L(
                "حمص وفول وفلافل وساندويشات، بنحضّرهم طازة كل يوم.",
                "Hummus, foul, falafel and sandwiches, made fresh every day.",
              )}
            </p>
            <div className="hero-enter hero-enter-4 mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link to="/menu" search={{ category: "all" }} className="luxury-cta w-full sm:w-auto">
                {L("شوف المنيو", "View the menu")}
                <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
              </Link>
              <Link to="/order-now" className="luxury-cta luxury-cta-outline w-full sm:w-auto">
                {L("اطلب الآن", "Order now")}
              </Link>
            </div>
          </div>

          <div className="hero-enter hero-enter-4 grid border-y border-gold/18 bg-ink/28 backdrop-blur-md sm:grid-cols-3">
            {[
              L("تحضير يومي", "Prepared daily"),
              L("فطور شعبي", "Jordanian breakfast"),
              L("الرصيفة، الزرقاء", "Russeifa, Zarqa"),
            ].map((title, index) => (
              <div
                key={title}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${index ? "border-t border-gold/15 sm:border-s sm:border-t-0" : ""}`}
              >
                <p className="text-sm font-medium text-bone/80 sm:text-base">{title}</p>
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute -start-40 top-20 h-96 w-96 rounded-full bg-gold/[.045] blur-3xl" />
        <div className="relative mx-auto max-w-[1360px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title={L("اختار قسمك", "Choose a section")} />
            <Link
              to="/menu"
              search={{ category: "all" }}
              className="group hidden items-center gap-2 pb-1 text-sm text-gold transition-colors hover:text-gold-soft sm:flex"
            >
              {L("المنيو كامل", "Full menu")}
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid auto-rows-[210px] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {publicMenuSections.map((section, index) => (
              <Reveal key={section.id} delay={(index % 4) * 70} className={categoryLayouts[index]}>
                <Link
                  to="/menu"
                  search={{ category: section.id }}
                  className="group relative block h-full overflow-hidden border border-gold/18 bg-charcoal focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <FoodImage
                    src={section.image}
                    alt={L(section.nameAr, section.nameEn)}
                    className="absolute inset-0 h-full w-full"
                    imgStyle={{ objectPosition: section.imagePosition }}
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.94),oklch(0.12_0.004_60/.14)_70%)] transition-colors duration-700 group-hover:bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.88),oklch(0.12_0.004_60/.04)_72%)]" />
                  <span className="absolute inset-0 border border-transparent transition-[inset,border-color] duration-700 group-hover:inset-2 group-hover:border-gold/45" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                    <span>
                      <span className="block text-[0.65rem] text-gold">
                        {number.format(section.items.length)} {L("أصناف", "items")}
                      </span>
                      <span className="mt-1 block font-display text-2xl text-bone sm:text-3xl">
                        {L(section.nameAr, section.nameEn)}
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/35 bg-ink/45 text-gold backdrop-blur transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="popular"
        className="relative overflow-hidden bg-charcoal px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-35" />
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title={L("الأكثر طلبًا", "Most ordered")} />
            <Link
              to="/menu"
              search={{ category: "all" }}
              className="luxury-cta luxury-cta-outline sm:mb-1"
            >
              {L("شوف كل الأسعار", "See all prices")}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepageHighlights.map(({ item, section }, index) => {
              const priced = item.options.filter(
                (option): option is typeof option & { price: number } => option.price !== undefined,
              );
              const from = priced.length ? Math.min(...priced.map((option) => option.price)) : null;

              return (
                <Reveal key={item.id} delay={index * 80}>
                  <Link
                    to="/menu"
                    search={{ category: section.id }}
                    className="group block h-full overflow-hidden border border-gold/18 bg-ink transition-[transform,border-color,box-shadow] duration-700 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_80px_-48px_oklch(0.716_0.107_78.5/.5)]"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <FoodImage
                        src={section.image}
                        alt={L(item.nameAr, item.nameEn)}
                        className="h-full w-full"
                        imgStyle={{ objectPosition: section.imagePosition }}
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <span className="absolute end-4 top-4 border border-gold/30 bg-ink/65 px-2.5 py-1 text-[0.65rem] text-gold backdrop-blur">
                        {L(section.nameAr, section.nameEn)}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl leading-8 text-bone transition-colors group-hover:text-gold-soft">
                          {L(item.nameAr, item.nameEn)}
                        </h3>
                        <ArrowLeft className="mt-1 h-4 w-4 shrink-0 text-gold transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.options.slice(0, 3).map((option) => (
                          <span
                            key={option.id}
                            className="border border-gold/15 bg-charcoal/60 px-2.5 py-1 text-xs text-bone/65"
                          >
                            {L(option.nameAr, option.nameEn)}
                          </span>
                        ))}
                      </div>
                      {from !== null ? (
                        <p className="mt-5 flex items-baseline justify-between border-t border-gold/12 pt-4 text-sm text-muted-foreground">
                          <span>{L("يبدأ من", "From")}</span>
                          <Price value={from} className="text-lg font-medium text-gold" />
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1.06fr_.94fr] lg:items-stretch lg:gap-14">
          <Reveal className="group relative min-h-[400px] overflow-hidden border border-gold/20 sm:min-h-[540px]">
            <FoodImage
              src="/images/levantine-bowls-premium.jpg"
              alt={L("حمص وفول ومسبّحة وقدسية", "Hummus, foul, msabbaha and qudsiyeh")}
              className="absolute inset-0 h-full w-full"
              imgClassName="object-[50%_55%]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <span className="absolute inset-5 border border-gold/20 transition-[inset,border-color] duration-700 group-hover:inset-7 group-hover:border-gold/45" />
          </Reveal>

          <div className="flex flex-col justify-center lg:py-8">
            <SectionHeading title={L("فطور طازة كل صباح", "Fresh breakfast every morning")} />
            <div className="mt-8 grid grid-cols-3 border-y border-gold/15">
              {[
                ["تحضير يومي", "MADE DAILY"],
                ["مكونات طازة", "FRESH INGREDIENTS"],
                ["على الطلب", "MADE TO ORDER"],
              ].map(([ar, en], index) => (
                <Reveal
                  key={en}
                  delay={index * 90}
                  className={`px-3 py-6 text-center ${index ? "border-s border-gold/15" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-1.5 w-1.5 rotate-45 bg-gold"
                  />
                  <p className="mt-3 text-sm font-medium text-bone sm:text-base">{L(ar, en)}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={260} className="mt-8">
              <Link
                to="/menu"
                search={{ category: "boxes" }}
                className="luxury-cta w-full sm:w-auto"
              >
                {L("شوف الأصناف", "View items")}
                <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="reviews"
        className="relative overflow-hidden bg-charcoal px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="pointer-events-none absolute end-0 top-0 h-96 w-96 rounded-full bg-gold/[.045] blur-3xl" />
        <div className="relative mx-auto max-w-[1360px]">
          <SectionHeading title={L("آراء الزباين", "Customer reviews")} />

          {reviewsLoading ? (
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-56 animate-pulse border border-gold/15 bg-ink/55"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => {
                const text =
                  lang === "ar"
                    ? (review.textAr ?? review.textEn)
                    : (review.textEn ?? review.textAr);
                const city =
                  lang === "ar"
                    ? (review.cityAr ?? review.cityEn)
                    : (review.cityEn ?? review.cityAr);
                return (
                  <Reveal key={review.id} delay={(index % 3) * 80}>
                    <article className="group relative h-full overflow-hidden border border-gold/18 bg-ink/65 p-6 transition-colors duration-500 hover:border-gold/40 sm:p-7">
                      <Quote
                        className="h-7 w-7 text-gold/70 transition-transform duration-500 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                      <div
                        className="mt-5 flex text-gold"
                        aria-label={L(
                          `${number.format(review.rating)} من ٥ نجوم`,
                          `${review.rating} out of 5 stars`,
                        )}
                      >
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star
                            key={starIndex}
                            className="h-4 w-4"
                            fill={starIndex < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="mt-5 min-h-16 text-base leading-8 text-bone/85">{text}</p>
                      <p className="mt-7 border-t border-gold/12 pt-4 font-display text-lg text-gold">
                        {review.name}
                        {city ? (
                          <span className="font-sans text-sm text-muted-foreground"> · {city}</span>
                        ) : null}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal className="mt-10 border border-gold/18 bg-ink/55 p-8 text-center text-muted-foreground">
              {L("لسا ما في مراجعات.", "No reviews yet.")}
            </Reveal>
          )}

          <Reveal delay={120}>
            <ReviewSubmissionForm />
          </Reveal>
        </div>
      </section>

      <section
        id="location"
        className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-[1360px]">
          <Reveal className="luxury-panel overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_.78fr] lg:gap-14">
              <div>
                <p className="eyebrow">{L("موقعنا", "LOCATION")}</p>
                <h2 className="mt-4 text-3xl text-bone sm:text-5xl">
                  {L("مستنيينكم عالفطور.", "Come by for breakfast.")}
                </h2>
                <p className="mt-5 flex max-w-lg items-start gap-3 leading-7 text-muted-foreground">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  {L(restaurant.addressAr, restaurant.addressEn)}
                </p>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-cta mt-7 w-full sm:w-auto"
                >
                  {L("إرشادات الطريق", "Get directions")}
                  <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
                </a>
              </div>

              <div className="border-t border-gold/15 pt-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
                <p className="flex items-center gap-3 font-display text-2xl text-gold">
                  <Clock3 className="h-5 w-5" />
                  {L("ساعات العمل", "Opening hours")}
                </p>
                {restaurant.hours.map((hour) => (
                  <div
                    key={hour.daysEn}
                    className="mt-5 flex justify-between gap-6 border-b border-gold/10 pb-4 text-sm text-bone/75"
                  >
                    <span>{L(hour.daysAr, hour.daysEn)}</span>
                    <span dir="ltr" className="shrink-0">
                      {L(hour.timeAr, hour.timeEn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative mt-8 block overflow-hidden border border-gold/20"
              aria-label={L(
                "عرض موقع المطعم على الخريطة",
                "View restaurant location on Google Maps",
              )}
            >
              <FoodImage
                src="/images/location-map.png"
                alt={L(
                  "خريطة موقع مطعم الكمال في الرصيفة، الزرقاء",
                  "Al Kamal Restaurant location in Russeifa, Zarqa",
                )}
                className="aspect-[16/9] w-full sm:aspect-[21/8]"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.035]"
                zoom={false}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <span className="absolute bottom-4 start-4 flex items-center gap-2 border border-gold/25 bg-ink/65 px-3 py-2 text-sm text-bone backdrop-blur sm:bottom-6 sm:start-6">
                <MapPin className="h-4 w-4 text-gold" />
                {L("موقعنا في الرصيفة، الزرقاء", "Find us in Russeifa, Zarqa")}
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
