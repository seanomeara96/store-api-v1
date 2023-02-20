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

require("../../config/config").config("ih");

const products = [{ id: 3629, folderName: "Haakaa New Mum Starter Pack - 2021 Edition" }, {
  id: 3343,
  folderName: "Haakaa Oral Medicine Syringe",
}, {
  id: 3693,
  folderName: "Haakaa Silicone Breast Milk Collector 75ml (1 Pk)"
}, {
  id: 2663,
  folderName: "Haakaa Silicone Breast Pump with Suction Base 150ml"
}, {
  id: 2499,
  folderName: "Kegel8 Ultra 20 Electronic Pelvic Toner"
}, {
  id: 2993,
  folderName: "Sensatone Digital Pelvic Floor Stimulator"
}, {
  id: 2392,
  folderName: "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver"
}, {
  id: 2392,
  folderName: "Silverette Nursing Cups - The Orginal Cup, Pure 925 Silver - XL"
}, {
  id: 4068,
  folderName: "Sleepytot Baby Comforter Bunny (Cream)"
}, {
  id: 4068,
  folderName: "Sleepytot Baby Comforter Bunny (Grey)"
}];

// (await getAllProducts({brand_id: 21}).catch(console.log)).filter(product => product.inventory_level)

main();
async function main() {
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
