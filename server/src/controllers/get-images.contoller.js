import { supabase } from "../config/supabase.js";

export const getImages = async (c) => {
  try {
    const { data, error } = await supabase.from("image-list").select("*");

    if (error) {
      return c.json({ message: error.message, code: 500 });
    }

    return c.json(data);
  } catch (error) {
    return c.json({ message: error.message || error, code: 500 });
  }
};
