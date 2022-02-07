const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  addCategoryToSpecificProducts,
} = require("./addCategoryToSpecificProducts");
const {
  removeCategoryFromProductsInCategory,
} = require("./removeCategoryFromProductsInCategory");

require("../../config/config").config("bf");
const newAndTrending = 669;
const pairs = [
  // haircare
  { origin: 12, destination: 670 },
  // skincare
  { origin: 11, destination: 671 },
  // makeup
  { origin: 13, destination: 672 },
  // fragrance
  { origin: 598, destination: 674 },
  // body
  { origin: 16, destination: 673 },
];

const bfNewAndTrending = async () => {
  const products = await getAllProducts().catch(console.lo)
  await removeCategoryFromProductsInCategory(669).catch(console.log);
  
};
bfNewAndTrending();
