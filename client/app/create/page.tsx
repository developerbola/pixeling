"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { Copy, Loader, Upload } from "lucide-react";
import { cn, getDominantColorOfImage, toCapitalize } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";
import { Tags } from "@/components/Tags";

export type UploadDataType = {
  file: string;
  title: string;
  description: string;
  height: number;
  width: number;
  tags: string[];
  dominantColor: string;
  isCommentable: boolean;
  isPublic: boolean;
};

const Create = () => {
  const router = useRouter();
  const [uploadData, setUploadData] = useState<UploadDataType>({
    file: "",
    title: "",
    description: "",
    height: 0,
    width: 0,
    tags: [],
    dominantColor: "#FFFFFF",
    isCommentable: true,
    isPublic: true,
  });

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAtomValue(userAtom);

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
    formData.append("tags", JSON.stringify(uploadData.tags));
    formData.append("height", uploadData.height.toString());
    formData.append("width", uploadData.width.toString());
    formData.append("dominantColor", uploadData.dominantColor.toString());
    formData.append(
      "isCommentable",
      uploadData.isCommentable ? "true" : "false"
    );
    formData.append("isPublic", uploadData.isPublic ? "true" : "false");
    formData.append("author_uuid", user?.id ? user.id : "sOmEuIdHeRe");

    console.log(uploadData);
    try {
      toast.promise(
        async () => {
          setIsLoading(true);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          setIsLoading(false);

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const data: object[] = await response.json();
          router.push("/");
          return data;
        },
        {
          loading: "Uploading...",
          success: "Uploaded successfully!",
          error: "Upload failed.",
        }
      );
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
          disabled={isLoading}
        >
          {isLoading ? "Uploading" : "Upload"}{" "}
          {isLoading ? (
            <Loader className="animate-spin" size={15} />
          ) : (
            <Upload className="ml-2" />
          )}
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
              onChange={async (e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;

                if (selectedFile.size > 5 * 1024 * 1024) {
                  toast("Image must be less than 5MB!");
                  return;
                }

                try {
                  const averageColor = await getDominantColorOfImage(
                    selectedFile
                  );

                  setUploadData((prev) => ({
                    ...prev,
                    dominantColor: averageColor,
                  }));
                } catch (error) {
                  console.error("Failed to get color:", error);
                }

                const imageURL = URL.createObjectURL(selectedFile);
                const title = toCapitalize(selectedFile.name.split(".")[0]);
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
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5 w-full max-w-[500px]">
          <div>
            <Label className="mb-2" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Add image title"
              onChange={(e) => saveValue(e.target.value, "title")}
              value={uploadData.title}
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
              value={uploadData.description}
            />
          </div>

          <div>
            <Label className="mb-2">Tags</Label>
            <Tags setUploadData={setUploadData} />
          </div>

          <div className="flex items-center justify-between">
            <Label className="mb-1" htmlFor="allow-comment">
              Allow comments
            </Label>
            <Switch
              id="allow-comment"
              disabled={!uploadData.isPublic}
              checked={!uploadData.isPublic ? false : uploadData.isCommentable}
              onCheckedChange={(checked) => saveValue(checked, "isCommentable")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="mb-1" htmlFor="allow-public">
              Allow to public
            </Label>
            <Switch
              id="allow-public"
              checked={uploadData.isPublic}
              onCheckedChange={(checked) => saveValue(checked, "isPublic")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="mb-1" htmlFor="color-picker">
              Cover color (dominant color of image)
            </Label>
            <div className="flex items-center gap-4">
              <p>{uploadData.dominantColor}</p>
              <span
                className="grid place-items-center cursor-copy size-[30px] rounded-[8px] border border-[#FFFFFF40] group"
                style={{
                  background: uploadData.dominantColor,
                }}
                onClick={() => {
                  navigator.clipboard.writeText(uploadData.dominantColor);
                  toast.success("Color copied to clipboard");
                }}
              >
                <Copy
                  size={17}
                  className="mix-blend-difference group-hover:opacity-100 opacity-0 transition-opacity"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
