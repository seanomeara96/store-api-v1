require("../config/config").config("bf");
const { getProductById } = require("../products/getProductById");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [
  { "Product ID": 2603 },
  { "Product ID": 2737 },
  { "Product ID": 2873 },
  { "Product ID": 2950 },
  { "Product ID": 2954 },
  { "Product ID": 2959 },
  { "Product ID": 3023 },
  { "Product ID": 3084 },
  { "Product ID": 3085 },
  { "Product ID": 3086 },
  { "Product ID": 3112 },
  { "Product ID": 3113 },
  { "Product ID": 3114 },
  { "Product ID": 3118 },
  { "Product ID": 3122 },
  { "Product ID": 3414 },
  { "Product ID": 3415 },
  { "Product ID": 3416 },
  { "Product ID": 3419 },
  { "Product ID": 3659 },
  { "Product ID": 3704 },
  { "Product ID": 3706 },
  { "Product ID": 3708 },
  { "Product ID": 3923 },
  { "Product ID": 3940 },
  { "Product ID": 3941 },
  { "Product ID": 3956 },
  { "Product ID": 4194 },
  { "Product ID": 4195 },
  { "Product ID": 4196 },
  { "Product ID": 4233 },
  { "Product ID": 4328 },
  { "Product ID": 4699 },
  { "Product ID": 4709 },
  { "Product ID": 4710 },
  { "Product ID": 4712 },
  { "Product ID": 4781 },
  { "Product ID": 4787 },
  { "Product ID": 4788 },
  { "Product ID": 4815 },
  { "Product ID": 4816 },
  { "Product ID": 4817 },
  { "Product ID": 5255 },
  { "Product ID": 5256 },
  { "Product ID": 5257 },
  { "Product ID": 5258 },
  { "Product ID": 5259 },
  { "Product ID": 5261 },
];
// alfaparf products with shampoo mentioned in cat field

let catId; // no cat id yet
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) =>
  new Promise((resolve, reject) => {
    if(!Array.isArray(productIds) || typeof categoryId !== "number") return reject("please check paramters")
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
