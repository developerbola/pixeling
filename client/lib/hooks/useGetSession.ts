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
      
      if (session) {
        setUser(session.user);
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`,
            },
            // Add credentials if needed
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        console.log(json);
      }
    } catch (error) {
      toast.error(`Error in handleGetSession: ${error}`);
    }
  };

  return handleGetSession;
};