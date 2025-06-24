"use client"
import { toast } from "sonner";

const Username = ({ username }: { username: string }) => {
  return (
    <p
      className="text-gray-400 cursor-copy w-fit"
      onClick={() => {
        navigator.clipboard.writeText(
          `https://pixeling.vercel.app/user/${username}`
        );
        toast.success("Username copied to clipboard");
      }}
    >
      @{username}
    </p>
  );
};

export default Username;
