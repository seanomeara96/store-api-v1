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

const catId = 445;

const productIds = [{"Product ID":721},
{"Product ID":722},
{"Product ID":723},
{"Product ID":724},
{"Product ID":725},
{"Product ID":726},
{"Product ID":2984},
{"Product ID":2985},
{"Product ID":3084},
{"Product ID":3085},
{"Product ID":3354},
{"Product ID":3546},
{"Product ID":3547},
{"Product ID":3558},
{"Product ID":3564},
{"Product ID":3602}];

removeCategoryFromSpecificProducts(productIds, catId)
  .then(console.log)
  .catch(console.log);
