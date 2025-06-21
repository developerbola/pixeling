import { supabase } from "../config/supabase.js";

const search = async (c) => {
  try {
    const { searchPrompt } = await c.req.json();
    const { data, error } = await supabase
      .from("image-list")
      .select("name, description")
      .ilike("name", `%${searchPrompt}%`);

    if (error) {
      return c.json({ error: "An error occurred during searching" }, 500);
    }

    return c.json(data);
  } catch (error) {
    return c.json(
      {
        error: error?.message || error?.error || "Unexpected error occurred",
      },
      500
    );
  }
};

export default search;
