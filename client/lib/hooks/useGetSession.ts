"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { supabaseClient } from "../supabaseClient";
import { userAtom } from "../atom";
import { toast } from "sonner";

const supabase = supabaseClient();

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
        }
      } catch (error) {
        console.error(error);
        toast.error(`Error getting session: ${error}`);
      }
    };

    getSessionAndSubscribe();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session) {
        fetchProtectedEndpoint(session.access_token);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
};
