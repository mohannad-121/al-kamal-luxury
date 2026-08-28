import { useState } from "react";
import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, LoaderCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GoldButton } from "@/components/GoldButton";
import { Price } from "@/components/Price";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/hooks/use-cart";
import { useLang } from "@/hooks/use-lang";
import { deliveryAreas } from "@/data/orders";
import { createOrder } from "@/services";

export const Route = createFileRoute("/checkout")({
  beforeLoad: () => {
    throw redirect({ to: "/menu", search: { category: "all" } });
  },
  component: Checkout,
});

const fieldClass =
  "mt-2 h-13 w-full border border-gold/20 bg-ink/60 px-4 text-base text-bone outline-none transition-colors placeholder:text-muted-foreground focus:border-gold/60 sm:h-12 sm:text-sm";
function Checkout() {
  const { L } = useLang();
  const cart = useCart();
  const navigate = useNavigate();
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [area, setArea] = useState(deliveryAreas[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const selectedArea = deliveryAreas.find((candidate) => candidate.id === area);
  const delivery = type === "delivery" ? (selectedArea?.fee ?? 0) : 0;
  const total = Math.max(0, cart.subtotal + delivery - cart.discount);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.lines.length) return;
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    const order = await createOrder({
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      type,
      ...(type === "delivery"
        ? {
            area: selectedArea ? L(selectedArea.nameAr, selectedArea.nameEn) : "",
            street: String(form.get("street")),
            building: String(form.get("building")),
            floor: String(form.get("floor")),
            details: String(form.get("details")),
          }
        : {}),
      notes: String(form.get("notes") || ""),
      payment:
        type === "delivery"
          ? L("الدفع عند التوصيل", "Cash on delivery")
          : L("الدفع عند الاستلام", "Cash on pickup"),
      lines: cart.lines,
      subtotal: cart.subtotal,
      delivery,
      discount: cart.discount,
      total,
    });
    cart.clear();
    await navigate({ to: "/order-confirmed", search: { order: order.id } });
  };
  return (
    <main>
      <Navbar />
      <section className="min-h-screen bg-charcoal px-4 pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-soft"
          >
            <ChevronLeft className="h-4 w-4" />
            {L("العودة للمنيو", "Back to menu")}
          </Link>
          <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-8 lg:grid-cols-[1fr_380px]">
            <form onSubmit={submit} className="border border-gold/20 bg-ink/45 p-4 pb-24 sm:p-8">
              <p className="eyebrow">{L("خطوة أخيرة", "ONE LAST STEP")}</p>
              <h1 className="mt-3 text-2xl text-bone sm:text-4xl">
                {L("بيانات الطلب", "Order details")}
              </h1>
              {!cart.lines.length ? (
                <div className="mt-8 border border-gold/15 bg-charcoal/40 p-8 text-center">
                  <p className="text-bone">{L("سلتك فاضية.", "Your cart is empty.")}</p>
                  <Link to="/menu">
                    <GoldButton className="mt-5">{L("تصفح المنيو", "Browse menu")}</GoldButton>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2">
                    <label className="text-sm text-bone">
                      {L("الاسم الكامل", "Full name")}
                      <input
                        required
                        name="name"
                        className={fieldClass}
                        placeholder={L("اكتب اسمك", "Your name")}
                      />
                    </label>
                    <label className="text-sm text-bone" dir="rtl">
                      {L("رقم الموبايل", "Mobile number")}
                      <input
                        required
                        name="phone"
                        type="tel"
                        className={fieldClass}
                        placeholder="07X XXX XXXX"
                        dir="ltr"
                      />
                    </label>
                  </div>
                  <div className="mt-7">
                    <p className="text-sm text-bone">{L("طريقة الاستلام", "Delivery or pickup")}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {(["delivery", "pickup"] as const).map((value) => (
                        <button
                          type="button"
                          key={value}
                          onClick={() => setType(value)}
                          className={`border p-4 text-start text-sm transition-colors ${type === value ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-bone/70"}`}
                        >
                          <Check
                            className={`mb-2 h-4 w-4 ${type === value ? "opacity-100" : "opacity-0"}`}
                          />
                          {value === "delivery"
                            ? L("توصيل", "Delivery")
                            : L("استلام من المطعم", "Pickup")}
                        </button>
                      ))}
                    </div>
                  </div>
                  {type === "delivery" && (
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <label className="text-sm text-bone">
                        {L("المنطقة", "Area")}
                        <select
                          value={area}
                          onChange={(event) => setArea(event.target.value)}
                          className={fieldClass}
                        >
                          {deliveryAreas
                            .filter((candidate) => candidate.active)
                            .map((candidate) => (
                              <option value={candidate.id} key={candidate.id}>
                                {L(candidate.nameAr, candidate.nameEn)} · {candidate.fee.toFixed(2)}{" "}
                                {L("د.أ", "JOD")}
                              </option>
                            ))}
                        </select>
                      </label>
                      <label className="text-sm text-bone">
                        {L("الشارع", "Street")}
                        <input required name="street" className={fieldClass} />
                      </label>
                      <label className="text-sm text-bone">
                        {L("رقم البناية", "Building")}
                        <input required name="building" className={fieldClass} />
                      </label>
                      <label className="text-sm text-bone">
                        {L("الطابق / الشقة", "Floor / apartment")}
                        <input name="floor" className={fieldClass} />
                      </label>
                      <label className="text-sm text-bone sm:col-span-2">
                        {L("علامة مميزة أو تفاصيل العنوان", "Landmark or address details")}
                        <input name="details" className={fieldClass} />
                      </label>
                    </div>
                  )}
                  <label className="mt-7 block text-sm text-bone">
                    {L("ملاحظات الطلب", "Order notes")}
                    <textarea
                      name="notes"
                      rows={3}
                      className={`${fieldClass} h-auto py-3`}
                      placeholder={L("مثلاً: شطة على جنب", "e.g. chili on the side")}
                    />
                  </label>
                  <GoldButton
                    disabled={submitting}
                    size="lg"
                    className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 mt-6 w-full shadow-[0_12px_28px_rgba(0,0,0,.45)] sm:static sm:mt-8 sm:shadow-none"
                  >
                    {submitting ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      L("تأكيد الطلب", "Place order")
                    )}
                  </GoldButton>
                </>
              )}
            </form>
            <aside className="h-fit border border-gold/20 bg-ink p-4 sm:p-6 lg:sticky lg:top-28">
              <p className="eyebrow">{L("ملخص طلبك", "YOUR ORDER")}</p>
              <div className="mt-5 divide-y divide-gold/10">
                {cart.lines.map((line) => (
                  <div
                    key={line.lineId}
                    className="flex items-start justify-between gap-3 py-3 text-sm"
                  >
                    <span className="text-bone/80">
                      {line.qty}× {L(line.nameAr, line.nameEn)}
                    </span>
                    <span className="text-gold">
                      <Price value={line.unitPrice * line.qty} />
                    </span>
                  </div>
                ))}
              </div>
              <dl className="mt-5 space-y-3 border-t border-gold/15 pt-5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>{L("المجموع", "Subtotal")}</dt>
                  <dd>
                    <Price value={cart.subtotal} />
                  </dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>{L("التوصيل", "Delivery")}</dt>
                  <dd>
                    <Price value={delivery} />
                  </dd>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-gold">
                    <dt>{L("خصم", "Discount")}</dt>
                    <dd>
                      − <Price value={cart.discount} />
                    </dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-gold/15 pt-4 font-display text-xl text-bone">
                  <dt>{L("الإجمالي", "Total")}</dt>
                  <dd className="text-gold">
                    <Price value={total} />
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                {L(
                  "الدفع كاش عند الاستلام، ورقم التتبع بيطلع بعد تأكيد الطلب.",
                  "Pay cash on delivery or pickup. Tracking appears after confirmation.",
                )}
              </p>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
