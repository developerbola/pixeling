import ImageItem from "@/components/ImageItem";
import ProgressLink from "@/components/ProgressLink";

export interface ImageType {
  id: string;
  title: string;
  description: string;
  dominantColor: string;
  imageUrl: string;
  height: string;
  width: string;
  isCommentable: boolean;
  categories: string[];
}

export default async function Home() {
  let data: any = [];

  try {
    const res = await fetch(`http://localhost:8787/images`);
    data = await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="grid place-items-center h-screen">
        <h1 className="text-2xl">Unable to connect. You might be offline.</h1>
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
        <div className="grid place-items-center h-screen">
          <h1 className="text-2xl">Unable to connect to the server</h1>
        </div>
      );
    }

    return (
      <div className="grid place-items-center h-screen">
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
