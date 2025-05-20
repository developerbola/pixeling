import { supabase } from "../config/supabase.js";
import { imageUploadSchema } from "../schema/image.schema.js";
import fetch from "node-fetch";
import { buffer } from "stream/consumers";

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
      const filePath = `images/${Date.now()}.png`;

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

      // Extract dominant color from file buffer
      dominantColor = estimateDominantColor(fileBuffer);
    } else if (imageUrl) {
      publicUrl = imageUrl;

      // Fetch remote image buffer
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const byteArray = new Uint8Array(arrayBuffer);

      dominantColor = estimateDominantColor(byteArray);
    } else {
      return c.json({ error: "No image provided" }, 400);
    }

    // Insert into image-list table
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
      dominantColor,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return c.json({ error: "Unexpected server error" }, 500);
  }
};

// Helper to estimate dominant color from buffer (simple average)
function estimateDominantColor(byteArray) {
  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  // Loop through first N bytes (every 3rd byte is R,G,B)
  for (let i = 0; i < byteArray.length - 3 && count < 300; i += 3) {
    r += byteArray[i];
    g += byteArray[i + 1];
    b += byteArray[i + 2];
    count++;
  }

  // Prevent divide by zero
  if (count === 0) count = 1;

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return rgbToHex(r, g, b);
}

// Convert RGB to HEX
function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
