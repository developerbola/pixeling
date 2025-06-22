"use client";
import { ImageType } from "@/app/page";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { userAtom } from "@/lib/atom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleImage = () => {
  const { uuid } = useParams();
  const user = useAtomValue(userAtom);
  const [image, setImage] = useState<ImageType>({
    id: "",
    created_at: "",
    title: "",
    description: "",
    dominantColor: "",
    imageUrl: "",
    height: "",
    width: "",
    isCommentable: false,
    categories: [],
    author_uuid: "",
  });
  const [author, setAuthor] = useState({
    name: "",
    username: "",
    avatar_url: "",
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // const fetchAuthor = async () => {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${image.author_uuid}`
    //   );
    //   const data = await res.json();
    //   setAuthor(data);
    // };

    const fetchImage = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${uuid}`
      );
      const data = await res.json();

      setImage(data);
      // fetchAuthor();
    };
    fetchImage();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-3 w-[70%]">
        <div className="h-[400px]">
          {image.imageUrl && (
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: loaded ? "transparent" : image.dominantColor,
              }}
            >
              <Image
                src={image.imageUrl}
                alt={(image.title, image.description)}
                width={400}
                height={400}
                onLoad={() => setLoaded(true)}
                decoding="async"
                loading="lazy"
                className={cn(
                  `transition-opacity duration-500 w-auto h-[400px]`,
                  loaded ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{image.title}</h1>
          <h1 className="text-gray-400 text-lg">{image.description}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="cursor-pointer border-[0.5px] border-[#ffffff40]">
            <AvatarImage src={author?.avatar_url} />
            <AvatarFallback>
              <LoaderCircle className="animate-spin" />
            </AvatarFallback>
          </Avatar>
          <h1>{author?.name}</h1>
        </div>
        <div>
          <h1>Comments</h1>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
