import { supabase } from "../config/supabase.js";

const getImages = async (c) => {
  try {
    const { data, error } = await supabase.from("image-list").select("*");

    if (error) {
      return c.json({ message: error.message }, 500);
    }

    return c.json(data, 200);
  } catch (err) {
    console.error("Unexpected error in getImages:", err);
    return c.json({ message: err.message || String(err) }, 500);
  }
};

export default getImages;
