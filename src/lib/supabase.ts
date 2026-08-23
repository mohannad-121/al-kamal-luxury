import { createClient } from "@supabase/supabase-js";

// Both values are browser-safe Supabase public credentials. Environment values
// can override them later without changing the application source.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://rkvkjvbrgevgcvgjyjwy.supabase.co";
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_mXrB2aQB6vHIpkEGrsoJMg_zps2OMYB";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
