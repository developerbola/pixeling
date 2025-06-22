import { supabase } from "../config/supabase.js";

const images = async (c) => {
  try {
    const { data, error } = await supabase
      .from("image-list")
      .select("*")
      .eq("isPublic", true);

    if (error) {
      return c.json({ message: error.message }, 500);
    }

    return c.json(data, 200);
  } catch (err) {
    console.error("Unexpected error in images:", err);
    return c.json({ message: err.message || String(err) }, 500);
  }
};

export default images;
