import { Link } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { useLang } from "@/hooks/use-lang";

export function SiteFooter() {
  const { L } = useLang();
  return (
    <footer className="hidden border-t border-gold/20 bg-ink px-5 pb-24 pt-14 sm:px-8 sm:pb-10 md:block">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.2fr_.8fr_.9fr]">
        <div>
          <p className="font-display text-3xl text-gold">
            {L(restaurant.nameAr, restaurant.nameEn)}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
            {L(restaurant.sloganAr, restaurant.sloganEn)}
          </p>
        </div>
        <div>
          <p className="eyebrow">{L("روابط سريعة", "QUICK LINKS")}</p>
          <div className="mt-4 grid gap-2 text-sm text-bone/75">
            <Link to="/menu" className="hover:text-gold">
              {L("المنيو", "Menu")}
            </Link>
            <Link to="/track-order" className="hover:text-gold">
              {L("تتبع الطلب", "Track order")}
            </Link>
            <Link to="/" hash="location" className="hover:text-gold">
              {L("موقعنا", "Our location")}
            </Link>
          </div>
        </div>
        <div className="space-y-3 text-sm text-bone/75">
          <p className="eyebrow">{L("تواصل", "CONTACT")}</p>
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" />
            {restaurant.phone}
          </a>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 hover:text-gold"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {L(restaurant.addressAr, restaurant.addressEn)}
          </a>
          <span className="flex items-start gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {L(restaurant.hours[0].timeAr, restaurant.hours[0].timeEn)}
          </span>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-gold/15 pt-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {L(restaurant.nameAr, restaurant.nameEn)}
      </div>
    </footer>
  );
}
