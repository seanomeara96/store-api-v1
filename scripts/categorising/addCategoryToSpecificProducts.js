require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":2541},
{"Product ID":4422},
{"Product ID":2945},
{"Product ID":247},
{"Product ID":5418},
{"Product ID":5427},
{"Product ID":5516},
{"Product ID":4403},
{"Product ID":5417},
{"Product ID":4172},
{"Product ID":4174},
{"Product ID":3746},
{"Product ID":5121},
{"Product ID":3580},
{"Product ID":4401},
{"Product ID":4195},
{"Product ID":5126},
{"Product ID":5395},
{"Product ID":3625},
{"Product ID":5248},
{"Product ID":4402},
{"Product ID":5397},
{"Product ID":5400},
{"Product ID":4334},
{"Product ID":5525},
{"Product ID":5526},
{"Product ID":5518},
{"Product ID":5519},
{"Product ID":3099},
{"Product ID":5523},
{"Product ID":5524},
{"Product ID":5396},
{"Product ID":5520},
{"Product ID":5398},
{"Product ID":3328},
{"Product ID":4196},
{"Product ID":3582},
{"Product ID":5399}]


let catId = 647; // 
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
  .then((res) => console.log(`${res.filter(({status}) => status === "fulfilled").length} added to cat ${catId}`))
  .catch(console.log);
