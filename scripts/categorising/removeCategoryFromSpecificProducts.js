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

const catId = 27;

const productIds = [{"Product ID":4471},
{"Product ID":6061},
{"Product ID":6071},
{"Product ID":6231},
{"Product ID":7008},
{"Product ID":7012},
{"Product ID":7037},
{"Product ID":7038},
{"Product ID":7074},
{"Product ID":7075},
{"Product ID":7076},
{"Product ID":7077},
{"Product ID":7078},
{"Product ID":7079}];

removeCategoryFromSpecificProducts(productIds, catId)
  .then(console.log)
  .catch(console.log);
