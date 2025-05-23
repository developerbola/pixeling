import ImageItem from "@/components/ImageItem";
import ProgressLink from "@/components/ProgressLink";

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
}

type DataType = { code: number; message: string } | ImageType[];

export default async function Home() {
  let data: DataType = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`);
    data = await res.json();
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

  // If it's an error response (not an array)
  if (!Array.isArray(data)) {
    if (
      data.code === 500 &&
      data.message ===
        "Error: Unable to connect. Is the computer able to access the url?'"
    ) {
      return (
        <div className="grid place-items-center h-[calc(90vh-80px)]">
          <h1 className="text-2xl">Unable to connect to the server</h1>
        </div>
      );
    }

    return (
      <div className="grid place-items-center h-[calc(90vh-80px)]">
        <h1 className="text-2xl">Internal server error</h1>
      </div>
    );
  }

  // Normal render if data is good
  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 gap-5">
      {data.map((image: ImageType) => (
        <ProgressLink href={`/${image.id}`} key={image.id}>
          <div className="mb-5 break-inside-avoid flex flex-col gap-2">
            <ImageItem image={image} />
            <h2>{image.title}</h2>
          </div>
        </ProgressLink>
      ))}
    </div>
  );
}
