const { getAllBrands } = require("./getAllBrands");
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
exports.getBrandByName = (name) =>
  new Promise((resolve, reject) => {
    getAllBrands({ name })
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
