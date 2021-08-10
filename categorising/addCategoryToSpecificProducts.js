require("../config/config").config("huk");
const { getProductById } = require("../products/getProductById");
const { addCatToProduct } = require("../products/addCatToProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
const productIds = [{"Product ID":385},
{"Product ID":386},
{"Product ID":387},
{"Product ID":388},
{"Product ID":389},
{"Product ID":390},
{"Product ID":391},
{"Product ID":392},
{"Product ID":393},
{"Product ID":394},
{"Product ID":396},
{"Product ID":398},
{"Product ID":399},
{"Product ID":400},
{"Product ID":401},
{"Product ID":402},
{"Product ID":403},
{"Product ID":404},
{"Product ID":405},
{"Product ID":406},
{"Product ID":407},
{"Product ID":408},
{"Product ID":409},
{"Product ID":410},
{"Product ID":411},
{"Product ID":412},
{"Product ID":413}]
const catId = 68;
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
  .then((res) => console.log("addCategoryToSpecificProducts response", res))
  .catch((err) => console.log(err));
