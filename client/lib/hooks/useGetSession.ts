"use client";

import { useSetAtom } from "jotai";
import { supabaseClient } from "../supabaseClient";
import { userAtom } from "../atom";

const supabase = supabaseClient();

export const useGetSession = () => {
  const setUser = useSetAtom(userAtom);

  const handleGetSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      const json = await res.json();
      console.log(json);
    }
  };

  return handleGetSession;
};
