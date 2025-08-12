"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageType } from "@/app/page";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";

interface ImageItemProps {
  image: ImageType;
}

export default function ImageItem({ image }: ImageItemProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const user = useAtomValue(userAtom);

  if (!image.isPublic && user?.id !== image.author_uuid) {
    return (
      <div
        className="relative rounded-lg overflow-hidden cursor-not-allowed"
        style={{
          backgroundColor: loaded ? "transparent" : image.dominantColor,
        }}
      >
        <img
          src={image.imageUrl}
          alt={(image.title, image.description)}
          width={parseInt(image.width)}
          height={parseInt(image.height)}
          onLoad={() => setLoaded(true)}
          decoding="async"
          loading="lazy"
          className={cn(
            `transition-opacity duration-500 blur-xl`,
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
        <p
          className="absolute top-1/2 left-1/2 w-full text-center"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          This Content is not public
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ backgroundColor: loaded ? "transparent" : image.dominantColor }}
    >
      <img
        src={image.imageUrl}
        alt={(image.title, image.description)}
        width={parseInt(image.width)}
        height={parseInt(image.height)}
        onLoad={() => setLoaded(true)}
        decoding="async"
        loading="lazy"
        className={cn(
          `transition-opacity duration-500 `,
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
