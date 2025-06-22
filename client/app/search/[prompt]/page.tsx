"use client";
import { ImageType } from "@/app/page";
import ImageItem from "@/components/ImageItem";
import { imagesAtom } from "@/lib/atom";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const Search = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { prompt } = useParams();
  const imagesList = useAtomValue(imagesAtom);

  const searchPrompt =
    typeof prompt === "string" ? prompt.split("-").join(" ") : "";

  const setImages = useSetAtom(imagesAtom);

  const handleSubmit = async (value: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchPrompt: value,
        }),
      });

      if (!res.ok) {
        throw new Error("Search request failed");
      }
      const data = await res.json();
      setImages(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit(searchPrompt);
  }, [searchPrompt]);

  if (loading) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  if (Array.isArray(imagesList) && imagesList.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h1>No images found</h1>
      </div>
    );
  }

  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      {Array.isArray(imagesList) ? (
        imagesList.map((image: ImageType) => (
          <Link href={`/image/${image.id}`} key={image.id}>
            <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
              <ImageItem image={image} />
              <h2>{image.title}</h2>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white text-center text-lg">
          {imagesList?.message || "No images found."}
        </p>
      )}
    </div>
  );
};

export default Search;
