import { supabase } from "../config/supabase.js";

const editUser = async (c) => {
  try {
    const { user_uuid } = c.req.param();
    const { name, username, avatar_url, bio } = await c.req.json();
    console.log({ name, username, avatar_url, bio });

    const { data, error } = await supabase
      .from("users")
      .update({ name, username, avatar_url, bio })
      .eq("id", user_uuid);

    if (error) {
      return c.json({ error: error.message });
    }
    return c.json(data);
  } catch (error) {
    return c.json({
      error: error.message || "An error occured during edit user info.",
    });
  }
};

export default editUser;
