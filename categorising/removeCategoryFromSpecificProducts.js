require("../config/config").config("bsk");
const { getProductById } = require("../products/getProductById");
const { removeCatFromProduct } = require("../products/removeCatFromProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [
  { "Product ID": 500 },
  { "Product ID": 501 },
  { "Product ID": 502 },
  { "Product ID": 503 },
  { "Product ID": 504 },
  { "Product ID": 505 },
  { "Product ID": 506 },
];
const catId = 98;
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") {
        reject("product id must be a number");
      }
      getProductById(id)
        .then((product) => {
          const { categories } = product;
          if (categories.includes(categoryId)) {
            promises.push(removeCatFromProduct(id, categoryId));
          } else {
            console.log(`product ${id} is already not in that category`);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

removeCategoryFromSpecificProducts(productIds, catId)
  .then((res) => console.log("removeCategoryFromSpecificProducts response",res))
  .catch((err) => console.log(err));
