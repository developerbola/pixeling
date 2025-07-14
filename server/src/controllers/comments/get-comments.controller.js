import { supabase } from "../../config/supabase.js";

const getComments = async (c) => {
  const { image_uuid } = await c.req.param();
  if (!image_uuid) {
    return c.json({ error: "There is no image uuid!" });
  }
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("image_uuid", image_uuid);

    if (error) {
      return c.json(
        { error: "An error occured during get comments from supabase:", error },
        400
      );
    }

    return c.json(data);
  } catch (error) {
    return c.json(
      { error: "An error occured during get comments:", error },
      500
    );
  }
};

export default getComments;
