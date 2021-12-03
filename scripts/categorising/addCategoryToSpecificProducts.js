require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":4515},
{"Product ID":5048},
{"Product ID":5049},
{"Product ID":5050},
{"Product ID":5051},
{"Product ID":5052},
{"Product ID":5053},
{"Product ID":5054},
{"Product ID":5055},
{"Product ID":5057},
{"Product ID":5058},
{"Product ID":5379},
{"Product ID":5380},
{"Product ID":5381},
{"Product ID":5382},
{"Product ID":5446},
{"Product ID":5450},
{"Product ID":5454}]


let catId = 643; // 
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
