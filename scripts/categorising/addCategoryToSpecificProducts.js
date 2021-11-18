require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":1309},
{"Product ID":1314},
{"Product ID":1548},
{"Product ID":2466},
{"Product ID":2539},
{"Product ID":2598},
{"Product ID":2764},
{"Product ID":3073},
{"Product ID":3145},
{"Product ID":3359},
{"Product ID":3643},
{"Product ID":3844},
{"Product ID":3870},
{"Product ID":3877},
{"Product ID":3989},
{"Product ID":4004},
{"Product ID":4009},
{"Product ID":4321},
{"Product ID":4428},
{"Product ID":4439},
{"Product ID":4492},
{"Product ID":4539},
{"Product ID":4544},
{"Product ID":4554},
{"Product ID":4569},
{"Product ID":4572},
{"Product ID":4680},
{"Product ID":4724},
{"Product ID":4738},
{"Product ID":4818},
{"Product ID":4869},
{"Product ID":5170},
{"Product ID":5176},
{"Product ID":5181},
{"Product ID":5340},
{"Product ID":5425}]


let catId = 641; // 
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
