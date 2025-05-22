const { supabase } = require("../config/supabase.js");
const { getDominantColorOfImage } = require("../helpers/getDominantColor.js");
const { imageUploadSchema } = require("../schema/image.schema.js");
const { buffer } = require("stream/consumers");

export const uploadController = async (c) => {
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

    // If file uploaded, save to storage and extract dominant color
    if (file && typeof file.stream === "function") {
      const filePath = `${Date.now()}.png`;

      // Convert file stream to buffer
      const fileBuffer = await buffer(file.stream());

      // Upload file to Supabase Storage
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

      // Extract dominant color from uploaded file
      try {
        const rgbColor = await getDominantColorOfImage(publicUrl);
        // Convert RGB object to CSS color string
        dominantColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
      } catch (colorError) {
        console.error("Color extraction error:", colorError);
        dominantColor = "rgb(255, 255, 255)"; // Default to white
      }
    } else if (imageUrl) {
      publicUrl = imageUrl;
      // Extract dominant color from imageUrl
      try {
        const rgbColor = await getDominantColorOfImage(imageUrl);
        // Convert RGB object to CSS color string
        dominantColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
      } catch (colorError) {
        console.error("Color extraction error:", colorError);
        dominantColor = "rgb(0, 0, 0)"; // Default to white
      }
    } else {
      return c.json({ error: "No image provided" }, 400);
    }

    // Inserting image to "image-list" table
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
