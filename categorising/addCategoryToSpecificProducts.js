require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"ID":5358},
{"ID":5370},
{"ID":3400},
{"ID":4033},
{"ID":4333},
{"ID":5368},
{"ID":5213},
{"ID":4293},
{"ID":4295},
{"ID":4296},
{"ID":4294},
{"ID":5373},
{"ID":2550},
{"ID":3947},
{"ID":5359},
{"ID":5360},
{"ID":5181},
{"ID":4193},
{"ID":5367},
{"ID":3946},
{"ID":3948},
{"ID":2645},
{"ID":3053},
{"ID":3056},
{"ID":4011},
{"ID":5363},
{"ID":5369},
{"ID":5371},
{"ID":5374},
{"ID":2619},
{"ID":3950},
{"ID":3951},
{"ID":3952},
{"ID":3953},
{"ID":3955},
{"ID":3490},
{"ID":5361},
{"ID":5362},
{"ID":5364},
{"ID":5365},
{"ID":5366},
{"ID":5372}]
// alfaparf products with shampoo mentioned in cat field

let catId = 515; // clearance
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
