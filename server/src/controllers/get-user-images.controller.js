import { supabase } from "../config/supabase.js";

const getUserImages = async (c) => {
  try {
    const { user_uuid } = c.req.params();
    if (!user_uuid) {
      c.json({ error: "User id not found" }, 404);
    }

    const { data, error } = supabase
      .from("image-list")
      .select()
      .eq("author_uuid", user_uuid);

    if (error) {
      c.json({ error: error || error.message || error.error });
    }

    return c.json(data);
  } catch (error) {
    return c.json({ error: error || error.message || error.error });
  }
};

export default getUserImages;
