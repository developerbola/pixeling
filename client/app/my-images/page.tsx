"use client";
import Link from "next/link";
import { ImageType } from "../page";
import ImageItem from "@/components/ImageItem";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";
import { useEffect, useState } from "react";

const MyImages = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const fetchImages = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.id}/images`,
          {
            cache: "no-cache",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const fetchedImages = await res.json();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Unable to connect. You or server might be offline.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user?.id]);

  // Loading state
  if (loading) {
    return (
      <div className="grid place-items-center h-[calc(90vh-80px)]">
        <h1 className="text-2xl">Loading images...</h1>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid place-items-center h-[calc(90vh-80px)]">
        <h1 className="text-2xl">{error}</h1>
      </div>
    );
  }

  // Empty state or images
  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      {images.length === 0 ? (
        <div className="w-full text-center">No images yet</div>
      ) : (
        images.map((image: ImageType) => (
          <Link href={`/image/${image.id}`} key={image.id}>
            <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
              <ImageItem image={image} />
              <h2>{image.title}</h2>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MyImages;
