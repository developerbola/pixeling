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
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Create = () => {
  const [uploadData, setUploadData] = useState<{
    file: string;
    title: string;
    description: string;
    dominantColor: string;
    categories: string[];
    isCommentable: boolean;
  }>({
    file: "",
    title: "",
    description: "",
    dominantColor: "",
    categories: [],
    isCommentable: true,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const saveValue = (value: string | boolean | string[], name: string) => {
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    let missingFields = [];

    if (!uploadData.file) missingFields.push("Image");
    if (!uploadData.title.trim()) missingFields.push("Title");

    if (missingFields.length > 0) {
      toast("Missing required fields", {
        description: `${missingFields.join(", ")} required.`,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
      return;
    }

    const formData = new FormData();

    if (uploadData.file.startsWith("blob:")) {
      const response = await fetch(uploadData.file);
      const blob = await response.blob();
      formData.append("file", blob, "upload.png");
    } else {
      formData.append("imageUrl", uploadData.file);
    }

    formData.append("title", uploadData.title);
    formData.append("description", uploadData.description);
    formData.append("categories", JSON.stringify(uploadData.categories));
    formData.append("dominantColor", uploadData.dominantColor);
    formData.append(
      "isCommentable",
      uploadData.isCommentable ? "true" : "false"
    );

    try {
      toast.promise(
        async () => {
          const res = await fetch("http://localhost:8787/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log(data);
        },
        {
          loading: "Uploading image...",
          success: "Image published successfully",
          error: "Error",
        }
      );
    } catch (error) {
      toast.error("Failed to publish.");
      console.error("Error on publishing:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between align-center px-[230px]">
        <div>
          <h1 className="text-4xl">Publish Image</h1>
        </div>
        <div>
          <Button variant={"secondary"} onClick={handlePublish}>
            Upload <Upload />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-10">
        <div className="flex items-center justify-center relative h-full">
          <div className="relative">
            <input
              type="file"
              className={
                "absolute top-0 left-0 w-[500px] h-[calc(100%-50px)] cursor-pointer opacity-0 rounded-2xl"
              }
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                if (selectedFile.size > 5 * 1024 * 1024) {
                  toast("Image must be less than 5MB!");
                  return;
                }

                const imageURL = URL.createObjectURL(selectedFile);
                saveValue(imageURL, "file");
                setIsImageLoaded(false);
              }}
              required
            />

            <div
              className={cn(
                !uploadData.file &&
                  "h-[600px] w-[500px] grid place-items-center",
                "max-w-[500px] rounded-2xl overflow-hidden bg-[#181818]"
              )}
            >
              {uploadData.file ? (
                <img
                  src={uploadData.file}
                  alt={uploadData.title}
                  className={cn(
                    "w-full h-auto object-contain transition-all duration-300",
                    !isImageLoaded && `h-[600px] w-[500px]`
                  )}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const { height } = img.getBoundingClientRect();
                    setIsImageLoaded(true);
                  }}
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
              <Label className="mb-2" htmlFor="title">
                Title
              </Label>
              <Input
                placeholder="Add image title"
                id="title"
                className={cn("w-full")}
                onChange={(e) => saveValue(e.target.value, "title")}
                required
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
