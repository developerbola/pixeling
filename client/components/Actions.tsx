"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

type ActionsProps = {
  title: string;
  description: string;
  uuid: string;
  imageUrl: string;
};

const Actions = ({ title, description, uuid, imageUrl }: ActionsProps) => {
  const handleShare = () => {
    const shareUrl = `https://pixeling.vercel.app/image/${uuid}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Look what i found in Pixeling website: ${title}`,
          text: description,
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.log("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownload = async () => {
    const response = await fetch(
      `http://localhost:3000/api/download?url=${imageUrl}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:border-none focus:outline-none hover:cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={handleDownload}>Download</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
