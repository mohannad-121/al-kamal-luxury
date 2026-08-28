import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GoldButton } from "@/components/GoldButton";
import { SiteFooter } from "@/components/SiteFooter";
import { useLang } from "@/hooks/use-lang";

export const Route = createFileRoute("/order-confirmed")({
  beforeLoad: () => {
    throw redirect({ to: "/menu", search: { category: "all" } });
  },
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search.order === "string" ? search.order : "",
  }),
  component: Confirmed,
});

function Confirmed() {
  const { L } = useLang();
  const { order } = Route.useSearch();
  return (
    <main>
      <Navbar />
      <section className="flex min-h-[74dvh] items-center bg-ink px-4 py-[calc(6rem+env(safe-area-inset-top))] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/45 bg-gold/10 text-gold">
            <CheckCircle2 className="h-10 w-10" />
          </span>
          <p className="mt-8 eyebrow">{L("تم تأكيد الطلب", "ORDER CONFIRMED")}</p>
          <h1 className="mt-4 text-4xl leading-tight text-bone sm:text-5xl">
            {L("شكرًا! طلبك صار عندنا.", "Thanks! Your order is confirmed.")}
          </h1>
          <p className="mt-5 leading-8 text-muted-foreground">
            {L("خلّي رقم الطلب معك عشان تقدر تتابعه.", "Keep your order number to track it.")}
          </p>
          <div className="mt-8 border border-gold/30 bg-charcoal/60 p-6">
            <p className="text-sm text-muted-foreground">{L("رقم الطلب", "ORDER NUMBER")}</p>
            <p className="mt-2 font-display text-4xl tracking-wide text-gold">
              {order || "AK-1049"}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/track-order" search={{ order }}>
              <GoldButton size="lg">
                <ClipboardList className="h-4 w-4" />
                {L("تتبع الطلب", "Track order")}
              </GoldButton>
            </Link>
            <Link to="/menu">
              <GoldButton size="lg" variant="outline">
                {L("العودة للمنيو", "Back to menu")}
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
