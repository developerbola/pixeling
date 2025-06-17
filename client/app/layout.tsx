"use client";

import "./styles/index.css";
import Navbar from "@/components/Navbar";
import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atom";
import { useGetSession } from "@/lib/hooks/useGetSession";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useAtom(userAtom);
  const getSession = useGetSession();

  useEffect(() => {
    getSession();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Pixeling</title>
        <meta
          name="description"
          content="A gallery app built with NextJS, Shadcn, HonoJS, Supabase"
        />
        <link rel="icon" href="/logo.svg" type="image/svg" />
      </head>
      <body>
        <NextTopLoader
          color="#ffffff"
          height={3}
          shadow="0 0 8px 2px #ffffff70, 0 0 20px 6px #ffffff40"
          showSpinner={false}
        />

        <Suspense>
          <Navbar />
          <div className="px-5 pt-[80px]">{children}</div>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
