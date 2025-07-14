"use client";

import { ImageType } from "@/app/page";
import { Delete, LoaderCircle, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/atom";
import { toast } from "sonner";

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

const CommentsLogic = ({ image }: { image: ImageType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[] | Error>([]);
  const [newComment, setNewComment] = useState<string>("");

  const user = useAtomValue(userAtom);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`;

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const res = await fetch(`${url}/${image.id}`, { cache: "no-store" });
      const data = await res.json();
      setComments(data);
      setIsLoading(false);
    };
    fetchComments();
  }, [image.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const _new = {
      image_uuid: image.id,
      author_uuid: user?.id ?? "",
      author_name: user?.user_metadata?.name || "",
      author_avatar_url: user?.user_metadata?.avatar_url,
      comment: newComment,
    };
    const commentAddLink = `http://localhost:3000/api/comments/add`;
    try {
      const res = await fetch(commentAddLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_new),
      });
      console.log(res);

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error(data.error || "Something went wrong!");
        return;
      }

      toast.success("Comment added successfully!");

      setComments([...(Array.isArray(comments) ? comments : []), _new]);
      setNewComment("");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="w-full h-[50px] animate-pulse bg-[#ffffff20]" />;
  }

  if ("error" in comments) {
    return <div>{comments.error}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {Array.isArray(comments) ? (
        comments.length === 0 && !isLoading ? (
          <div className="text-gray-500">No comments yet, be first!</div>
        ) : (
          <div className="flex flex-col gap-2">
            {comments.map((comment: Comment) => {
              return (
                <div
                  key={comment.author_uuid + comment.comment}
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
            })}
          </div>
        )
      ) : null}
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <Input
          placeholder="New comment"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        />
        {newComment.trim() ? (
          <Button variant={"ghost"} type="submit">
            <PlusCircle />
          </Button>
        ) : null}
      </form>
    </div>
  );
};

const Comments = ({ image }: { image: ImageType }) => {
  if (!image.isCommentable) {
    return (
      <div className="italic text-gray-500">
        Comments are disabled for this image.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Comments</h1>
      <CommentsLogic image={image} />
    </div>
  );
};

export default Comments;
