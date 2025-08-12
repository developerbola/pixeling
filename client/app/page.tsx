"use client";

import { useEffect, useState } from "react";
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
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10; // images per page

  const fetchImages = () => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?page=${page}&limit=${limit}`,
      {
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() =>
        setData({
          page,
          limit,
          total: 0,
          totalPages: 0,
          data: [],
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  if (loading) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h2 className="text-2xl">No images found.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
        {data.data.map((image) => (
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

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {data.page} of {data.totalPages}
        </span>
        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
