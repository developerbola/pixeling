"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
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
        e.code === "Enter" &&
        router.replace(
          `/search/${(e.target as HTMLInputElement).value
            .split(" ")
            .join("-")
            .toLowerCase()}`
        )
      }
    />
  );
};

export default Search;
