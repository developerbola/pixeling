"use client";

import { useSetAtom } from "jotai";
import { userAtom } from "../atom";
import { supabaseClient } from "../supabaseClient";

export const useLogOut = () => {
  const setUser = useSetAtom(userAtom);
  const supabase = supabaseClient();

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return logOut;
};
