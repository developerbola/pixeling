"use client";

import { useEffect, useState } from "react";

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

const Comments = ({ image_uuid }: { image_uuid: string }) => {
  const [comments, setComments] = useState<Comment[] | Error>([]);
  useEffect(() => {
    const fetchComments = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/${image_uuid}`;
      const res = await fetch(url, { cache: "no-store" });
      console.log(url);

      const data = await res.json();
      console.log(data);

      setComments(data);
    };

    fetchComments();
  }, []);

  return (
    <div>
      {"error" in comments ? (
        <div>{comments.error}</div>
      ) : Array.isArray(comments) ? (
        comments.map((comment: Comment) => {
          return (
            <div key={comment.image_uuid}>
              {comment.comment} - {comment.author_name}
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default Comments;
