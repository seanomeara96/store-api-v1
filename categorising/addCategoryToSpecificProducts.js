require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":2803},
{"Product ID":2804},
{"Product ID":2805},
{"Product ID":2806},
{"Product ID":2807},
{"Product ID":2808},
{"Product ID":2809},
{"Product ID":2827},
{"Product ID":2859},
{"Product ID":2860},
{"Product ID":2861},
{"Product ID":3078},
{"Product ID":3082},
{"Product ID":3553},
{"Product ID":3554},
{"Product ID":3555},
{"Product ID":3556},
{"Product ID":3904},
{"Product ID":3905},
{"Product ID":3939},
{"Product ID":4024},
{"Product ID":4027},
{"Product ID":4037},
{"Product ID":4038},
{"Product ID":4040},
{"Product ID":4186}]
// alfaparf products with shampoo mentioned in cat field

let catId = 581; // no cat id yet
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
  .catch((err) => console.log(err));
