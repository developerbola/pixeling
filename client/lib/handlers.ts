"use client";
import { supabaseClient } from "@/lib/supabaseClient";

const supabase = supabaseClient();

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error(error);
};

export { handleLogin };
