import { useState, type FormEvent } from "react";
import { LoaderCircle, Star } from "lucide-react";
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
      setMessage(L("أكمل الاسم والتقييم والتعليق قبل الإرسال.", "Add your name, rating, and comment before submitting."));
      return;
    }

    const lastSubmission = Number(localStorage.getItem(REVIEW_COOLDOWN_KEY) ?? 0);
    if (Date.now() - lastSubmission < REVIEW_COOLDOWN_MS) {
      setMessage(L("شكراً! يمكنك إرسال مراجعة أخرى بعد قليل.", "Thanks! You can submit another review in a few minutes."));
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
      setMessage(L("تعذر إرسال مراجعتك الآن. حاول مرة أخرى لاحقاً.", "We could not send your review right now. Please try again."));
      return;
    }

    localStorage.setItem(REVIEW_COOLDOWN_KEY, String(Date.now()));
    setName("");
    setRating(0);
    setComment("");
    setWebsite("");
    setIsSuccess(true);
    setMessage(L("شكراً لمراجعتك! سنراجعها قبل نشرها.", "Thank you! We will review your feedback before publishing it."));
  };

  return (
    <form onSubmit={submit} className="mt-8 border border-gold/20 bg-charcoal/60 p-6 sm:p-8">
      <p className="eyebrow">{L("شاركنا رأيك", "LEAVE A REVIEW")}</p>
      <h3 className="mt-3 font-display text-2xl text-bone sm:text-3xl">
        {L("كيف كانت تجربتك؟", "How was your experience?")}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {L(
          "تتم مراجعة جميع التعليقات قبل ظهورها على الموقع.",
          "Every review is checked before it appears on the website.",
        )}
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-[.8fr_1.2fr]">
        <label className="grid gap-2 text-sm text-bone">
          {L("الاسم", "Name")}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={80}
            autoComplete="name"
            className="h-11 border border-gold/25 bg-ink px-3 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            placeholder={L("اكتب اسمك الأول", "Your first name")}
            required
          />
        </label>

        <fieldset className="grid gap-2">
          <legend className="text-sm text-bone">{L("التقييم", "Your rating")}</legend>
          <div className="flex h-11 items-center gap-1" role="radiogroup" aria-label={L("التقييم من خمس نجوم", "Rating out of five stars")}>
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} ${L("نجوم", "stars")}`}
                  onClick={() => setRating(value)}
                  className="rounded-sm p-1 text-gold transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
          className="resize-y border border-gold/25 bg-ink p-3 leading-7 text-bone outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          placeholder={L("أخبرنا عن تجربتك في مطعم الكمال", "Tell us about your experience at Al Kamal")}
          required
        />
      </label>

      <div className="absolute -start-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
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
        <p className={`mt-4 text-sm ${isSuccess ? "text-gold-soft" : "text-destructive"}`} role="status">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-gold px-5 font-medium text-ink transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {submitting ? L("جارٍ الإرسال...", "Sending...") : L("إرسال المراجعة", "Submit review")}
      </button>
    </form>
  );
}
