require("../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":1534},
{"Product ID":1772},
{"Product ID":2058},
{"Product ID":2674},
{"Product ID":4407},
{"Product ID":4408},
{"Product ID":4409},
{"Product ID":4410},
{"Product ID":4411},
{"Product ID":4412}]
// alfaparf products with shampoo mentioned in cat field

let catId = 621; // no cat id yet
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
  .catch(console.log);
