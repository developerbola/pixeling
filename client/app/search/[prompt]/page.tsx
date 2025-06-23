import { ImagesListType, ImageType } from "@/app/page";
import ImageItem from "@/components/ImageItem";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const Search = async ({ params }: { params: { prompt: string } }) => {
  const { prompt } = await params;

  const searchPrompt =
    typeof prompt === "string" ? prompt.split("-").join(" ") : "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchPrompt: searchPrompt,
    }),
  });

  if (!res.ok) {
    throw new Error("Search request failed");
  }

  const data: ImagesListType = await res.json();

  if (data === null) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <h1>No images found</h1>
      </div>
    );
  }

  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
      {Array.isArray(data) ? (
        data.map((image: ImageType) => (
          <Link href={`/image/${image.id}`} key={image.id}>
            <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
              <ImageItem image={image} />
              <h2>{image.title}</h2>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white text-center text-lg">
          {data?.message || "No images found."}
        </p>
      )}
    </div>
  );
};

export default Search;
