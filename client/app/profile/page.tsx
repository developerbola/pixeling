"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/lib/atom";
import { getCapitalLetters } from "@/lib/utils";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

interface UserInfo {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
}

const Profile = () => {
  const session = useAtomValue(userAtom);

const [user, setUser] = useState<UserInfo>({
  name: session?.user_metadata?.full_name || "",
  username: session?.user_metadata?.name || "",
  avatar_url: session?.user_metadata?.avatar_url || "",
  bio: "Creative thinker, passionate about storytelling, technology, and making meaningful connections through words and ideas.",
});

  console.log(session);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-5xl items-start exs:pl-0 sm:px-28 md:pl-40">
        <div className="h-[200px] w-[200px] border shadow-xs rounded-xl overflow-hidden grid place-items-center">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="profile image"
              height={200}
              width={200}
            />
          ) : (
            <h1 className="text-6xl">
              {getCapitalLetters(user?.name?.trim())}
            </h1>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[500px]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              className="w-full"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              className="w-full"
              value={user.username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              className="h-32 resize-none w-full"
              value={user.bio}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Button variant={"outline"} className="px-6 w-full xs:w-auto">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
