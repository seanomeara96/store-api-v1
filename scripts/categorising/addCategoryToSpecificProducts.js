require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":222},
{"Product ID":1534},
{"Product ID":2346},
{"Product ID":2401},
{"Product ID":3972},
{"Product ID":3973},
{"Product ID":3996},
{"Product ID":4472},
{"Product ID":4622},
{"Product ID":5040},
{"Product ID":5133},
{"Product ID":5332},
{"Product ID":5380},
{"Product ID":5382},
{"Product ID":5411},
{"Product ID":5422},
{"Product ID":5451},
{"Product ID":5456},
{"Product ID":5457},
{"Product ID":5471},
{"Product ID":5478}]


let catId = 640; // 
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
