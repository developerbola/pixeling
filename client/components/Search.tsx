"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchValue.split(" ").join("-").toLowerCase();

    window.location.href = `/search/${value}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex justify-end">
      <Input
        placeholder="Search"
        className={cn(
          isFocused
            ? "placeholder:text-muted-foreground sm:w-[300px] exs:w-[90%]"
            : "!placeholder-white w-[75px]",
          "transition-all"
        )}
        name="search"
        autoComplete="false"
        onFocus={() => setIsFocused(true)}
        onBlur={() => (searchValue ? null : setIsFocused(false))}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </form>
  );
};

export default Search;
