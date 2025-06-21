import { ImagesListType } from "@/app/page";
import { User } from "@supabase/supabase-js";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
export const imagesAtom = atom<ImagesListType | null>(null);
