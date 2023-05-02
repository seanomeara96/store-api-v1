//const allStores = require("./allStores");
require("../../config/config").config("bf");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");
const { writeFile } = require("fs");

async function main() {
  try {
    const products = await getAllProducts();
    const readyButNotLive = [];


    for (let x = 0; x < products.length; x++) {
      // progress report
      console.log(`${x + 1}/${products.length}`);

      const product = products[x];
      const hasDescription = !!product.description.length;
      const isVisible = !product.is_visible;
      const inStock = !!product.inventory_level;

      if (hasDescription && isVisible && inStock) {
        console.log(`meets criteria, fetching images...`);
        const res = await getAllProductImages(product.id);
        product.image_count = res.images.length;
        readyButNotLive.push(product);
      }
    }


    console.log(readyButNotLive);
    writeFile("readForLiveResult.json", JSON.stringify(readyButNotLive), {
      encoding: "utf8",
    }, function(err){
      if (err) return console.log(err)
      console.log("done")
    });
  } catch (err) {
    console.log(err);
  }
}

main();
