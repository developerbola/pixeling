"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/lib/atom";
import { getCapitalLetters } from "@/lib/utils";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { ChangeEvent, useState, useEffect, cache } from "react";
import { toast } from "sonner";

interface UserInfo {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
}

const Profile = () => {
  const session = useAtomValue(userAtom);
  const [user, setUser] = useState<UserInfo>({
    name: "",
    username: "",
    avatar_url: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session?.id) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser({
          name: data.name || "",
          username: data.username || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [session?.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/user/${session?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
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

        <form
          className="flex flex-col gap-4 w-full max-w-[500px]"
          action={handleSubmit}
        >
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

          <Button
            variant={"outline"}
            className="px-6 w-full xs:w-auto"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
