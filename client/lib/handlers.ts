"use client";
import { supabaseClient } from "@/lib/supabaseClient";
import { useSetAtom } from "jotai";
import { userAtom } from "./atom";

const supabase = supabaseClient();

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) console.error(error);
};

const handleLogOut = async () => {
  const setUser = useSetAtom(userAtom);
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }
  setUser(null);
};

export { handleLogin, handleLogOut };
