require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":4875},
{"Product ID":4874},
{"Product ID":4873},
{"Product ID":4594},
{"Product ID":4593},
{"Product ID":4592},
{"Product ID":4591},
{"Product ID":4590},
{"Product ID":4586},
{"Product ID":4585},
{"Product ID":4584},
{"Product ID":4583},
{"Product ID":4582},
{"Product ID":4581},
{"Product ID":4580},
{"Product ID":4579},
{"Product ID":4555},
{"Product ID":4527},
{"Product ID":4526},
{"Product ID":4525},
{"Product ID":4524},
{"Product ID":4523},
{"Product ID":4522},
{"Product ID":4521},
{"Product ID":4520},
{"Product ID":4519},
{"Product ID":4499},
{"Product ID":4498},
{"Product ID":4488},
{"Product ID":4487},
{"Product ID":4486},
{"Product ID":4485},
{"Product ID":4484},
{"Product ID":4483},
{"Product ID":4482}]
// alfaparf products with shampoo mentioned in cat field

let catId = 625; // mens gifts
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
