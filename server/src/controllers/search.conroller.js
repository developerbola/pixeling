import { supabase } from "../config/supabase.js";

const search = async (c) => {
  try {
    const { searchPrompt } = await c.req.json();
    console.log("Received search prompt:", searchPrompt);

    const { data, error } = await supabase
      .from("image-list")
      .select("*")
      .ilike("title", `%${searchPrompt}%`);

    if (error) {
      console.error("Supabase error:", error);
      return c.json({ error: "An error occurred during searching" }, 500);
    }

    return c.json(data);
  } catch (error) {
    console.error("Search endpoint failed:", error);
    return c.json({ error: error.message || "Unexpected error" }, 500);
  }
};

export default search;
