"use client";

import { useSetAtom } from "jotai";
import { supabaseClient } from "../supabaseClient";
import { userAtom } from "../atom";
import { toast } from "sonner";

const supabase = supabaseClient();

export const useGetSession = () => {
  const setUser = useSetAtom(userAtom);

  const handleGetSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      if (session) {
        console.log(session);

        setUser(session.user);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.log(res)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error in handleGetSession: ${error}`);
    }
  };

  return handleGetSession;
};
