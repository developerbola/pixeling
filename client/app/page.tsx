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
  return (
    <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 gap-5"></div>
  );
}
