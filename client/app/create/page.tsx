"use client";

import { Category } from "@/components/Category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const Create = () => {
  const [uploadData, setUploadData] = useState<{
    file: string;
    title: string;
    description: string;
    categories: string[];
    isCommentable: boolean;
  }>({
    file: "",
    title: "",
    description: "",
    categories: [],
    isCommentable: true,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState(600);

  const saveValue = (value: string | boolean | string[], name: string) => {
    setUploadData({ ...uploadData, [name]: value });
  };

  useEffect(() => {
    console.log(uploadData);
  }, [uploadData]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between align-center px-[230px]">
        <div>
          <h1 className="text-4xl">Publish Image</h1>
        </div>
        <div>
          <Button variant={"secondary"}>
            Upload <Upload />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-10">
        <div className="flex items-center justify-center relative h-full">
          <div className="relative">
            <input
              type="file"
              className={cn(
                "absolute top-0 left-0 opacity-0 w-[500px] cursor-pointer",
                !uploadData.file ? "h-[600px]" : `h-[${inputHeight}px]`
              )}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                const imageURL = URL.createObjectURL(selectedFile);

                const img = new window.Image();

                img.src = imageURL;

                img.onload = () => {
                  setInputHeight(img.naturalHeight);
                  saveValue(imageURL, "file");
                };
              }}
            />
            <div
              className={cn(
                !uploadData.file &&
                  "h-[600px] w-[500px] grid place-items-center",
                "max-w-[500px] rounded-2xl overflow-hidden bg-[#131313]"
              )}
            >
              {uploadData.file ? (
                <Image
                  src={uploadData.file}
                  alt={uploadData.title}
                  className="w-full h-auto object-contain"
                  height={600}
                  width={500}
                />
              ) : (
                <Image
                  src={"/default_placeholder.svg"}
                  alt="default svg image placeholder"
                  width={200}
                  height={100}
                />
              )}
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="mt-4">
                <Button className="w-full" variant={"outline"}>
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
                    if (url) {
                      saveValue(url, "file");
                      setOpen(false);
                    } else {
                      setOpen(true);
                      setIsEmpty(true);
                    }
                  }}
                  className="flex flex-col gap-3"
                >
                  <Input
                    name="imageUrl"
                    placeholder="Add image url"
                    type="url"
                    className={cn(
                      isEmpty && "border-red-500 placeholder-red-500"
                    )}
                  />
                  <Button type="submit">Continue</Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="w-[400px] flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label className="mb-2" htmlFor="tit;e">
                Title
              </Label>
              <Input
                placeholder="Add image title"
                id="title"
                className="w-full"
                onChange={(e) => saveValue(e.target.value, "title")}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="textarea">
                Description
              </Label>
              <Textarea
                id="textarea"
                className="resize-none min-h-32"
                placeholder="Add detailed image description"
                onChange={(e) => saveValue(e.target.value, "description")}
              />
            </div>
            <div>
              <Label className="mb-2">Categories</Label>
              <Category saveValue={saveValue} />
            </div>
            <div className="flex align-center justify-between">
              <Label htmlFor="allow-comment">Allow people to comment</Label>
              <Switch
                id="allow-comment"
                defaultChecked
                checked={uploadData.isCommentable}
                onCheckedChange={(checked) =>
                  saveValue(checked, "isCommentable")
                }
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
