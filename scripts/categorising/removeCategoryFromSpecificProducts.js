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
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });


const productIds = [{"Product ID":3404},
{"Product ID":5332},
{"Product ID":5253},
{"Product ID":1772},
{"Product ID":3156},
{"Product ID":3455},
{"Product ID":3451},
{"Product ID":222},
{"Product ID":5920},
{"Product ID":6334},
{"Product ID":5795},
{"Product ID":4312}];


const catId = 640;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
