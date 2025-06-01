"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);

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
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) =>
        e.code === "Enter" && handleSubmit((e.target as HTMLInputElement).value)
      }
    />
  );
};

export default Search;
