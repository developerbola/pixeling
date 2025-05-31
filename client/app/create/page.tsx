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
import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const [uploadData, setUploadData] = useState<{
    file: string;
    title: string;
    description: string;
    height: number;
    width: number;
    categories: string[];
    isCommentable: boolean;
  }>({
    file: "",
    title: "",
    description: "",
    height: 0,
    width: 0,
    categories: [],
    isCommentable: true,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const saveValue = (
    value: string | boolean | string[] | number,
    name: string
  ) => {
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    const missingFields = [];

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
    formData.append("height", uploadData.height.toString());
    formData.append("width", uploadData.width.toString());
    formData.append(
      "isCommentable",
      uploadData.isCommentable ? "true" : "false"
    );

    try {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      }).then((data) => {
        console.log(data);
        router.push("/");
      });
    } catch (error) {
      toast.error("Failed to publish.");
      console.error("Error on publishing:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 exs:pb-10 xs:pb-0">
      <div className="flex justify-between items-center gap-4 px-4 xs:px-6 md:px-16 lg:px-[230px]">
        <h1 className="text-2xl xs:text-3xl md:text-4xl">Publish Image</h1>
        <Button
          variant={"secondary"}
          onClick={handlePublish}
          className="w-auto"
        >
          Upload <Upload className="ml-2" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row justify-center md:items-start items-center gap-6 xs:gap-8 md:gap-10 px-4 xs:px-6 md:px-16">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center relative w-full max-w-[500px]">
          <div className="relative w-full">
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-[calc(100%-50px)] cursor-pointer rounded-2xl opacity-0"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                if (selectedFile.size > 5 * 1024 * 1024) {
                  toast("Image must be less than 5MB!");
                  return;
                }

                const imageURL = URL.createObjectURL(selectedFile);
                const title = selectedFile.name.split(".")[0];
                saveValue(title, "title");
                saveValue(imageURL, "file");
                setIsImageLoaded(false);
              }}
              required
            />

            <div
              className={cn(
                !uploadData.file && "aspect-[5/6] grid place-items-center",
                "w-full exs:max-w-full sm:max-w-[500px] xs:max-w-[280px] rounded-2xl overflow-hidden bg-[#181818]"
              )}
            >
              {uploadData.file ? (
                <img
                  src={uploadData.file}
                  alt={uploadData.title}
                  className={cn(
                    "w-full h-auto object-contain transition-all duration-300",
                    !isImageLoaded && "aspect-[5/6]"
                  )}
                  onLoad={(e) => {
                    setIsImageLoaded(true);
                    saveValue(
                      e.currentTarget.naturalHeight.toString(),
                      "height"
                    );
                    saveValue(e.currentTarget.naturalWidth.toString(), "width");
                  }}
                />
              ) : (
                <Image
                  src={"/default_placeholder.svg"}
                  alt="default"
                  width={200}
                  height={100}
                  className="w-[150px] h-[80px]"
                />
              )}
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="mt-4">
                <Button className="w-full" variant={"outline"}>
                  Save from Pinterest
                  <Image
                    src={"/pinterest.svg"}
                    alt="Pinterest"
                    width={18}
                    height={18}
                    className="ml-2"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-3 w-[500px]">
                <h3>Enter Pinterest pin url</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const url = formData.get("imageUrl") as string;
                    if (url && url.includes("https://i.pinimg.com")) {
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
                    placeholder="Add here pin url"
                    type="url"
                    className={cn(
                      isEmpty && "border-red-500 !placeholder-red-500"
                    )}
                  />
                  <Button type="submit">Continue</Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5 w-full max-w-[500px]">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Add image title"
              onChange={(e) => saveValue(e.target.value, "title")}
              value={uploadData.title}
            />
          </div>

          <div>
            <Label htmlFor="textarea">Description</Label>
            <Textarea
              id="textarea"
              className="resize-none min-h-32"
              placeholder="Add detailed image description"
              onChange={(e) => saveValue(e.target.value, "description")}
              value={uploadData.description}
            />
          </div>

          <div>
            <Label>Categories</Label>
            <Category setUploadData={setUploadData} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow-comment">Allow comments</Label>
            <Switch
              id="allow-comment"
              checked={uploadData.isCommentable}
              onCheckedChange={(checked) => saveValue(checked, "isCommentable")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
