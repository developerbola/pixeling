import DominantColorImage from "@/components/DominantColorImage";
import ProgressLink from "@/components/ProgressLink";
import Image from "next/image";

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default async function Home() {
  const res = await fetch(`https://picsum.photos/v2/list?page=1&limit=100`);
  const data = await res.json();

  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 gap-5">
      {data.map((image: Image) => {
        return (
          <ProgressLink href={`/${image.id}`} key={image.id}>
            <div className="mb-5 break-inside-avoid flex flex-col gap-2">
              <DominantColorImage
                src={image.download_url}
                height={image.height}
                width={image.width}
                alt={image.author}
              />
              <h2>{image.author}</h2>
            </div>
          </ProgressLink>
        );
      })}
    </div>
  );
}
