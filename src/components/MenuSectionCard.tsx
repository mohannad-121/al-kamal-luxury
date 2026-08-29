import { useId, useMemo, useState } from "react";
import { FoodImage } from "@/components/FoodImage";
import { Price } from "@/components/Price";
import { type PublicMenuSection } from "@/data/public-menu";
import { getMenuItemPhoto } from "@/data/menu-item-images";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export interface MenuSectionCardProps {
  section: PublicMenuSection;
  className?: string;
  eager?: boolean;
  availabilityByOptionKey?: ReadonlyMap<string, boolean>;
}

function optionAvailabilityKey(categoryId: string, itemNameAr: string, optionNameAr: string) {
  return `${categoryId}::${itemNameAr} — ${optionNameAr}`;
}

/** Editorial section image followed by a compact, scannable price list. */
export function MenuSectionCard({
  section,
  className,
  eager = false,
  availabilityByOptionKey,
}: MenuSectionCardProps) {
  const { lang, L } = useLang();
  const generatedId = useId().replaceAll(":", "");
  const headingId = `menu-section-${section.id}-${generatedId}`;
  const summaryId = `${headingId}-summary`;
  const sectionName = L(section.nameAr, section.nameEn);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const optionCount = section.items.reduce((total, item) => total + item.options.length, 0);
  const quantityNumber = useMemo(
    () => new Intl.NumberFormat(lang === "ar" ? "ar-JO" : "en-JO"),
    [lang],
  );

  return (
    <article
      id={`menu-${section.id}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      aria-labelledby={headingId}
      aria-describedby={summaryId}
      className={cn(
        "group/card relative isolate scroll-mt-32 overflow-hidden border border-gold/20 bg-ink/90 shadow-[0_28px_80px_-58px_rgba(0,0,0,.9)] transition-[border-color,box-shadow] duration-500 hover:border-gold/35 hover:shadow-[0_32px_88px_-56px_oklch(0.716_0.107_78.5/.28)] motion-reduce:transition-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-60"
      />

      <header className="relative h-[15.5rem] overflow-hidden border-b border-gold/15 sm:h-[18rem]">
        <FoodImage
          src={section.image}
          alt={L(`صورة قسم ${section.nameAr}`, `${section.nameEn} section`)}
          eager={eager}
          className="absolute inset-0 h-full w-full"
          imgClassName="group-hover/card:scale-[1.04] group-hover/card:saturate-[1.04]"
          imgStyle={{ objectPosition: section.imagePosition }}
          zoom={false}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.12_0.004_60/.96)_0%,oklch(0.12_0.004_60/.68)_34%,oklch(0.12_0.004_60/.1)_74%,oklch(0.12_0.004_60/.24)_100%)]"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <h2
            id={headingId}
            className="font-display text-[2rem] leading-[1.25] text-bone drop-shadow-[0_3px_14px_rgba(0,0,0,.7)] sm:text-[2.5rem]"
          >
            {sectionName}
          </h2>
          <p id={summaryId} className="mt-2 text-xs text-bone/70 sm:text-sm">
            {L(
              `الأصناف: ${quantityNumber.format(section.items.length)} · الخيارات: ${quantityNumber.format(optionCount)}`,
              `${quantityNumber.format(section.items.length)} items · ${quantityNumber.format(optionCount)} options`,
            )}
          </p>
        </div>
      </header>

      <ol
        aria-label={L(`أصناف ${section.nameAr}`, `${section.nameEn} items`)}
        className={cn("grid gap-px bg-gold/10 p-px", section.items.length > 3 && "md:grid-cols-2")}
      >
        {section.items.map((item) => {
          const isOpen = openItemId === item.id;
          const image = getMenuItemPhoto(section.id, item.nameAr, item.nameEn, section.image);
          const itemAvailable = item.options.every(
            (option) =>
              availabilityByOptionKey?.get(
                optionAvailabilityKey(section.id, item.nameAr, option.nameAr),
              ) ?? true,
          );

          return (
            <li
              key={item.id}
              className={cn(
                "group/dish relative bg-[oklch(0.165_0.005_60)] px-4 py-5 transition-colors duration-300 hover:bg-[oklch(0.185_0.007_60)] motion-reduce:transition-none sm:px-5 sm:py-6",
                item.featured &&
                  "bg-[linear-gradient(145deg,oklch(0.19_0.009_70),oklch(0.155_0.004_60))]",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 start-0 w-px origin-center scale-y-0 bg-gold/80 transition-transform duration-300 group-hover/dish:scale-y-100 motion-reduce:transition-none"
              />

              <button
                type="button"
                onClick={() => setOpenItemId((current) => (current === item.id ? null : item.id))}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <FoodImage
                  src={image}
                  alt={L(item.nameAr, item.nameEn)}
                  className="h-16 w-16 shrink-0 border border-gold/15"
                  zoom={false}
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.05rem] leading-7 text-cream sm:text-lg">
                    {L(item.nameAr, item.nameEn)}
                  </span>
                  <span className="mt-1 block text-xs text-gold/75">
                    {isOpen
                      ? L("إخفاء التفاصيل", "Hide details")
                      : L("اضغط لعرض التفاصيل", "Tap to view details")}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 border px-2 py-1 text-[0.6rem] font-medium tracking-[0.1em]",
                    itemAvailable
                      ? "border-emerald-300/35 text-emerald-200"
                      : "border-bone/25 text-bone/70",
                  )}
                >
                  {itemAvailable ? L("متوفر", "AVAILABLE") : L("غير متوفر", "NOT AVAILABLE")}
                </span>
                {item.featured ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.6rem] font-medium text-gold">
                    <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
                    {L("مميّز", "Featured")}
                  </span>
                ) : null}
              </button>

              {isOpen ? (
                <ul
                  aria-label={L(`خيارات ${item.nameAr}`, `${item.nameEn} options`)}
                  className="mt-3 border-t border-bone/[0.07]"
                >
                  {item.options.map((option) => {
                    const available =
                      availabilityByOptionKey?.get(
                        optionAvailabilityKey(section.id, item.nameAr, option.nameAr),
                      ) ?? true;
                    return (
                      <li
                        key={option.id}
                        className="group/option grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-bone/[0.055] py-2.5 last:border-b-0"
                      >
                        <span className="min-w-0 text-sm leading-6 text-bone/75 transition-colors duration-300 group-hover/option:text-bone motion-reduce:transition-none">
                          {L(option.nameAr, option.nameEn)}
                        </span>
                        <span className="inline-flex min-w-[7.5rem] items-center justify-end gap-2 border-s border-gold/10 ps-3 text-sm text-gold transition-colors duration-300 group-hover/option:text-gold-soft motion-reduce:transition-none">
                          {option.price !== undefined ? (
                            <Price value={option.price} className="font-semibold" />
                          ) : null}
                          <span
                            className={cn(
                              "border px-2 py-1 text-[0.6rem] font-medium tracking-[0.1em]",
                              available
                                ? "border-emerald-300/35 text-emerald-200"
                                : "border-bone/25 text-bone/70",
                            )}
                          >
                            {available ? L("متوفر", "AVAILABLE") : L("غير متوفر", "NOT AVAILABLE")}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </article>
  );
}
