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


const productIds = [
  { "Product ID": 6285 },
  { "Product ID": 6286 },
  { "Product ID": 6287 },
  { "Product ID": 6288 },
  { "Product ID": 6289 },
  { "Product ID": 6290 },
  { "Product ID": 6291 },
  { "Product ID": 6292 },
  { "Product ID": 6293 },
];


const catId = 548;
removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) =>
    console.log("removeCategoryFromSpecificProducts response", res)
  )
  .catch((err) => console.log(err));
