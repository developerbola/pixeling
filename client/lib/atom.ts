import { Session, User } from "@supabase/supabase-js";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
