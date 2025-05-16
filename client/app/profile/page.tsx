import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex align-center justify-center">
      <div className="flex flex-col gap-3 w-1/2 align-center justify-center">
        <div>
          <Image
            src={"https://avatars.githubusercontent.com/u/130325184?v=4"}
            alt="profile image"
            height={200}
            width={200}
            className="border shadow-xs rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-3 w-1/4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="w-[400px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" className="h-32 resize-none w-[400px]" />
          </div>
          <div>
            <Button variant={"outline"} className="px-6">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
