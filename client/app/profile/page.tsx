"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCapitalLetters } from "@/lib/utils";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
interface UserInfo {
  name: string;
  username: string;
  bio: string;
}
const Profile = () => {
  const [user, setUser] = useState<UserInfo>({
    name: "Tuxtamatov",
    username: "mutawirr",
    bio: "Creative thinker, passionate about storytelling, technology, and making meaningful connections through words and ideas.",
  });

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
    <div className="w-full h-[calc(100vh-80px)] flex align-center justify-center">
      <div className="flex flex-col gap-3 w-1/2 align-center justify-center">
        <div className="h-[200px] w-[200px] border shadow-xs rounded-xl overflow-hidden grid place-items-center">
          {false ? (
            <Image
              src={"https://avatars.githubusercontent.com/u/130325184?v=4"}
              alt="profile image"
              height={200}
              width={200}
            />
          ) : (
            <h1 className="text-6xl">{getCapitalLetters(user.name.trim())}</h1>
          )}
        </div>
        <div className="flex flex-col gap-3 w-1/4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              className="w-[400px]"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              className="w-[400px]"
              value={user.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              className="h-32 resize-none w-[400px]"
              value={user.bio}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <Button variant={"outline"} className="px-6">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
