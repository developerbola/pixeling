"use client";

import "./styles/index.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { GetSession } from "./GetSession";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAtomValue(userAtom);

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
        <GetSession />
        <NextTopLoader
          color="#ffffff"
          height={3}
          shadow="0 0 8px 2px #ffffff70, 0 0 20px 6px #ffffff40"
          showSpinner={false}
        />

        <Navbar user={user} />
        <Suspense>
          <div className="sm:px-5 exs:px-3 pt-[80px]">{children}</div>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
