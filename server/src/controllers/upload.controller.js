import { supabase } from "../config/supabase.js";
import { imageUploadSchema } from "../schema/image.schema.js";

export const uploadController = async (c) => {
  try {
    const body = await c.req.formData();

    // Extract fields
    const file = body.get("file");
    const rawData = {
      title: body.get("title"),
      description: body.get("description"),
      imageUrl: body.get("imageUrl"),
      isCommentable: body.get("isCommentable"),
      dominantColor: body.get("dominantColor"),
      categories: body.get("categories"),
    };

    // Validate data with Zod
    const parseResult = imageUploadSchema.safeParse(rawData);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map(
        (e) => `${e.path[0]}: ${e.message}`
      );
      return c.json(
        { error: "Validation failed", details: errorMessages },
        400
      );
    }

    const {
      title,
      description,
      imageUrl,
      isCommentable,
      dominantColor,
      categories,
    } = parseResult.data;

    let publicUrl = "";

    // If file uploaded, save to storage
    if (file && typeof file.stream === "function") {
      const filePath = `images/${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file.stream(), {
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return c.json({ error: uploadError.message }, 500);
      }

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Get URL error:", urlError.message);
        return c.json({ error: urlError.message }, 500);
      }

      publicUrl = publicUrlData.publicUrl;
    } else if (imageUrl) {
      publicUrl = imageUrl;
    } else {
      return c.json({ error: "No image provided" }, 400);
    }

    // Insert into image-list table
    const { error: insertError } = await supabase.from("image-list").insert([
      {
        title,
        description,
        imageUrl: publicUrl,
        dominantColor,
        isCommentable: isCommentable === "true",
        categories,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return c.json({ error: insertError.message }, 500);
    }

    return c.json({
      ok: true,
      message: "Image published and added to list",
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json({ error: "Unexpected server error" }, 500);
  }
};
