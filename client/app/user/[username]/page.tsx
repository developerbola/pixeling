import { ImageType } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";
import Username from "./Username";
import Link from "next/link";
import ImageItem from "@/components/ImageItem";

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
    <div className="flex flex-col gap-6">
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

      <div>
        {images.length > 0 ? (
          <div className="w-full exs:columns-2 md:columns-3 lg:columns-4 exs:gap-2 sm:gap-5">
            {images.map((image: ImageType) => (
              <Link href={`/image/${image.id}`} key={image.id}>
                <div className="exs:mb-3 sm:mb-5 break-inside-avoid flex flex-col gap-2">
                  <ImageItem image={image} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            This user hasn&apos;t uploaded any images yet.
          </div>
        )}
      </div>
    </div>
  );
}
