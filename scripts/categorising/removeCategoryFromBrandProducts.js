require("../../config/config").config("ah");
const {
  removeCatFromProduct,
} = require("../../functions/products/removeCatFromProduct");
const {
  getProductsByBrand,
} = require("../../functions/products/getProductsByBrand");

/**
 * removes category from products by brand
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromBrandProducts = (brand, categoryId) =>
  new Promise(async (resolve, reject) => {
    let products;
    try {
      products = await getProductsByBrand(brand);
    } catch (e) {
      reject(e);
    }
    let promises = [];
    products.forEach(({ id }) => {
      promises.push(removeCatFromProduct(id, categoryId));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
const brand = "Moroccanoil";
const catId = null;
removeCategoryFromBrandProducts(brand, catId)
  .then((res) => console.log(`${res.filter(({status}) => status === "fulfilled").length} removed from cat ${catId}`))
  .catch((err) => console.log(err));
