require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":203},
{"Product ID":204},
{"Product ID":224},
{"Product ID":2160},
{"Product ID":2163},
{"Product ID":2719},
{"Product ID":3009},
{"Product ID":3010},
{"Product ID":3011},
{"Product ID":3012},
{"Product ID":3976},
{"Product ID":4128},
{"Product ID":4272},
{"Product ID":4273},
{"Product ID":4274},
{"Product ID":4610}]


let catId = 653; // 
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
