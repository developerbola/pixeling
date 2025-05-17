import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalLetters(name: string): string {
  if (name.split(" ")[1] === undefined) {
    return (name.split(" ")[0][0] + name.split(" ")[0][1]).toUpperCase();
  }
  return (name.split(" ")[0][0] + name.split(" ")[1][0]).toUpperCase();
}
