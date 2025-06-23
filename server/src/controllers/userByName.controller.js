import { supabase } from "../config/supabase.js";

const userByName = async (c) => {
  try {
    const { username } = c.req.param();

    const lowerCaseUsername = username.toLowerCase();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", lowerCaseUsername);

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

export default userByName;
