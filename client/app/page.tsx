"use client";

import ImageItem from "@/components/ImageItem";
import { imagesAtom } from "@/lib/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface ImageType {
  id: string;
  created_at: string;
  title: string;
  description: string;
  dominantColor: string;
  imageUrl: string;
  height: string;
  width: string;
  isCommentable: boolean;
  categories: string[];
  author_uuid: string;
}

export type ImagesListType = { code: number; message: string } | ImageType[];

export default function Home() {
  const setImagesList = useSetAtom(imagesAtom);
  const imagesList = useAtomValue(imagesAtom);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/images`
        );
        const data = await res.json();
        setImagesList(data);
      } catch (error) {
        setImagesList({
          code: 500,
          message: `Failed to fetch images: ${error}`,
        });
        console.log(error);
      }
    };

    fetchImages();
  }, [imagesList]);

  if (imagesList === null) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  // Render error state
  if (imagesList && !Array.isArray(imagesList)) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h2 className="text-2xl">{imagesList.message}</h2>
      </div>
    );
  }

  // Render images
  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      {imagesList?.map((image: ImageType) => (
        <Link href={`/image/${image.id}`} key={image.id}>
          <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
            <ImageItem image={image} />
            <h2>{image.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
