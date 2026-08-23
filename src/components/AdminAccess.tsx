import { useState, type FormEvent } from "react";
import { LockKeyhole, LogIn, LogOut } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { supabase } from "@/lib/supabase";

export function AdminAccess({ hasSession, isAdmin }: { hasSession: boolean; isAdmin: boolean }) {
  const { L } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setSubmitting(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 text-bone">
      <section className="w-full max-w-md border border-gold/25 bg-charcoal/65 p-6 shadow-2xl sm:p-8">
        <span className="grid h-11 w-11 place-items-center border border-gold/45 text-gold">
          <LockKeyhole className="h-5 w-5" />
        </span>
        <p className="mt-5 eyebrow">{L("دخول الإدارة", "ADMIN ACCESS")}</p>
        <h1 className="mt-2 font-display text-3xl text-bone">
          {hasSession && !isAdmin
            ? L("هذا الحساب غير مصرح", "Account not authorized")
            : L("تسجيل دخول الإدارة", "Admin sign in")}
        </h1>
        {hasSession && !isAdmin ? (
          <>
            <p className="mt-3 text-sm leading-6 text-bone/65">
              {L(
                "تم تسجيل الدخول، لكن هذا المستخدم غير موجود في جدول admin_users في Supabase.",
                "You are signed in, but this user is not listed in Supabase admin_users.",
              )}
            </p>
            <button
              type="button"
              onClick={signOut}
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-gold/35 px-4 text-sm text-gold hover:bg-gold hover:text-ink"
            >
              <LogOut className="h-4 w-4" />
              {L("تسجيل الخروج", "Sign out")}
            </button>
          </>
        ) : (
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <label className="block text-xs text-bone/75">
              <span className="mb-2 block tracking-wide text-gold/90">
                {L("البريد الإلكتروني", "Email")}
              </span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </label>
            <label className="block text-xs text-bone/75">
              <span className="mb-2 block tracking-wide text-gold/90">
                {L("كلمة المرور", "Password")}
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
              />
            </label>
            {error ? (
              <p className="border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gold px-4 text-sm font-medium text-ink hover:bg-gold-soft disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {submitting ? L("جارٍ تسجيل الدخول", "Signing in…") : L("دخول", "Sign in")}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
