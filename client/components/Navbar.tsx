import Image from "next/image";
import React from "react";
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
        <div className="flex align-center justify-end w-full px-5">
          <Search />
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:border-none">
              <Avatar className="cursor-pointer border-[0.5px] border-[#ffffff40]">
                <AvatarImage src="https://avatars.githubusercontent.com/u/130325184?v=4" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
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
