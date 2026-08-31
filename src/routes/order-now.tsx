import { ArrowUpRight } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import talabatLogo from "../../logo/talabat.png";
import myThingsLogo from "../../logo/mythings.jpg";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { restaurant } from "@/config/restaurant";
import { useLang } from "@/hooks/use-lang";

export const Route = createFileRoute("/order-now")({ component: OrderNow });

function OrderNow() {
  const { L } = useLang();

  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <section className="bg-ink px-4 pb-12 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{L("اطلب أونلاين", "ORDER ONLINE")}</p>
          <h1 className="mt-3 text-4xl text-bone sm:mt-4 sm:text-6xl">
            {L("اطلب من الكمال", "Order from Al Kamal")}
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            {L(
              "اختر طلبات أو أشيائي للانتقال مباشرةً إلى صفحة المطعم وإتمام طلبك.",
              "Choose your preferred ordering platform to go directly to our restaurant page and complete your order.",
            )}
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <a
            href={restaurant.talabatUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={L("افتح صفحة مطعم الكمال على طلبات", "Open Al Kamal on Talabat")}
            className="group flex min-h-64 flex-col items-center justify-center border border-gold/25 bg-ink p-8 text-center shadow-[var(--shadow-lux)] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal sm:min-h-72"
          >
            <div className="flex h-24 w-52 items-center justify-center rounded-xl bg-white p-5 shadow-sm sm:h-28 sm:w-60">
              <img
                src={talabatLogo}
                alt="Talabat"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="mt-7 flex items-center gap-2 font-display text-2xl text-bone group-hover:text-gold">
              {L("افتح طلبات", "Open Talabat")}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              {L(
                "رابط المطعم على طلبات لا يعمل حاليًا وهو قيد الصيانة. ابحث عن «مطعم الكمال» على طلبات وستجدنا.",
                "Our restaurant link on Talabat is currently unavailable and under maintenance. Please search for “مطعم الكمال” on Talabat to find us.",
              )}
            </span>
          </a>
          <a
            href={restaurant.myThingsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={L("افتح صفحة مطعم الكمال على أشيائي", "Open Al Kamal on MyThings")}
            className="group flex min-h-64 flex-col items-center justify-center border border-gold/25 bg-ink p-8 text-center shadow-[var(--shadow-lux)] transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal sm:min-h-72"
          >
            <div className="flex h-24 w-52 items-center justify-center overflow-hidden rounded-xl bg-white p-3 shadow-sm sm:h-28 sm:w-60">
              <img
                src={myThingsLogo}
                alt="MyThings"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="mt-7 flex items-center gap-2 font-display text-2xl text-bone group-hover:text-gold">
              {L("اطلب عبر أشيائي", "Order via MyThings")}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-2 text-sm text-muted-foreground">
              {L("اضغط للانتقال إلى أشيائي", "Click to continue to MyThings")}
            </span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
