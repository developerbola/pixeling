import { supabase } from "../../config/supabase.js";

const images = async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from("image-list")
      .select("*", { count: "exact" })
      .eq("isPublic", true)
      .range(start, end);

    if (error) {
      return c.json({ message: error.message }, 500);
    }

    return c.json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data,
    }, 200);

  } catch (err) {
    console.error("Unexpected error in images:", err);
    return c.json({ message: err.message || String(err) }, 500);
  }
};

export default images;