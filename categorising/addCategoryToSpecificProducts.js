
require("../config/config").config("bf")
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"id":4011},
{"id":4013},
{"id":4026},
{"id":4025},
{"id":4155},
{"id":3588},
{"id":4034},
{"id":4033},
{"id":4036},
{"id":4040},
{"id":4039},
{"id":3546},
{"id":4163},
{"id":4162},
{"id":4161},
{"id":4193}]
// alfaparf products with shampoo mentioned in cat field

let catId = 514; // no cat id yet
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
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
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

addCategoryToSpecificProducts(productIds, catId)
  .then((res) => console.log("addCategoryToSpecificProducts response", res))
  .catch(console.log);
