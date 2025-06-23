import { supabaseServer } from "../supabaseServer";

const supabase = supabaseServer();

export const useSaveSessionId = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session.user.id;
  }
};
