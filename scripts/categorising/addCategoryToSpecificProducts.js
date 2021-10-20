require("../../config/config").config("ah");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":866},
{"Product ID":792},
{"Product ID":794},
{"Product ID":795},
{"Product ID":796},
{"Product ID":880},
{"Product ID":877},
{"Product ID":815},
{"Product ID":814},
{"Product ID":812},
{"Product ID":804},
{"Product ID":802},
{"Product ID":799},
{"Product ID":793},
{"Product ID":791},
{"Product ID":790},
{"Product ID":935},
{"Product ID":936},
{"Product ID":937},
{"Product ID":938},
{"Product ID":939},
{"Product ID":940},
{"Product ID":941},
{"Product ID":942},
{"Product ID":1266}]
// alfaparf products with shampoo mentioned in cat field

let catId = 163; 
/**
 * This needs to be tested before using
 * @param {object[]} productIds
 * @param {number} categoryId
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(productIds) || typeof categoryId !== "number")
      return reject("please check paramters");
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") return reject("product id must be a number");
      promises.push(addCatToProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

addCategoryToSpecificProducts(productIds, catId)
  .then((res) => console.log("addCategoryToSpecificProducts response", res))
  .catch(console.log);
