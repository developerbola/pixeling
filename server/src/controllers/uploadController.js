import { supabase } from "../config/supabase.js";

export const uploadController = async (c) => {
  const body = await c.req.formData();
  const file = body.get("file");
  const imageUrl = body.get("imageUrl");
  const title = body.get("title");
  const description = body.get("description");
  const isCommentable = body.get("isCommentable") === "true";
  const categories = JSON.parse(body.get("categories"));

  let publicUrl = "";

  if (file && typeof file.stream === "function") {
    const filePath = `images/${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file.stream(), {
        contentType: file.type,
      });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    publicUrl = publicUrlData.publicUrl;
  } else if (imageUrl) {
    publicUrl = imageUrl;
  }

  return c.json({
    success: true,
    publicUrl,
    title,
    description,
    isCommentable,
    categories,
  });
};
