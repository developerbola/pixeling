import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: (newCookies) => {
          newCookies.forEach(async (cookie) => {
            (await cookies()).set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );
