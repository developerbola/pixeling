"use client";

import { ImageType } from "@/app/page";
import { Loader, Loader2, LoaderCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Comment = {
  image_uuid: string;
  author_uuid: string;
  author_name: string;
  author_avatar_url: string;
  comment: string;
};

type Error = {
  error?: string;
};

const Comments = ({ image }: { image: ImageType }) => {
  if (!image.isCommentable) {
    return (
      <div className="italic text-gray-500">
        Comments are disabled for this image.
      </div>
    );
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[] | Error>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${image.id}`;
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setComments(data);
      setIsLoading(false);
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Comments</h1>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="w-full h-[50px] animate-pulse bg-[#ffffff20]" />
        ) : (
          <div>
            {"error" in comments ? (
              <div>{comments.error}</div>
            ) : Array.isArray(comments) ? (
              comments.length === 0 && !isLoading ? (
                <div className="text-gray-500">No comments yet, be first!</div>
              ) : (
                comments.map((comment: Comment) => {
                  return (
                    <div
                      key={comment.image_uuid}
                      className="flex flex-wrap gap-2"
                    >
                      <Link
                        href={`/user/${comment.author_uuid}`}
                        className="flex items-center gap-1"
                      >
                        <Avatar className="cursor-pointer border-[0.5px] border-[#ffffff40] size-5">
                          <AvatarImage src={comment.author_avatar_url} />
                          <AvatarFallback>
                            <LoaderCircle className="animate-spin" />
                          </AvatarFallback>
                        </Avatar>
                        <p className="opacity-70 italic">{comment.author_name}:</p>
                      </Link>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })
              )
            ) : null}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Input
            placeholder="New comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          {newComment ? (
            <Button variant={"ghost"}>
              <PlusCircle />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comments;
