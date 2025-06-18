import { supabase } from "../config/supabase.js";

const singleImageController = async (c) => {
  try {
    const { uuid } = c.req.params();

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

export default singleImageController;
