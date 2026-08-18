import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CircleCheck, Clock3, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GoldButton } from "@/components/GoldButton";
import { Price } from "@/components/Price";
import { SiteFooter } from "@/components/SiteFooter";
import { useLang } from "@/hooks/use-lang";
import { trackOrder } from "@/services";
import type { Order } from "@/types";

export const Route = createFileRoute("/track-order")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search.order === "string" ? search.order : "",
  }),
  component: TrackOrder,
});
const flow = ["received", "preparing", "ready", "on_the_way", "delivered"] as const;
const labels = {
  received: ["تم استلام الطلب", "Order received"],
  preparing: ["قيد التحضير", "Preparing"],
  ready: ["جاهز للاستلام", "Ready"],
  on_the_way: ["خرج للتوصيل", "On the way"],
  delivered: ["تم التوصيل", "Delivered"],
} as const;
function TrackOrder() {
  const { L } = useLang();
  const { order: initial } = Route.useSearch();
  const [number, setNumber] = useState(initial);
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setOrder(await trackOrder(number, phone));
    setSearched(true);
    setLoading(false);
  };
  const current = order
    ? flow.indexOf(order.status === "cancelled" ? "received" : order.status)
    : -1;
  return (
    <main>
      <Navbar />
      <section className="min-h-screen bg-charcoal px-4 pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-center eyebrow">{L("تتبع طلبك", "ORDER TRACKING")}</p>
          <h1 className="mt-3 text-center text-3xl text-bone sm:mt-4 sm:text-5xl">
            {L("وين وصل طلبك؟", "Where is your order?")}
          </h1>
          <form
            onSubmit={search}
            className="mt-6 grid gap-3 border border-gold/20 bg-ink/50 p-4 sm:mt-8 sm:grid-cols-[1fr_1fr_auto] sm:p-6"
          >
            <input
              required
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              className="h-12 border border-gold/20 bg-charcoal px-4 text-base text-bone outline-none focus:border-gold/60 sm:text-sm"
              placeholder={L("رقم الطلب: AK-1048", "Order number: AK-1048")}
              dir="ltr"
            />
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-12 border border-gold/20 bg-charcoal px-4 text-base text-bone outline-none focus:border-gold/60 sm:text-sm"
              placeholder={L("رقم الموبايل", "Mobile number")}
              dir="ltr"
            />
            <GoldButton disabled={loading} type="submit">
              {loading ? (
                <Clock3 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {L("تتبع", "Track")}
            </GoldButton>
          </form>
          {searched && !order && (
            <div className="mt-6 border border-gold/15 bg-ink/40 p-7 text-center">
              <p className="font-display text-xl text-bone">
                {L("ما قدرنا نلاقي هالطلب", "We couldn’t find this order")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {L(
                  "تأكد من رقم الطلب ورقم الموبايل وحاول مرة ثانية.",
                  "Check the order number and mobile number, then try again.",
                )}
              </p>
            </div>
          )}
          {order && (
            <article className="mt-7 border border-gold/25 bg-ink p-6 sm:p-8">
              <div className="flex flex-wrap justify-between gap-3 border-b border-gold/15 pb-5">
                <div>
                  <p className="eyebrow">{order.id}</p>
                  <h2 className="mt-2 text-2xl text-bone">
                    {L("طلب", "Order")}{" "}
                    {order.type === "delivery" ? L("توصيل", "delivery") : L("استلام", "pickup")}
                  </h2>
                </div>
                <span className="h-fit border border-gold/30 px-3 py-2 text-sm text-gold">
                  {L(...labels[order.status === "cancelled" ? "received" : order.status])}
                </span>
              </div>
              <ol className="mt-8 grid gap-5 sm:grid-cols-5">
                {flow.map((step, index) => (
                  <li key={step} className="relative text-center sm:text-start">
                    <span
                      className={`mx-auto grid h-8 w-8 place-items-center rounded-full border sm:mx-0 ${index <= current ? "border-gold bg-gold text-ink" : "border-gold/25 text-muted-foreground"}`}
                    >
                      {index <= current ? (
                        <CircleCheck className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </span>
                    <p
                      className={`mt-2 text-xs ${index <= current ? "text-gold" : "text-muted-foreground"}`}
                    >
                      {L(...labels[step])}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-gold/15 pt-5">
                <p className="text-sm text-muted-foreground">{L("محتويات الطلب", "ORDER ITEMS")}</p>
                {order.items.map((item, index) => (
                  <div
                    key={`${item.nameAr}-${index}`}
                    className="mt-3 flex justify-between text-sm"
                  >
                    <span className="text-bone/80">
                      {item.qty}× {item.nameAr}
                    </span>
                    <span className="text-gold">
                      <Price value={item.price * item.qty} />
                    </span>
                  </div>
                ))}
                <div className="mt-5 flex justify-between border-t border-gold/15 pt-4 font-display text-lg text-bone">
                  <span>{L("الإجمالي", "Total")}</span>
                  <span className="text-gold">
                    <Price value={order.total} />
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
      <section className="bg-ink px-5 py-14 text-center">
        <p className="text-bone">{L("لسا ما طلبت؟", "Haven’t ordered yet?")}</p>
        <Link to="/menu">
          <GoldButton className="mt-4">{L("اطلب الآن", "Order now")}</GoldButton>
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
