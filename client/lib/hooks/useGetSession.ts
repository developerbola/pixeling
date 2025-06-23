"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { supabaseClient } from "../supabaseClient";
import { userAtom } from "../atom";
import { toast } from "sonner";

const supabase = supabaseClient();

export const useGetSession = () => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const getSessionAndSubscribe = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setUser(session.user);
          localStorage.setItem("session_id", session.user.id);
          await fetchProtectedEndpoint(session.access_token);
        }
      } catch (error) {
        console.error(error);
        toast.error(`Error getting session: ${error}`);
      }
    };

    const fetchProtectedEndpoint = async (accessToken: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.log("Protected fetch error", res);
        }
      } catch (err) {
        console.error("Error fetching protected endpoint:", err);
      }
    };

    // Initial session fetch
    getSessionAndSubscribe();

    // Optional: listen to auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session) {
          fetchProtectedEndpoint(session.access_token);
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);
};
