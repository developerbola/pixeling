"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (value: string) => {
    console.log(value);
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
