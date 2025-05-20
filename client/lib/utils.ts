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

export const getDominantColor = (imageURL: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageURL;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas context error");
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0;
      const total = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      // Average values
      r = Math.floor(r / total);
      g = Math.floor(g / total);
      b = Math.floor(b / total);

      const color = `rgb(${r},${g},${b})`;
      resolve(color);
    };

    img.onerror = () => reject("Image load error");
  });
};
