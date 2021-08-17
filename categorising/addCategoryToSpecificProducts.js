require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":2603},
{"Product ID":2737},
{"Product ID":2873},
{"Product ID":2950},
{"Product ID":2954},
{"Product ID":2959},
{"Product ID":3023},
{"Product ID":3414},
{"Product ID":3415},
{"Product ID":3416},
{"Product ID":3419},
{"Product ID":3659},
{"Product ID":3923},
{"Product ID":4699},
{"Product ID":4781}]
// alfaparf products with shampoo mentioned in cat field

let catId = 619; // no cat id yet
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    if(!Array.isArray(productIds) || typeof categoryId !== "number") return reject("please check paramters")
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") return reject("product id must be a number");
      promises.push(addCatToProduct(id, categoryId));
    });
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

addCategoryToSpecificProducts(productIds, catId)
  .then((res) => console.log("addCategoryToSpecificProducts response", res))
  .catch((err) => console.log(err));
