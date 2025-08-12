"use client";

import { useEffect, useRef, useState } from "react";
import Actions from "@/components/Actions";
import ImageItem from "@/components/ImageItem";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

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
  isPublic: boolean;
  tags: string[];
  author_uuid: string;
}

interface PaginatedResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ImageType[];
}

export default function Home() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false); // prevent double fetch

  const fetchImages = async (pageNum: number) => {
    if (isFetchingRef.current) return; // avoid multiple triggers
    isFetchingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?page=${pageNum}&limit=${limit}`,
        { cache: "no-cache" }
      );
      const json: PaginatedResponse = await res.json();

      if (pageNum === 1) {
        setImages(json.data);
      } else {
        setImages((prev) => [...prev, ...json.data]);
      }

      setTotalPages(json.totalPages);
    } catch (err) {
      console.error("Failed to load images:", err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchImages(1);
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [totalPages, page]);

  // Fetch when page changes
  useEffect(() => {
    if (page > 1) fetchImages(page);
  }, [page]);

  if (loading && images.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
        {images.map((image) => (
          <div
            key={image.id}
            className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2"
          >
            <Link href={`/image/${image.id}`}>
              <ImageItem image={image} />
            </Link>
            <div className="flex items-center justify-between">
              <Link href={`/image/${image.id}`}>
                <h2>{image.title}</h2>
              </Link>
              <Actions
                title={image.title}
                description={image.description}
                uuid={image.id}
                imageUrl={image.imageUrl}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Invisible loader trigger */}
      <div ref={sentinelRef} className="h-1"></div>

      {/* Optional loader at bottom */}
      {loading && images.length > 0 && (
        <div className="flex justify-center py-4 text-[#ffffff90]">
          <LoaderCircle className="animate-spin" size={24} />
        </div>
      )}
    </>
  );
}
