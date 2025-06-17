import { supabase } from "../config/supabase.js";

const authController = async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: "Invalid token" }, 401);
  }

  return c.json({ message: `Hello ${user.user.email}` });
};

export default authController;
