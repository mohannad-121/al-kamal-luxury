import { useState, type FormEvent } from "react";
import { LoaderCircle, Star } from "lucide-react";
import { GoldButton } from "@/components/GoldButton";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/hooks/use-lang";

const REVIEW_COOLDOWN_KEY = "alkamal.review-submitted-at";
const REVIEW_COOLDOWN_MS = 10 * 60 * 1000;

export function ReviewSubmissionForm() {
  const { L, lang } = useLang();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (name.trim().length < 2 || name.trim().length > 80 || !rating || comment.trim().length < 8) {
      setMessage(
        L(
          "اكتب اسمك، اختار تقييم، واحكيلنا عن تجربتك.",
          "Enter your name, choose a rating, and tell us about your experience.",
        ),
      );
      return;
    }

    const lastSubmission = Number(localStorage.getItem(REVIEW_COOLDOWN_KEY) ?? 0);
    if (Date.now() - lastSubmission < REVIEW_COOLDOWN_MS) {
      setMessage(
        L(
          "استنى كم دقيقة قبل ما تبعث مراجعة ثانية.",
          "Please wait a few minutes before posting again.",
        ),
      );
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.rpc("submit_review", {
      p_name: name.trim(),
      p_rating: rating,
      p_comment: comment.trim(),
      p_language: lang,
      p_website: website,
    });
    setSubmitting(false);

    if (error) {
      setMessage(
        L("ما قدرنا نرسل مراجعتك. جرّب مرة ثانية.", "We couldn't post your review. Try again."),
      );
      return;
    }

    localStorage.setItem(REVIEW_COOLDOWN_KEY, String(Date.now()));
    setName("");
    setRating(0);
    setComment("");
    setWebsite("");
    setIsSuccess(true);
    setMessage(L("شكرًا! مراجعتك صارت على الموقع.", "Thanks! Your review is live."));
  };

  return (
    <form
      onSubmit={submit}
      className="relative mt-8 overflow-hidden border border-gold/20 bg-ink/65 p-6 shadow-[0_28px_80px_-56px_rgba(0,0,0,.9)] sm:mt-10 sm:p-8 lg:p-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute start-0 top-0 h-14 w-14 border-s border-t border-gold/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 -top-24 h-64 w-64 rounded-full bg-gold/[.06] blur-3xl"
      />
      <div className="relative">
        <h3 className="font-display text-2xl text-bone sm:text-3xl">
          {L("كيف كانت تجربتك معنا؟", "How was your visit?")}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {L("مراجعتك رح تظهر مباشرة بعد الإرسال.", "Your review appears as soon as you send it.")}
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-[.8fr_1.2fr]">
          <label className="grid gap-2 text-sm text-bone">
            {L("الاسم", "Name")}
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              autoComplete="name"
              className="h-12 border border-gold/25 bg-charcoal/55 px-4 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder={L("اكتب اسمك الأول", "Your first name")}
              required
            />
          </label>

          <fieldset className="grid gap-2">
            <legend className="text-sm text-bone">{L("تقييمك", "Your rating")}</legend>
            <div
              className="flex h-12 items-center gap-1"
              role="radiogroup"
              aria-label={L("التقييم من خمس نجوم", "Rating out of five stars")}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={L(
                      value === 1 ? "نجمة واحدة" : value === 2 ? "نجمتان" : `${value} نجوم`,
                      `${value} stars`,
                    )}
                    onClick={() => setRating(value)}
                    className="rounded-sm p-1.5 text-gold transition duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Star className="h-6 w-6" fill={value <= rating ? "currentColor" : "none"} />
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <label className="mt-5 grid gap-2 text-sm text-bone">
          {L("تعليقك", "Your comment")}
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            minLength={8}
            maxLength={500}
            rows={4}
            className="min-h-32 resize-y border border-gold/25 bg-charcoal/55 p-4 leading-7 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            placeholder={L("احكيلنا شو رأيك", "Tell us what you think")}
            required
          />
        </label>

        <div
          className="absolute -start-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="review-website">Website</label>
          <input
            id="review-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        {message ? (
          <p
            className={`mt-4 text-sm ${isSuccess ? "text-gold-soft" : "text-destructive"}`}
            role="status"
          >
            {message}
          </p>
        ) : null}

        <GoldButton type="submit" size="lg" disabled={submitting} className="mt-6 w-full sm:w-auto">
          {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {submitting ? L("جارٍ الإرسال...", "Sending...") : L("إرسال المراجعة", "Submit review")}
        </GoldButton>
      </div>
    </form>
  );
}
