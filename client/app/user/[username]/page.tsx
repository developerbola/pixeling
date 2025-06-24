import { ImageType } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Username from "./Username";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = await params;
  const { username } = resolvedParams;
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`
  );

  const data = await userRes.json();
  const userData = data[0];

  if (!Array.isArray(data)) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  if (userData.length === 0) {
    return (
      <div className="grid place-items-center h-[calc(90vh-150px)] text-[#ffffff90]">
        User not found
      </div>
    );
  }

  const imagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData.id}/images`
  );
  const images = await imagesRes.json();

  return (
    <div className="flex flex-col gap-6 px-8 py-6">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 border-[0.5px] border-[#ffffff40]">
          <AvatarImage src={userData.avatar_url} />
          <AvatarFallback>
            <LoaderCircle className="animate-spin" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <Username username={userData.username} />

          <p className="text-gray-500 mt-1">{userData.bio}</p>
        </div>
      </div>

      {/* User's Uploaded Images */}
      <div>
        {images.length > 0 ? (
          <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
            {images.map((image: ImageType) => (
              <div
                className="rounded-lg overflow-hidden exs:mb-3 sm:mb-5 break-inside-avoid"
                style={{
                  backgroundColor: image.dominantColor,
                }}
                key={image.id}
              >
                <Image
                  src={image.imageUrl}
                  alt={(image.title, image.description)}
                  width={parseInt(image.width)}
                  height={parseInt(image.height)}
                  decoding="async"
                  loading="lazy"
                  className={"transition-opacity duration-500"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            This user hasn't uploaded any images yet.
          </div>
        )}
      </div>
    </div>
  );
}
