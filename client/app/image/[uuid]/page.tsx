"use client";
import { ImageType } from "@/app/page";
import { userAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Image = () => {
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

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${uuid}`
      );
      const data = await res.json();
      setImage(data);
    };
    fetchImage();
  }, []);

  return (
    <div>
      <h1>Image: {uuid}</h1>
      <h1>
        isOwner:{" "}
        {image && user
          ? image.author_uuid === user.id
            ? "Yes"
            : "No"
          : "Checking..."}
      </h1>
    </div>
  );
};

export default Image;
