import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalLetters(name: string): string {
  if (!name) return "";
  if (name.split(" ")[1] === undefined) {
    if (name.split(" ")[0][1]) {
      return (name.split(" ")[0][0] + name.split(" ")[0][1]).toUpperCase();
    }
    return name.split(" ")[0][0].toUpperCase();
  }
  return (name.split(" ")[0][0] + name.split(" ")[1][0]).toUpperCase();
}

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getDominantColorOfImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        canvas.width = 1000;
        canvas.height = 1000;
        context.drawImage(img, 0, 0, 1000, 1000);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const pixels = imageData.data;

        let rTotal = 0,
          gTotal = 0,
          bTotal = 0,
          count = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          rTotal += pixels[i];
          gTotal += pixels[i + 1];
          bTotal += pixels[i + 2];
          count++;
        }

        const avgR = Math.round(rTotal / count);
        const avgG = Math.round(gTotal / count);
        const avgB = Math.round(bTotal / count);

        const averageColor = rgbToHex(avgR, avgG, avgB);

        resolve(averageColor);
      };

      img.onerror = (err) => {
        reject(err);
      };
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};

export const toCapitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
