import { formatImage } from "../../functions/images/formatProductImage";
import sharp from "sharp";
import path from "path";
require("../../config/config");

async function imageFmt() {
  try {
    const buffer = await formatImage(
      "https://millies.ie/cdn/shop/files/L_OrealProfessionnelSerieExpertMetalDetoxTrioGiftSet.jpg?v=1727784650&width=900"
    );
    const image = sharp(buffer);
    await image.toFile(path.resolve(__dirname, "img.jpg"));
  } catch (err) {
    console.log(err);
  }
}

imageFmt();
