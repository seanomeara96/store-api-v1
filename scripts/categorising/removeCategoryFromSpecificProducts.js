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
  return new Promise(function removalPromise (resolve, reject) {
    const promises = productIds.map(function removeCatFromProductById (productId) {
      const id = Object.values(productId)[0];
      return removeCatFromProduct(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
}

const catId = 640;

const productIds = [{"Product ID":3441},
{"Product ID":3444},
{"Product ID":3457},
{"Product ID":3474}];

removeCategoryFromSpecificProducts(productIds, catId)
  .then(console.log)
  .catch(console.log);
