import Actions from "@/components/Actions";
import ImageItem from "@/components/ImageItem";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { GetSession } from "./GetSession";

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

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
    cache: "no-cache",
  });
  const data = await res.json();

  if (data === null) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  // Render error state
  if (data && !Array.isArray(data)) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h2 className="text-2xl">{data.message}</h2>
      </div>
    );
  }

  // Render images
  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      <GetSession />
      {data?.map((image: ImageType) => (
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
  );
}
