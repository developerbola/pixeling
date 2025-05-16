import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
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

const Navbar = () => {
  return (
    <nav className="flex fixed items-center p-5 h-[80px] w-full bg-[#00000020] backdrop-blur-md">
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
        <div className="flex gap-4 items-center">
          <Input placeholder="Search" className="inline-block" />
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:border-none">
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href={"/create"}>
                <DropdownMenuItem>Create</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
