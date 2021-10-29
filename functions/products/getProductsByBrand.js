const { getBrandIdByName } = require("../brands/getBrandIdByName");
const { getAllProducts } = require("./getAllProducts");
/**
 * Fetches all products by brand name, resolves with an array of objects
 * @param {string} name name of brand
 * @returns
 */
const getProductsByBrand = (name) =>
  new Promise((resolve, reject) =>
    getBrandIdByName(name).then((brand_id) =>
      getAllProducts({ brand_id })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    )
  ).catch((err) => reject(err));
exports.getProductsByBrand = getProductsByBrand;
