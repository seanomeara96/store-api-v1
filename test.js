const { getAllProducts } = require("./functions/products/getAllProducts");
require("./config/config").config("bf");
async function main() {
  const categoriesToFilterFor = [
    12, 35, 36, 427, 445, 37, 435, 726, 39, 446, 438, 442, 38, 11, 22, 23, 21,
    24, 232, 231, 25, 28, 641, 30, 508, 26, 27, 527, 613, 20, 553, 550, 551,
    556, 554, 552, 555, 559, 557, 558,
  ];
  const products = await getAllProducts();
  const productIds = [];
  for (let i = 0; i < products.length; i++) {
    console.log(`${i + 1}/${products.length}`);
    const product = products[i];
    const { categories } = product;
    for (let ii = 0; ii < categoriesToFilterFor.length; ii++) {
      const categoryToFilterFor = categoriesToFilterFor[ii];
      if (categories.includes(categoryToFilterFor)) {
        if(!productIds.includes(product.id)){
          productIds.push(product.id);
        }
      }
    }
  }
  const { simplePrint } = require("./scripts/utils/simplePrint");
  simplePrint(productIds.join("\n"), "productsToKeep");
}
main();
