"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Search from "./Search";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { handleLogin } from "@/lib/handlers";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";
import { useLogOut } from "@/lib/hooks/userLogOut";

const Navbar = () => {
  const user = useAtomValue(userAtom);
  const logOut = useLogOut();

  return (
    <nav className="flex fixed items-center p-5 h-[80px] w-full bg-[#0b0809c8] backdrop-blur-md z-[99]">
      <div className="flex w-full justify-between">
        <div>
          <Link href="/">
            <Image
              src={"/logo.svg"}
              alt="Pixeling logo"
              width={40}
              height={40}
              priority
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
          <div className="flex items-center">
            {!user?.user_metadata.avatar_url ? (
              <Button variant={"link"} onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus:border-none">
                  <Avatar className="cursor-pointer border-[0.5px] border-[#ffffff40]">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      <LoaderCircle className="animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/profile"} className="cursor-pointer">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href={"/create"} className="cursor-pointer">
                    <DropdownMenuItem>Create</DropdownMenuItem>
                  </Link>
                  <Link href={"/my-images"} className="cursor-pointer">
                    <DropdownMenuItem>My images</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOut}
                    data-destructive
                    className="text-red-500 focus:!bg-none focus:text-red-500"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
