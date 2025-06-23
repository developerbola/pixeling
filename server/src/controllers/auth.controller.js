import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const auth = async (c) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    console.log(`token - "${authHeader}" is not valid`);
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const { data: getUser, error } = await supabase.auth.getUser(token);

  if (error || !getUser.user) {
    console.log("Invalid token");
    return c.json({ error: "Invalid token" }, 401);
  }
  const user = getUser.user;

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.log(`Failed to check user existance: ${fetchError.message}`);
    return c.json({ error: "Failed to check user existance" }, 401);
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        name: user.user_metadata.full_name,
        username: user.user_metadata.name.toLowerCase(),
        avatar_url: user.user_metadata.avatar_url,
        bio: "An active Pixeling platform user.",
      },
    ]);

    if (insertError) {
      console.log(`Failed to insert user: ${insertError.message}`);
      return c.json({ error: "Failed to insert user" });
    }
  }

  return c.json({ message: `Hello ${user.email}` });
};

export default auth;
