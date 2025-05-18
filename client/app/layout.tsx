import type { Metadata } from "next";
import "./styles/index.css";
import Navbar from "@/components/Navbar";
import { NavigationEvents } from "@/components/ProgressLink";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pixeling",
  description: "A gallery app built with NextJS and Supabase",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body>
        <Suspense>
          <NavigationEvents />
          <Navbar />
          <div className="px-5 pt-[80px]">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
