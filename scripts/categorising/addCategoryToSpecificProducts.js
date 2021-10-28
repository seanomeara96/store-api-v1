require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"ID":2346},
{"ID":2401},
{"ID":3972},
{"ID":3973},
{"ID":3996},
{"ID":4472},
{"ID":4622},
{"ID":5040},
{"ID":5133},
{"ID":5332},
{"ID":5380},
{"ID":5382},
{"ID":5411},
{"ID":5422},
{"ID":5451},
{"ID":5456},
{"ID":5457},
{"ID":5471},
{"ID":5478},
{"ID":222},
{"ID":1534}]
// alfaparf products with shampoo mentioned in cat field

let catId = 566; // black friday wow offers
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
