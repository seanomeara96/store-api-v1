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
  await removeCategoryFromProductsInCategory(newAndTrending).catch(console.log);
  pairs.forEach(async ({ origin, destination }) => {
    const productsInCategory = products
      .filter(({ categories }) => categories.includes(origin)) // in cat
      .sort((a, b) => b.id - a.id) // descending id
      .slice(0, 101);
    //console.log(productsInCategory.length);
    await removeCategoryFromProductsInCategory(destination).catch(console.log);
    const productIds = productsInCategory.map(({ id }) => ({ id }));
    // console.log(productIds);
    await addCategoryToSpecificProducts(productIds, destination).catch(
      console.log
    );
    await addCategoryToSpecificProducts(productIds, newAndTrending).catch(
      console.log
    );
    // console.log(res);
  });
};
bfNewAndTrending();
