
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  categories: string[];
  author_uuid: string;
}

export default async function SingleImagePage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;

  // Fetch image
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${uuid}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const image: ImageType = await res.json();

  // Fetch author
  const authorRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${image.author_uuid}`,
    { cache: "no-store" }
  );

  const author = authorRes.ok
    ? await authorRes.json()
    : { name: "Unknown", avatar_url: "" };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="inline-flex flex-col gap-3 w-[70%]">
        {/* Image */}
        <div className={`h-[400px] w-fit`}>
          {image.imageUrl && (
            <div
              className={`rounded-lg overflow-hidden max-w-[${image.width}]`}
              style={{
                backgroundColor: image.dominantColor,
              }}
            >
              <Image
                src={image.imageUrl}
                alt={`${image.title} - ${image.description}`}
                width={400}
                height={400}
                decoding="async"
                loading="eager"
                className="transition-opacity duration-500 w-auto h-[400px]"
              />
            </div>
          )}
        </div>

        {/* Title + Description */}
        <div>
          <h1 className="text-3xl font-bold">{image.title}</h1>
          <h1 className="text-gray-400 text-lg">{image.description}</h1>
        </div>

        {/* Author */}
        <Link
          href={`/user/${author.username}`}
          className="flex items-center gap-2"
        >
          <Avatar className="cursor-pointer border-[0.5px] border-[#ffffff40]">
            <AvatarImage src={author.avatar_url} />
            <AvatarFallback>
              <LoaderCircle className="animate-spin" />
            </AvatarFallback>
          </Avatar>
          <h1>{author.name}</h1>
        </Link>

        {/* Comments */}
        <div>
          <h1 className="text-xl font-semibold">Comments</h1>
          {image.isCommentable ? (
            <div className="text-gray-400">Comments section coming soon…</div>
          ) : (
            <div className="italic text-gray-500">
              Comments are disabled for this image.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
