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
  return new Promise(async function removalPromise(resolve, reject) {
    try {
      function removeCatFromProductById(productId) {
        const id = Object.values(productId)[0];
        return removeCatFromProduct(id, categoryId);
      }
      const promises = productIds.map(removeCatFromProductById);
      const res = await Promise.allSettled(promises)
      resolve(res)
    } catch (err) {
      reject(err);
    }
  });
}

const catId = 640;

const productIds = [
  { "Product ID": 3441 },
  { "Product ID": 3444 },
  { "Product ID": 3457 },
  { "Product ID": 3474 },
];

removeCategoryFromSpecificProducts(productIds, catId)
  .then(console.log)
  .catch(console.log);
