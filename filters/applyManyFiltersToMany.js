const { applyManyFilters } = require("./applyManyFilters");

/**
 * for each product this function applies many filters
 * @param {object[]} productIds
 * @param {object[]} filters
 * @returns
 */
const applyManyFiltersToMany = (productIds, filters) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product);
      promises.push(applyManyFilters(product[idKey], filters));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
// export module
exports.applyManyFiltersToMany = applyManyFiltersToMany;

const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

const filters = [
  {
    name: "Proceive",
    value: "Men",
  },
  {
    name: "Proceive",
    value: "Women",
  },
  {
    name: "Proceive",
    value: "Men & Women",
  },
];