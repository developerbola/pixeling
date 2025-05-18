"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DominantColorImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function DominantColorImage({
  src,
  alt,
  width,
  height,
}: DominantColorImageProps) {
  const [dominantColor, setDominantColor] = useState<string>("#eee");
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      setDominantColor(`rgb(${r},${g},${b})`);
    };
  }, [src]);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ backgroundColor: loaded ? "transparent" : dominantColor }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        className={cn(
          `transition-opacity duration-500 `,
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
