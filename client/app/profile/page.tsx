import ProfileClient from "./ProfileClient";
import { toast } from "sonner";
import { supabaseServer } from "@/lib/supabaseServer";

const supabase = supabaseServer();

const Profile = async () => {
  const { data: user } = await supabase.auth.getUser();

  const session_id = user.user?.id;

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session_id}`
  );
  if (!userRes.ok) toast.error("Failed to fetch user data");

  const userData = await userRes.json();

  return <ProfileClient userr={userData} session_id={session_id} />;
};

export default Profile;
