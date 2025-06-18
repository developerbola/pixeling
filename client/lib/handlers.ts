"use client";
import { supabaseClient } from "@/lib/supabaseClient";

const supabase = supabaseClient();

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://pixeling.vercel.app/auth/callback",
    },
  });
  if (error) console.error(error);
};

export { handleLogin };
