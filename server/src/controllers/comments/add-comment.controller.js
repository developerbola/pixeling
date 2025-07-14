import { supabase } from "../../config/supabase.js";

const addComment = async (c) => {
  const { image_uuid, author_uuid, author_name, author_avatar_url, comment } =
    await c.req.json();
  console.log({
    image_uuid,
    author_uuid,
    author_name,
    author_avatar_url,
    comment,
  });

  try {
    const { error } = await supabase.from("comments").insert([
      {
        image_uuid: image_uuid,
        author_uuid: author_uuid,
        author_name: author_name,
        author_avatar_url: author_avatar_url,
        comment: comment,
      },
    ]);

    if (error) {
      return c.json(
        {
          error: "An error occured during adding comment:",
          error,
        },
        400
      );
    }

    return c.json({ message: "Comment added!" });
  } catch (error) {
    return c.json(
      {
        error: "An error occured during adding comment:",
        error,
      },
      500
    );
  }
};

export default addComment;
