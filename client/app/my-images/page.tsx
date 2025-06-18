"use client"
import Link from "next/link";
import { ImageType } from "../page";
import ImageItem from "@/components/ImageItem";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";

const MyImages = async () => {
  let images: ImageType[] = [];
  const user = useAtomValue(userAtom);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.id as string}/images`,
      {
        cache: "no-cache",
      }
    );
    images = await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="grid place-items-center h-[calc(90vh-80px)]">
        <h1 className="text-2xl">
          Unable to connect. You or server might be offline.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      {images.map((image: ImageType) => (
        <Link href={`/image/${image.id}`} key={image.id}>
          <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
            <ImageItem image={image} />
            <h2>{image.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyImages;
