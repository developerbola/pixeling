"use client";

import { useEffect, useState, useCallback } from "react";
import Actions from "@/components/Actions";
import ImageItem from "@/components/ImageItem";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Masonry } from "react-plock";

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

export type ImagesListType = { code: number; message: string } | ImageType[];

export default function Home() {
  const [data, setData] = useState<ImageType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const fetchImages = useCallback(async () => {
    try {
      if (page === 1) setLoading(true);
      else setBottomLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?page=${page}&limit=${LIMIT}`,
        { cache: "no-cache" }
      );
      const json = await res.json();

      if (!json?.data || !Array.isArray(json.data)) {
        setHasMore(false);
        if (page === 1) setData([]);
        return;
      }

      if (json.data.length < LIMIT) setHasMore(false);
      setData((prev) => [...prev, ...json.data]);
    } catch (err) {
      console.error(err);
      if (page === 1) setData([]);
    } finally {
      setLoading(false);
      setBottomLoading(false);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    if (bottomLoading || !hasMore) return;
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, [bottomLoading, hasMore]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // First load
  if (loading && page === 1) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  // No images
  if (!loading && data.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h2 className="text-2xl">No images found.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Masonry
        items={data}
        config={{
          columns: [2, 3, 4],
          gap: [8, 20, 20],
          media: [480, 768, 1024],
          useBalancedLayout: true,
        }}
        render={(image) => (
          <div key={image.id} className="flex flex-col gap-2">
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
        )}
      />

      {/* Infinite scroll indicators */}
      {bottomLoading && (
        <div className="grid place-items-center h-[100px] text-[#ffffff90]">
          <LoaderCircle className="animate-spin" size={32} />
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-[#ffffff60] py-4 text-sm">
          No more images to load.
        </div>
      )}
    </div>
  );
}
