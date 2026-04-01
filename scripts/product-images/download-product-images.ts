import fs from "fs";

import download from "image-downloader";

import path from "path";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { getAllProducts } from "../../functions/products/getAllProducts";

require("../../config/config").config("bf");

// (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)

async function main() {
  const THUMBNAIL_ONLY = true;
  const FLAT_DIRECTORY = true;

  const products = await getAllProducts({
    //"sku:in": ["8299", "7250", "5355"].join(","),
    brand_id: 154,
  });

  for (let i = 0; i < products.length; i++) {
    console.log(i, products.length);
    const product = products[i];

    const dir = path.resolve(
      __dirname,
      FLAT_DIRECTORY
        ? "images"
        : "images/" + product.name.toLowerCase().split(" ").join("-"),
    );
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const images = await getAllProductImages(product.id);
    const imageUrls = [];
    for (const img of images) {
      if (THUMBNAIL_ONLY && !img.is_thumbnail) continue;
      imageUrls.push(img.url_zoom);
    }
    for (const image of imageUrls) {
      const options = {
        url: image,
        dest: dir,
        extractFilename: true,
      };

      try {
        await download.image(options);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
main();
