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

type ActionsProps = {
  title: string;
  description: string;
  uuid: string;
};

const Actions = ({ title, description, uuid }: ActionsProps) => {
  const handleShare = () => {
    const shareUrl = `https://pixeling.vercel.app/image/${uuid}`;

    if (navigator.share) {
      navigator
        .share({
          title,
          text: description,
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.log("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
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
        <DropdownMenuItem>Download</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
