import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Quote, Sparkles, Star } from "lucide-react";
import heroVideo from "../../videos/Create_a_high_end_cinematic_u.mp4";
import storefront from "@/assets/storefront.jpg.asset.json";
import chef from "@/assets/chef.jpg.asset.json";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { FoodImage } from "@/components/FoodImage";
import { GoldButton } from "@/components/GoldButton";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";
import { SiteFooter } from "@/components/SiteFooter";
import { images } from "@/data/menu";
import { categories } from "@/data/categories";
import { restaurant } from "@/config/restaurant";
import { useLang } from "@/hooks/use-lang";
import { useMenu } from "@/hooks/use-menu";
import { useReviews } from "@/hooks/use-reviews";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { L, lang } = useLang();
  const { products } = useMenu();
  const { reviews, loading: reviewsLoading } = useReviews();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return (
    <main>
      <Navbar />
      <section className="relative isolate min-h-[620px] overflow-hidden bg-ink sm:min-h-[780px]">
        <FoodImage
          src={storefront.url}
          alt={L("واجهة مطعم الكمال ليلاً", "Al Kamal restaurant storefront at night")}
          eager
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="animate-ken object-[58%_center]"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,.93)_0%,rgba(9,9,9,.62)_44%,rgba(9,9,9,.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 veil" />
        <div className="relative mx-auto flex min-h-[620px] max-w-[1400px] items-end px-5 pb-16 pt-24 sm:min-h-screen sm:px-8 sm:pb-28 sm:pt-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">{L("مطعم الكمال · الرصيفة", "AL KAMAL · RUSSEIFA")}</span>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[1.3] text-bone sm:mt-6 sm:text-7xl lg:text-8xl">
              {L("نكهة الكمال،", "The taste of")}
              <br />
              <span className="text-gold-gradient">{L("على أصولها.", "perfection.")}</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-bone/75 sm:mt-6 sm:text-lg sm:leading-8">
              {L(
                "أكل شعبي بطعم الكمال، مكونات طازجة، وصفات متوارثة، وتحضير يومي بكل حب.",
                "Jordanian favorites, fresh ingredients and a recipe perfected every morning.",
              )}
            </p>
            <div className="mt-7 sm:mt-9">
              <Link to="/menu" className="inline-block w-full sm:w-auto">
                <GoldButton size="lg" className="w-full sm:w-auto">
                  {L("اكتشف المنيو", "Explore menu")}
                </GoldButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{L("اختار اللي عبالك", "START HERE")}</p>
              <h2 className="mt-3 text-3xl text-bone sm:text-4xl">
                {L("صباح الكمال يبدأ بطلبك", "Your Al Kamal morning")}
              </h2>
            </div>
            <Link
              to="/menu"
              className="hidden items-center gap-1 text-sm text-gold hover:text-gold-soft sm:flex"
            >
              {L("كل المنيو", "Full menu")}
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                to="/menu"
                search={{ category: category.id }}
                className="group relative h-36 min-w-40 overflow-hidden border border-gold/15 sm:h-44 sm:min-w-0"
              >
                <FoodImage
                  src={category.image}
                  alt={L(category.nameAr, category.nameEn)}
                  className="h-full w-full"
                />
                <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/5" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 font-display text-lg text-bone">
                  {L(category.nameAr, category.nameEn)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="popular" className="bg-charcoal px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="eyebrow">{L("الأكثر طلباً", "MOST LOVED")}</p>
          <div className="mb-7 mt-3 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
            <h2 className="text-3xl text-bone sm:text-5xl">
              {L("أطباق ما بتغيب عن البال", "The dishes everyone returns for")}
            </h2>
            <Link to="/menu">
              <GoldButton variant="outline">{L("شاهد المنيو", "View menu")}</GoldButton>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="relative order-2 min-h-80 border border-gold/20 lg:order-1">
            <FoodImage
              src={images.hummusMeat}
              alt={L("حمص باللحمة", "Hummus with meat")}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 veil" />
            <p className="absolute bottom-6 start-6 font-display text-3xl text-gold">
              {L("طازج كل صباح", "Fresh each morning")}
            </p>
          </div>
          <div className="lg:ps-10">
            <p className="eyebrow">{L("الأصل في التفاصيل", "MADE WITH CARE")}</p>
            <h2 className="mt-4 text-4xl leading-tight text-bone sm:text-5xl">
              {L("طعم بتحسّه من أول لقمة.", "A flavor you recognize from the first bite.")}
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
              {L(
                "من الفول المطبوخ على مهله، إلى الحمص الناعم والفلافل الساخنة، نحضّر كل طبق بنفس العناية التي جعلت الأكل الشعبي محبوباً.",
                "From slow-cooked foul to silky hummus and hot falafel, every plate is made with the care that defines local food.",
              )}
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-gold/20 pt-6">
              {[
                ["يومياً", "DAILY"],
                ["طازج", "FRESH"],
                ["أصيل", "AUTHENTIC"],
              ].map(([ar, en]) => (
                <div key={en}>
                  <Sparkles className="h-4 w-4 text-gold" />
                  <p className="mt-2 font-display text-lg text-bone">{L(ar, en)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {false ? (
        <section id="story" className="bg-cream px-5 py-20 text-ink sm:px-8">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">{L("حكاية العلامة", "OUR SIGNATURE")}</p>
              <h2 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">
                {L(
                  "أسود أنيق، ذهب دافئ، وطعم ما بينتسى.",
                  "A black-and-gold signature, with a taste you remember.",
                )}
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-ink/65">
                {L(
                  "تفاصيل مطعم الكمال مستوحاة من مطبخنا: الثقة في الأسود، دفء الذهب، والكرم في كل طبق نقدمه لك.",
                  "Al Kamal is shaped by our kitchen: black for confidence, gold for warmth, and generosity in every plate.",
                )}
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-ink/65">
                <span className="flex text-gold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                {L("اختيار أهل عمّان للفطور الشعبي", "A favorite for Amman breakfasts")}
              </div>
            </div>
            <div className="relative min-h-[440px] border border-ink/15">
              <FoodImage
                src={chef.url}
                alt={L("زي شيف مطعم الكمال", "Al Kamal chef uniform")}
                className="absolute inset-0 h-full w-full"
                imgClassName="object-[48%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <p className="absolute bottom-7 start-7 font-display text-3xl text-gold">
                {L("مطعم الكمال", "AL KAMAL")}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section id="reviews" className="bg-ink px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-2xl">
            <p className="eyebrow">{L("آراء ضيوفنا", "GUEST REVIEWS")}</p>
            <h2 className="mt-3 text-3xl text-bone sm:text-5xl">
              {L("كلامكم هو سرّ الكمال.", "Your words mean everything.")}
            </h2>
            <p className="mt-4 hidden leading-7 text-muted-foreground">
              {L(
                "نشارك فقط آراء الزبائن التي تمّت مراجعتها واعتمادها.",
                "Only reviewed and approved customer feedback is shared here.",
              )}
            </p>
          </div>
          <p className="mt-4 leading-7 text-muted-foreground">
            {L(
              "نشارك آراء زبائننا وتجاربهم معنا.",
              "We share our customers’ feedback and experiences with us.",
            )}
          </p>

          {reviewsLoading ? (
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-56 animate-pulse border border-gold/15 bg-charcoal/60"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => {
                const text = lang === "ar" ? review.textAr ?? review.textEn : review.textEn ?? review.textAr;
                const city = lang === "ar" ? review.cityAr ?? review.cityEn : review.cityEn ?? review.cityAr;
                return (
                  <article key={review.id} className="border border-gold/20 bg-charcoal/60 p-6 sm:p-7">
                    <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
                    <div className="mt-5 flex text-gold" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className="h-4 w-4"
                          fill={index < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="mt-4 min-h-16 leading-8 text-bone">{text}</p>
                    <p className="mt-6 border-t border-gold/15 pt-4 font-display text-lg text-gold">
                      {review.name}
                      {city ? <span className="font-sans text-sm text-muted-foreground"> · {city}</span> : null}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-9 border border-gold/20 bg-charcoal/50 p-7 text-center text-muted-foreground">
              {L("ستظهر آراء زبائننا هنا قريباً.", "Customer reviews will appear here soon.")}
            </div>
          )}
          <ReviewSubmissionForm />
        </div>
      </section>

      <section id="location" className="bg-charcoal px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px] border border-gold/20 bg-ink/40 p-7 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="eyebrow">{L("تعال زورنا", "VISIT US")}</p>
              <h2 className="mt-4 text-4xl text-bone">
                {L("نستناك على الفطور", "Join us for breakfast")}
              </h2>
              <p className="mt-5 flex max-w-lg items-start gap-3 leading-7 text-muted-foreground">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                {L(restaurant.addressAr, restaurant.addressEn)}
              </p>
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-block"
              >
                <GoldButton>{L("إرشادات الطريق", "Get directions")}</GoldButton>
              </a>
            </div>
            <div className="border-s border-gold/15 ps-0 lg:ps-10">
              <p className="font-display text-2xl text-gold">{L("ساعات العمل", "Opening hours")}</p>
              {restaurant.hours.map((hour) => (
                <div
                  key={hour.daysEn}
                  className="mt-4 flex justify-between border-b border-gold/10 pb-3 text-sm text-bone/75"
                >
                  <span>{L(hour.daysAr, hour.daysEn)}</span>
                  <span dir="ltr">{L(hour.timeAr, hour.timeEn)}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-8 block overflow-hidden border border-gold/25"
            aria-label={L("عرض موقع المطعم على الخريطة", "View restaurant location on Google Maps")}
          >
            <FoodImage
              src="/images/location-map.png"
              alt={L(
                "خريطة موقع مطعم الكمال في الرصيفة، الزرقاء",
                "Al Kamal Restaurant location in Russeifa, Zarqa",
              )}
              className="aspect-[16/8] w-full sm:aspect-[21/8]"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
              zoom={false}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <span className="absolute bottom-5 start-5 flex items-center gap-2 text-sm text-bone">
              <MapPin className="h-4 w-4 text-gold" />
              {L("موقعنا في الرصيفة، الزرقاء", "Find us in Russeifa, Zarqa")}
            </span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
