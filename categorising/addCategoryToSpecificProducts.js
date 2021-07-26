require("../config/config").config("ah");
const { getProductById } = require("../products/getProductById");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [
  { 1660: 1661 },
  { 1660: 1662 },
  { 1660: 1663 },
  { 1660: 1664 },
];
const catId = 209;
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) =>
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
          if (!categories.includes(categoryId)) {
            promises.push(addCatToProduct(id, categoryId));
          } else {
            console.log(`product ${id} is already in that category`);
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

addCategoryToSpecificProducts(productIds, catId)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
