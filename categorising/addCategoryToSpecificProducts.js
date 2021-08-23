require("../config/config").config("ah");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [
  { "Product ID": 624 },
  { "Product ID": 662 },
  { "Product ID": 674 },
  { "Product ID": 682 },
  { "Product ID": 698 },
  { "Product ID": 703 },
  { "Product ID": 892 },
  { "Product ID": 934 },
  { "Product ID": 1068 },
  { "Product ID": 1302 },
  { "Product ID": 1304 },
  { "Product ID": 1496 },
  { "Product ID": 1497 },
  { "Product ID": 1499 },
  { "Product ID": 1500 },
  { "Product ID": 1501 },
  { "Product ID": 1655 },
  { "Product ID": 1656 },
  { "Product ID": 1658 },
  { "Product ID": 1659 },
  { "Product ID": 1661 },
  { "Product ID": 1662 },
  { "Product ID": 1663 },
  { "Product ID": 1664 },
];
// alfaparf products with shampoo mentioned in cat field

let catId = 210; // no cat id yet
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
  .catch((err) => console.log(err));
