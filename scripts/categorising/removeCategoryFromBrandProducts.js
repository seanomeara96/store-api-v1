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
const brand = "Alfaparf";
const catIds = [
  160, // Shampoo & Conditioner
  211, // gift sets
  163, // Treatments & Masks
  162, // Hair Oils
  161, // Styling
  206, // Mens Range
];
removeCategoryFromBrandProducts(brand, catIds[2])
  .then((res) => console.log("removeCategoryFromBrandProducts response", res))
  .catch((err) => console.log(err));
