const allStores = require("./allStores");
require("../../config/config").config("bf");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  getAllProductImages,
} = require("../../functions/images/getAllProductImages");

async function main() {
  const products = await getAllProducts().catch(console.log);

  const productsWithContentNotLive = products.filter(
    (product) =>
      product.description.length &&
      !product.is_visible &&
      product.inventory_level
  );

  await Promise.allSettled(
    productsWithContentNotLive.map((product) =>
      getAllProductImages(product.id).then(
        (res) => (product.image_count = res.images.length)
      )
    )
  );

  const readyButNotLive = productsWithContentNotLive.filter(
    (product) => product.image_count
  );

  console.log(readyButNotLive);
}

main();
