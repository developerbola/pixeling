"use client";

import { UploadDataType } from "@/app/create/page";
import { SetStateAction } from "jotai";
import { Dispatch, useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

export function Tags({
  setUploadData,
}: {
  setUploadData: Dispatch<SetStateAction<UploadDataType>>;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => {
          return (
            <Badge key={tag}>
              {tag}{" "}
              <X
                size={12}
                className="!cursor-pointer size-[12px] z-10 !pointer-events-auto"
                onClick={() => setTags(tags.filter((_tag) => tag !== _tag))}
              />
            </Badge>
          );
        })}
      </div>
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            if (!tags.includes(value)) {
              const newTags = [...tags, value];
              setTags(newTags);
              setUploadData((prev) => ({ ...prev, tags: newTags }));
            }
            setValue("");
          }
        }}
        placeholder="Write tags"
      />
    </div>
  );
}
