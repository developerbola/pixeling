import { supabase } from "../config/supabase.js";

const singleImage = async (c) => {
  try {
    const { uuid } = c.req.param();

    const { data, error } = await supabase
      .from("image-list")
      .select("*")
      .eq("id", uuid)
      .single();

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message || "Unexpected error" }, 500);
  }
};

export default singleImage;
