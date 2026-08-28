import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { useLang } from "@/hooks/use-lang";

export function SiteFooter() {
  const { L } = useLang();
  return (
    <footer className="relative border-t border-gold/20 bg-[#0b0a09] px-5 pb-28 pt-14 sm:px-8 sm:pb-12 sm:pt-16">
      <div className="mx-auto grid max-w-[1360px] gap-9 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 lg:grid-cols-[1.25fr_.75fr_1fr] lg:gap-14">
        <section aria-labelledby="footer-brand" className="sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            className="group inline-flex max-w-full items-center gap-4 rounded-[var(--control-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/70 focus-visible:ring-offset-3 focus-visible:ring-offset-[#0b0a09]"
          >
            <span className="grid h-13 w-13 shrink-0 place-items-center overflow-hidden rounded-[var(--control-radius)] border border-gold/30 bg-ink/70 p-1.5 transition-colors duration-200 group-hover:border-gold/55 motion-reduce:transition-none">
              <img src="/favicon.svg" alt="" className="h-full w-full object-contain" />
            </span>
            <span
              id="footer-brand"
              className="min-w-0 font-display text-2xl leading-tight text-gold-soft transition-colors duration-200 group-hover:text-gold sm:text-3xl"
            >
              {L(restaurant.nameAr, restaurant.nameEn)}
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:mt-5">
            {L(restaurant.sloganAr, restaurant.sloganEn)}
          </p>
        </section>

        <nav
          aria-label={L("روابط سريعة", "Quick links")}
          className="border-t border-gold/12 pt-7 sm:border-t-0 sm:pt-0"
        >
          <p className="eyebrow">{L("روابط سريعة", "QUICK LINKS")}</p>
          <div className="mt-4 grid text-sm text-bone/72">
            <Link
              to="/menu"
              className="flex min-h-11 items-center border-b border-gold/[.08] text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none"
            >
              {L("المنيو", "Menu")}
            </Link>
            <Link
              to="/order-now"
              className="flex min-h-11 items-center border-b border-gold/[.08] text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none"
            >
              {L("اطلب الآن", "Order now")}
            </Link>
            <Link
              to="/"
              hash="location"
              className="flex min-h-11 items-center text-bone/72 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none"
            >
              {L("موقعنا", "Our location")}
            </Link>
          </div>
        </nav>

        <address className="border-t border-gold/12 pt-7 text-sm not-italic text-bone/72 sm:border-t-0 sm:pt-0">
          <p className="eyebrow">{L("تواصل", "CONTACT")}</p>
          <div className="mt-4 grid gap-2">
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
              className="flex min-h-11 items-center gap-3 rounded-[var(--control-radius)] transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none"
            >
              <span className="grid h-8 w-6 shrink-0 place-items-center text-gold">
                <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span dir="ltr">{restaurant.phone}</span>
            </a>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-start gap-3 rounded-[var(--control-radius)] py-1.5 leading-6 transition-colors duration-200 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/65 motion-reduce:transition-none"
            >
              <span className="grid h-8 w-6 shrink-0 place-items-center text-gold">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span>{L(restaurant.addressAr, restaurant.addressEn)}</span>
            </a>
            <div className="flex min-h-11 items-start gap-3 py-1.5 leading-6">
              <span className="grid h-8 w-6 shrink-0 place-items-center text-gold">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span>{L(restaurant.hours[0].timeAr, restaurant.hours[0].timeEn)}</span>
            </div>
          </div>
        </address>
      </div>

      <div className="mx-auto mt-11 max-w-[1360px] border-t border-gold/15 pt-5 text-center text-[0.7rem] text-muted-foreground sm:mt-14">
        <span>
          © {new Date().getFullYear()} {L(restaurant.nameAr, restaurant.nameEn)}
        </span>
      </div>
    </footer>
  );
}
