"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { imagesAtom } from "@/lib/atom";

const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const setImages = useSetAtom(imagesAtom);

  const handleSubmit = async (value: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchPrompt: value,
        }),
      });

      if (!res.ok) {
        throw new Error("Search request failed");
      }
      const data = await res.json();
      setImages(data);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <Input
      placeholder="Search"
      className={cn(
        isFocused
          ? "placeholder:text-muted-foreground sm:w-[300px] exs:w-full"
          : "!placeholder-white w-[75px]",
        "transition-all"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => (searchValue ? null : setIsFocused(false))}
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
      onKeyDown={(e) =>
        e.code === "Enter" && handleSubmit((e.target as HTMLInputElement).value)
      }
    />
  );
};

export default Search;
