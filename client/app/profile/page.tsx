import { useSaveSessionId } from "@/lib/hooks/useSessionId";
import ProfileClient from "./ProfileClient";
import { toast } from "sonner";

const Profile = async () => {
  const session_id = await useSaveSessionId();

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session_id}`
  );
  if (!userRes.ok) toast.error("Failed to fetch user data");

  const userData = await userRes.json();

  return <ProfileClient userr={userData} session_id={session_id} />;
};

export default Profile;
