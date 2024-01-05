import fs from "fs";
import { getFirstProductImage } from "../../functions/images/getFirstProductImage";
import { getAllProducts } from "../../functions/products/getAllProducts";
import download from "image-downloader";

import path from "path";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { getProductBySku } from "../../functions/products/getProductBySKU";

require("../../config/config").config("ih");

// (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)

async function main() {
  const products = [];

  for (const sku of ["8299", "7250", "5355"]) {
    const product = await getProductBySku(sku);

    products.push({
      id: product.id,
      folderName: product.name.toLowerCase().split(" ").join("-"),
    });
  }

  for (const product of products) {
    const dir = path.resolve(__dirname, "images/" + product.folderName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const images = await getAllProductImages(product.id);

    const imageUrls = images.map((img) => img.url_zoom);

    for (const image of imageUrls) {
      const options = {
        url: image,
        dest: path.resolve(__dirname, dir),
        extractFilename: true,
      };

      await download.image(options).catch(console.log);
    }
  }
}
main();
