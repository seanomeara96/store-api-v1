const fs = require("fs");
const {
  getFirstProductImage,
} = require("../../functions/images/getFirstProductImage");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const download = require("image-downloader");

const path = require("path");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { getProductBySku } = require("../../functions/products/getProductBySKU");

require("../../config/config").config("ih");

// (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)

main();
async function main() {
  const products = [];

  for (const sku of ["8299", "7250", "5355"]) {
    const product = await getProductBySku(sku);
    
    
    products.push({
      id: product.id,
      folderName: product.name.toLowerCase().split(" ").join("-"),
    });
  }
  console.log(products)
  
  for (const product of products) {
    const dir = path.resolve(__dirname, "images/" + product.folderName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const { images } = await getAllProductImages(
      product.id || product["Product ID"]
    );

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
