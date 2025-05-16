"use client";

import { Category } from "@/components/Category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Create = () => {
  const [file, setFile] = useState<string>("");

  const [link, setLink] = useState<string>("");
  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="flex justify-center gap-10">
      <div className="flex items-center justify-center relative h-full">
        <div className="relative">
          <input
            type="file"
            className="absolute top-0 left-0 opacity-0 h-[600px] w-[500px] cursor-pointer"
            onChange={(e) => {
              const selectedFile = e.target.files && e.target.files[0];
              if (selectedFile) {
                setFile(URL.createObjectURL(selectedFile));
              }
            }}
          />
          <div className="h-[600px] w-[500px] flex items-center justify-center bg-[#131313] rounded-2xl overflow-hidden">
            {file ? (
              <img
                src={file}
                alt="preview"
                className="object-cover h-full w-full"
              />
            ) : (
              <Image
                src={"/image_preview.svg"}
                alt="preview svg image"
                width={200}
                height={100}
              />
            )}
          </div>
          <Separator className="my-4 bg-zinc-600" />
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full cursor-pointer" variant={"outline"}>
                Save from link
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3 w-[500px]">
              <h3>Enter your image url</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const url = formData.get("imageUrl") as string;
                  setFile(url);
                }}
                className="flex flex-col gap-3"
              >
                <Input name="imageUrl" placeholder="Add image url" />
                <Button type="submit">Continue</Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-[400px] flex flex-col gap-3">
        <div>
          <Label className="mb-1">Title</Label>
          <Input placeholder="Add image title" className="w-full" />
        </div>
        <div>
          <Label className="mb-1">Description</Label>
          <Textarea
            className="resize-none min-h-32"
            placeholder="Add detailed image description"
          />
        </div>
        <div>
          <Label className="mb-1">Select categories</Label>
          <Category />
        </div>
        <div className="flex align-center justify-between">
          <Label htmlFor="allow-comment">Allow people to comment</Label>
          <Switch id="allow-comment" />
        </div>
      </div>
    </div>
  );
};

export default Create;
