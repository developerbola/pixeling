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

    const { data: _data, error: _error } = supabase
      .from("image-list")
      .select("author_uuid");

    if (error) {
      c.json({
        error:
          error ||
          error.message ||
          error.error ||
          `Error occured in getting .eq("author_uuid", user_uuid)`,
      });
    }
    
    return c.json(_data);
  } catch (error) {
    return c.json({ error: error || error.message || error.error });
  }
};

export default getUserImages;
