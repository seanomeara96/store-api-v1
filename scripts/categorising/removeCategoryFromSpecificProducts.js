require("../../config/config").config("bf");
const {
  removeCatFromProduct,
} = require("../../functions/products/removeCatFromProduct");

/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
function removeCategoryFromSpecificProducts(productIds, categoryId) {
  return new Promise(function removalPromise(resolve, reject) {
    const promises = productIds.map(function removeCatFromProductById(
      productId
    ) {
      const id = Object.values(productId)[0];
      return removeCatFromProduct(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
}

const catId = 640;

const productIds = [
  { "Product ID": 721 },
  { "Product ID": 722 },
  { "Product ID": 723 },
  { "Product ID": 724 },
  { "Product ID": 725 },
  { "Product ID": 726 },
  { "Product ID": 1489 },
  { "Product ID": 1490 },
  { "Product ID": 1491 },
  { "Product ID": 1492 },
  { "Product ID": 1493 },
  { "Product ID": 1494 },
  { "Product ID": 1495 },
  { "Product ID": 1496 },
  { "Product ID": 1497 },
  { "Product ID": 1498 },
  { "Product ID": 3551 },
];

removeCategoryFromSpecificProducts(productIds, catId)
  .then(console.log)
  .catch(console.log);
