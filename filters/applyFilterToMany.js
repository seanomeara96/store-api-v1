const { applyFilter } = require("./applyFilter");
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
const applyFilterToMany = (productIds, name, value) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product)[0];
      promises.push(applyFilter(product[idKey], name, value));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
// export module
exports.applyFilterToMany = applyFilterToMany;