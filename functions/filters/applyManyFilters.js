const { applyFilter } = require("./applyFilter");
/**
 * Loops through an array of many filters and applys them to a single product
 * @param {object[]} productId 
 * @param {object[]} filters 
 * @returns 
 */
const applyManyFilters = (productId, filters) =>
  new Promise((resolve, reject) => {
    let promises = [];
    filters.forEach(({ name, value }) => {
      promises.push(applyFilter(productId, name, value));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
// export module
exports.applyManyFilters = applyManyFilters;
