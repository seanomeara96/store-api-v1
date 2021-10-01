require("../config/config").config("bf");
const { removeCatFromProduct } = require("../products/removeCatFromProduct");
const { getAllProducts } = require("../products/getAllProducts");
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
    } catch (e) {
      reject(e);
    }
    const productIds = products.map(({ id }) => {return {id}});
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

const catId = 515;
removeCategoryFromAllProducts( catId)
  .then((res) =>
    console.log("removeCategoryFromAllProducts response", res)
  )
  .catch((err) => console.log(err));
