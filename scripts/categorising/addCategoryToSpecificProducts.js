require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":5394},
{"Product ID":5395},
{"Product ID":5396},
{"Product ID":5397},
{"Product ID":5398},
{"Product ID":5399},
{"Product ID":5400},
{"Product ID":5401},
{"Product ID":5402},
{"Product ID":5403},
{"Product ID":5404},
{"Product ID":5405},
{"Product ID":5406},
{"Product ID":5407},
{"Product ID":5408},
{"Product ID":5409},
{"Product ID":5410},
{"Product ID":5411},
{"Product ID":5412},
{"Product ID":5413},
{"Product ID":5414},
{"Product ID":5415},
{"Product ID":5416},
{"Product ID":5417},
{"Product ID":5418},
{"Product ID":5419},
{"Product ID":5420},
{"Product ID":5421},
{"Product ID":5422},
{"Product ID":5423},
{"Product ID":5424},
{"Product ID":5425},
{"Product ID":5426}]
// alfaparf products with shampoo mentioned in cat field

let catId = 517; // gift sets
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
