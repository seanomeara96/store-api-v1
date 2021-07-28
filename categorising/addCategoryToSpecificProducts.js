require("../config/config").config("hie");
const { getProductById } = require("../products/getProductById");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":216},
{"Product ID":192},
{"Product ID":193},
{"Product ID":217},
{"Product ID":218},
{"Product ID":219},
{"Product ID":220},
{"Product ID":221},
{"Product ID":194},
{"Product ID":195},
{"Product ID":196},
{"Product ID":197},
{"Product ID":214},
{"Product ID":215},
{"Product ID":216},
{"Product ID":217},
{"Product ID":222},
{"Product ID":198},
{"Product ID":199},
{"Product ID":200},
{"Product ID":223},
{"Product ID":201},
{"Product ID":202},
{"Product ID":203},
{"Product ID":204},
{"Product ID":218},
{"Product ID":219},
{"Product ID":220},
{"Product ID":221},
{"Product ID":224},
{"Product ID":225}];
const catId = 98;
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
  .then((res) => console.log("addCategoryToSpecificProducts response",res))
  .catch((err) => console.log(err));
