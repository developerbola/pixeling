import { supabase } from "../config/supabase";

export const singleImageController = async (c) => {
  try {
    const { uuid } = c.req.params();
    const { data, error } = await supabase
      .from("image-list")
      .select("*")
      .eq("id", uuid)
      .single();

    if (error) {
      c.json({ error: error }, 400);
    }

    return c.json(data);
  } catch (error) {
    return c.json({ error: error || error.message }, 500);
  }
};
