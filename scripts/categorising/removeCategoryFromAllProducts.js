require("../../config/config").config("bf");
const {
  removeCatFromProduct,
} = require("../../functions/products/removeCatFromProduct");
const { getAllProducts } = require("../../functions/products/getAllProducts");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */

/**
 * This needs to be tested before using
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromAllProducts = (categoryId) =>
  new Promise(async (resolve, reject) => {
    let products;
    try {
      products = await getAllProducts();
      products = products.filter(({ categories }) =>
        categories.includes(categoryId)
      );
    } catch (e) {
      reject(e);
    }
    const productIds = products.map(({ id }) => ({ id }));
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

const catId = 658;
removeCategoryFromAllProducts(catId)
  .then((res) => console.log("removeCategoryFromAllProducts response", res))
  .catch((err) => console.log(err));
