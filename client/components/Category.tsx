"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const categories = [
  { value: "technology", label: "Technology" },
  { value: "career", label: "Career" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "sports", label: "Sports" },
  { value: "food", label: "Food & Cooking" },
  { value: "travel", label: "Travel" },
  { value: "clothing", label: "Clothing" },
  { value: "cars", label: "Cars" },
];

export function Category({
  setUploadData,
}: {
  setUploadData: Dispatch<
    SetStateAction<{
      file: string;
      title: string;
      description: string;
      height: number;
      width: number;
      categories: string[];
      isCommentable: boolean;
    }>
  >;
}) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setUploadData((prev) => ({ ...prev, selectedValues }));
  }, [selectedValues, setUploadData]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValues.length > 0 ? (
            <div className="flex gap-1 items-center flex-wrap">
              {selectedValues.length <= 3 ? (
                selectedValues.map((value) => (
                  <span key={value} className="rounded px-1 text-xs">
                    {
                      categories.find((category) => category.value === value)
                        ?.label
                    }
                  </span>
                ))
              ) : (
                <span className="rounded px-1 text-xs">
                  {selectedValues.length} categories selected
                </span>
              )}
            </div>
          ) : (
            "Select categories..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setSelectedValues((prev) => {
                      if (prev.includes(currentValue)) {
                        return prev.filter((value) => value !== currentValue);
                      } else {
                        return [...prev, currentValue];
                      }
                    });
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(category.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
