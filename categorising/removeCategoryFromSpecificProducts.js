require("../config/config").config("bf");
const { getProductById } = require("../products/getProductById");
const { removeCatFromProduct } = require("../products/removeCatFromProduct");
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
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
  const productIds = [{"Product ID":3085},
  {"Product ID":3086},
  {"Product ID":5316},
  {"Product ID":5317},
  {"Product ID":5318},
  {"Product ID":5319},
  {"Product ID":5320},
  {"Product ID":5322}]
  const catId = 620;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
