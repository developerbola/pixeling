"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageType } from "@/app/page";
import Image from "next/image";

interface ImageItemProps {
  image: ImageType;
}

export default function ImageItem({ image }: ImageItemProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ backgroundColor: loaded ? "transparent" : image.dominantColor }}
    >
      <Image
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
