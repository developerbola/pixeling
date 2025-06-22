import { supabase } from "../config/supabase.js";

const userImages = async (c) => {
  try {
    const { user_uuid } = c.req.param();

    if (!user_uuid) {
      return c.json({ error: "User id not found" }, 404);
    }

    // Get images by specific user
    const { data, error } = await supabase
      .from("image-list")
      .select("*")
      .eq("author_uuid", user_uuid);

    if (error) {
      return c.json({
        error: error.message || "Failed to fetch user images",
      }, 500);
    }

    return c.json(data); // only the user's images
  } catch (error) {
    return c.json({
      error: error?.message || "Unexpected error occurred",
    }, 500);
  }
};

export default userImages;
