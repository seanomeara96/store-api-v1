require("../../config/config").config("bf");
const {
  removeCatFromProduct,
} = require("../../functions/products/removeCatFromProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */

/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    const promises = productIds.map((productId) => {
      const id = Object.values(productId)[0];
      return removeCatFromProduct(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

const catId = 514;

const productIds = [
  { id: 3506 },
  { id: 3509 },
  { id: 3511 },
  { id: 3580 },
  { id: 3577 },
  { id: 3582 },
];

removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
