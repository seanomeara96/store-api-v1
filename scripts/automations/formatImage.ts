import { formatImage } from "../../functions/images/formatProductImage";
import sharp from "sharp";
import path from "path";
require("../../config/config");

// 1 minute and 45 seconds to break
async function imageFmt() {
  try {
    for (let i = 0; i < 1; i++) {
      console.time(`Iteration ${i + 1}`); // Start the timer for each iteration

      const buffer = await formatImage(
        "https://millies.ie/cdn/shop/files/L_OrealProfessionnelSerieExpertMetalDetoxTrioGiftSet.jpg?v=1727784650&width=900"
      );
      const image = sharp(buffer);
      await image.toFile(path.resolve(__dirname, "img.jpg"));

      console.timeEnd(`Iteration ${i + 1}`); // End the timer and log the duration
    }
  } catch (err) {
    console.log(err);
  }
}


imageFmt();
