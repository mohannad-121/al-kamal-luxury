import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CookingPot,
  LayoutDashboard,
  PackageCheck,
  UtensilsCrossed,
} from "lucide-react";
import { GoldButton } from "@/components/GoldButton";
import { Price } from "@/components/Price";
import { useLang } from "@/hooks/use-lang";
import { getOrders } from "@/services";
import type { Order, OrderStatus } from "@/types";

export const Route = createFileRoute("/admin")({ component: Admin });

const statuses: Record<OrderStatus, { ar: string; en: string }> = {
  received: { ar: "طلب جديد", en: "New order" },
  preparing: { ar: "قيد التحضير", en: "Preparing" },
  ready: { ar: "جاهز", en: "Ready" },
  on_the_way: { ar: "خرج للتوصيل", en: "On the way" },
  delivered: { ar: "تم التوصيل", en: "Delivered" },
  cancelled: { ar: "ملغي", en: "Cancelled" },
};

const statusClasses: Record<OrderStatus, string> = {
  received: "border-gold/50 bg-gold/10 text-gold",
  preparing: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  ready: "border-sky-300/35 bg-sky-300/10 text-sky-200",
  on_the_way: "border-violet-300/35 bg-violet-300/10 text-violet-200",
  delivered: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
  cancelled: "border-red-300/35 bg-red-300/10 text-red-200",
};

function Admin() {
  const { L } = useLang();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    void getOrders().then(setOrders);
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? orders : orders.filter((order) => order.status === filter)),
    [filter, orders],
  );
  const sales = orders.reduce((sum, order) => sum + order.total, 0);
  const preparing = orders.filter((order) => order.status === "preparing").length;
  const delivery = orders.filter((order) => order.status === "on_the_way").length;

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const stats = [
    { label: L("طلبات اليوم", "Orders today"), value: orders.length, icon: ClipboardList },
    {
      label: L("مبيعات اليوم", "Today’s sales"),
      value: <Price value={sales} />,
      icon: PackageCheck,
    },
    { label: L("قيد التحضير", "Preparing"), value: preparing, icon: CookingPot },
    { label: L("قيد التوصيل", "On delivery"), value: delivery, icon: Bike },
  ];

  return (
    <main className="min-h-screen bg-ink pb-10 text-bone">
      <header className="border-b border-gold/20 bg-charcoal/70 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold/45 text-gold">
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-lg">
                {L("إدارة مطعم الكمال", "Al Kamal Admin")}
              </span>
              <span className="text-[.62rem] tracking-[.2em] text-gold">LOCAL DEMO</span>
            </span>
          </div>
          <Link to="/" className="text-sm text-bone/70 hover:text-gold">
            <span className="inline-flex items-center gap-1">
              <ArrowRight className="h-4 w-4" />
              {L("الموقع", "View site")}
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 pt-5 sm:gap-6 sm:px-8 sm:pt-7 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit border border-gold/15 bg-charcoal/40 p-2 sm:p-3 lg:sticky lg:top-6">
          <p className="hidden px-3 py-2 text-[.65rem] tracking-[.2em] text-gold sm:block">
            {L("لوحة التحكم", "NAVIGATION")}
          </p>
          <div className="no-scrollbar flex gap-1 overflow-x-auto sm:mt-1 sm:grid">
            <button className="flex shrink-0 items-center gap-3 bg-gold px-3 py-3 text-sm text-ink">
              <LayoutDashboard className="h-4 w-4" />
              {L("نظرة عامة", "Overview")}
            </button>
            <button className="flex shrink-0 items-center gap-3 px-3 py-3 text-sm text-bone/65 hover:bg-ink/50">
              <ClipboardList className="h-4 w-4" />
              {L("الطلبات", "Orders")}
            </button>
            <button className="flex shrink-0 items-center gap-3 px-3 py-3 text-sm text-bone/65 hover:bg-ink/50">
              <UtensilsCrossed className="h-4 w-4" />
              {L("الأصناف", "Products")}
            </button>
          </div>
          <p className="mt-5 hidden border-t border-gold/10 px-3 pt-4 text-xs leading-6 text-muted-foreground sm:block">
            {L(
              "هذه لوحة معاينة محلية. البيانات لا تصل لمطعم حقيقي.",
              "This is a local preview. Data is not sent to a real restaurant.",
            )}
          </p>
        </aside>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{L("صباح الخير", "GOOD MORNING")}</p>
              <h1 className="mt-2 text-3xl text-bone sm:text-4xl">
                {L("ملخص اليوم", "Today’s overview")}
              </h1>
            </div>
            <div className="flex items-center gap-2 border border-gold/20 bg-charcoal px-3 py-2 text-xs text-gold">
              <Clock3 className="h-4 w-4" />
              {L("آخر تحديث الآن", "Updated just now")}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <article key={label} className="border border-gold/15 bg-charcoal/45 p-4 sm:p-5">
                <Icon className="h-5 w-5 text-gold" />
                <p className="mt-4 text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 font-display text-3xl text-bone">{value}</p>
              </article>
            ))}
          </div>

          <article className="mt-6 border border-gold/20 bg-charcoal/35">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/15 p-5">
              <div>
                <p className="eyebrow">{L("إدارة الطلبات", "ORDER MANAGEMENT")}</p>
                <h2 className="mt-1 text-2xl text-bone">{L("آخر الطلبات", "Recent orders")}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  ["all", "received", "preparing", "ready", "on_the_way", "delivered"] as const
                ).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`border px-3 py-2 text-xs transition-colors ${filter === status ? "border-gold bg-gold text-ink" : "border-gold/20 text-bone/65 hover:border-gold/60"}`}
                  >
                    {status === "all"
                      ? L("الكل", "All")
                      : L(statuses[status].ar, statuses[status].en)}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gold/10">
              {visible.map((order) => (
                <article
                  key={order.id}
                  className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[.75fr_1.1fr_.8fr_auto] lg:items-center"
                >
                  <div>
                    <p className="font-display text-lg text-gold">{order.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.createdAt} ·{" "}
                      {order.type === "delivery" ? L("توصيل", "Delivery") : L("استلام", "Pickup")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-bone">{order.customer}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {order.items.map((item) => `${item.qty}× ${item.nameAr}`).join(" · ")}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex border px-2 py-1 text-xs ${statusClasses[order.status]}`}
                    >
                      {L(statuses[order.status].ar, statuses[order.status].en)}
                    </span>
                    <p className="mt-2 text-sm text-gold">
                      <Price value={order.total} />
                    </p>
                  </div>
                  <label className="flex items-center justify-between gap-2 border-t border-gold/10 pt-3 text-xs text-muted-foreground lg:justify-start lg:border-0 lg:pt-0">
                    {L("الحالة", "Status")}
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(order.id, event.target.value as OrderStatus)
                      }
                      className="min-h-11 border border-gold/25 bg-ink px-3 py-2 text-base text-bone outline-none focus:border-gold sm:text-sm"
                    >
                      <option value="received">{L("طلب جديد", "New")}</option>
                      <option value="preparing">{L("قيد التحضير", "Preparing")}</option>
                      <option value="ready">{L("جاهز", "Ready")}</option>
                      <option value="on_the_way">{L("خرج للتوصيل", "On the way")}</option>
                      <option value="delivered">{L("تم التوصيل", "Delivered")}</option>
                      <option value="cancelled">{L("ملغي", "Cancelled")}</option>
                    </select>
                  </label>
                </article>
              ))}
            </div>
            {!visible.length && (
              <div className="p-12 text-center text-muted-foreground">
                <CheckCircle2 className="mx-auto h-8 w-8 text-gold" />
                {L("لا توجد طلبات بهذه الحالة", "No orders in this status")}
              </div>
            )}
          </article>
          <div className="mt-6 border border-gold/15 bg-ink/50 p-5 text-sm leading-7 text-muted-foreground">
            <strong className="text-gold">{L("ملاحظة:", "Note:")}</strong>{" "}
            {L(
              "تغيير الحالة يعمل في صفحة المعاينة الحالية فقط. لربط الطلبات الحقيقية، أضف قاعدة بيانات ومصادقة قبل النشر.",
              "Status changes work only in this preview. Connect a database and authentication before publishing real orders.",
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
