import { supabase } from "../../config/supabase.js";

const user = async (c) => {
  try {
    const { user_uuid } = c.req.param();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_uuid)
      .single();

    if (error) {
      return c.json(
        {
          error: error.message || "An error occured while fetching user info.",
        },
        500
      );
    }

    return c.json(data);
  } catch (error) {
    return c.json(
      {
        error:
          error.message ||
          "An unexpected error occurred while fetching user info.",
      },
      500
    );
  }
};

export default user;
