"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { handleLogin } from "@/lib/handlers";
import { useLogOut } from "@/lib/hooks/userLogOut";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { memo } from "react";

export const AuthControls = memo(function AuthControls({
  user,
}: {
  user: User | null;
}) {
  const logOut = useLogOut();

  return (
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
  );
});
