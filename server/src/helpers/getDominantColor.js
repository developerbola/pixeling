/**
 * Gets the dominant color of an image from a URL or file path
 * @param {string} imageUrl - URL or path of the image to analyze
 * @returns {Promise<{r: number, g: number, b: number}>} - Dominant color as RGB object
 */
import { Jimp } from "jimp";

export async function getDominantColorOfImage(imageUrl) {
  try {
    // Load the image - works with both URLs and local file paths
    const image = await Jimp.read(imageUrl);

    // Resize image to reduce processing time (optional)
    image.resize(100, Jimp.AUTO);

    // Create object to count color occurrences
    const colorCounts = {};
    let maxCount = 0;
    let dominantColor = { r: 0, g: 0, b: 0 }; // Default white

    // Process each pixel
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      // Get RGBA values
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      const a = image.bitmap.data[idx + 3];

      // Skip fully transparent pixels
      if (a === 0) return;

      // Create a key for this color
      const colorKey = `${r},${g},${b}`;

      // Count occurrences
      if (colorCounts[colorKey]) {
        colorCounts[colorKey]++;
      } else {
        colorCounts[colorKey] = 1;
      }

      // Update dominant color if this one is more frequent
      if (colorCounts[colorKey] > maxCount) {
        maxCount = colorCounts[colorKey];
        dominantColor = { r, g, b };
      }
    });

    return dominantColor;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);
  }
}
