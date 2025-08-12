"use client";

import Link from "next/link";
import Search from "./Search";
import { cn } from "@/lib/utils";
import { AuthControls } from "./AuthControls";
import { User } from "@supabase/supabase-js";
import { memo } from "react";

const Navbar = memo(function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="flex fixed items-center p-5 h-[80px] w-full bg-[#0b0809c8] backdrop-blur-md z-[99]">
      <div className="flex w-full justify-between">
        <div>
          <Link href="/">
            <img
              src={"/logo.svg"}
              alt="Pixeling logo"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div
          className={cn(
            "flex align-center justify-end w-full",
            true ? "gap-2" : "gap-4"
          )}
        >
          <Search />
          <AuthControls user={user} />
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
