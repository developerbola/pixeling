import { supabase } from "../config/supabase.js";
import { getDominantColorOfImage } from "../helpers/getDominantColor.js";
import imageUploadSchema from "../schema/image.schema.js";
import { buffer } from "stream/consumers";

const uploadController = async (c) => {
  try {
    const body = await c.req.formData();

    const file = body.get("file");
    const rawData = {
      title: body.get("title"),
      description: body.get("description"),
      imageUrl: body.get("imageUrl"),
      height: body.get("height"),
      width: body.get("width"),
      isCommentable: body.get("isCommentable"),
      categories: body.get("categories"),
    };

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
      height,
      width,
      isCommentable,
      categories,
    } = parseResult.data;

    let publicUrl = "";
    let dominantColor = "";

    if (file && typeof file.stream === "function") {
      const filePath = `${Date.now()}.png`;
      const fileBuffer = await buffer(file.stream());

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, fileBuffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return c.json(
          { error: `Error on uploading file: ${uploadError.message}` },
          500
        );
      }

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Get URL error:", urlError.message);
        return c.json({ error: urlError.message }, 500);
      }

      publicUrl = publicUrlData.publicUrl;

      try {
        const rgbColor = await getDominantColorOfImage(publicUrl);
        dominantColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
      } catch (colorError) {
        console.error("Color extraction error:", colorError);
        dominantColor = "rgb(0, 0, 0)";
      }
    } else if (imageUrl) {
      publicUrl = imageUrl;

      try {
        const rgbColor = await getDominantColorOfImage(imageUrl);
        dominantColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
      } catch (colorError) {
        console.error("Color extraction error:", colorError);
        dominantColor = "rgb(0, 0, 0)";
      }
    } else {
      return c.json({ error: "No image provided" }, 400);
    }

    const { error: insertError } = await supabase.from("image-list").insert([
      {
        title,
        description,
        imageUrl: publicUrl,
        height,
        width,
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

export default uploadController;
