require("../config/config").config("bf");
const { getFilters } = require("./getFilters");
const productIds = [{ "Product ID": 2541 }, { "Product ID": 2542 }];

/**
 * Supply product Ids and receive associated filters in a
 * Not quite sure how I got this to work so dont touch it
 * @param {object[]} productIds
 * @returns
 */
const getFiltersOfMany = (productIds) =>
  new Promise((resolve, reject) => {
    let response = {};
    let promises = [];
    productIds.forEach((product) =>
    promises.push(getFilters(product[Object.keys(product)[0]]))
  )
    Promise.allSettled(promises)
      .then((res) => {
        const fulfilled = res.filter(({status}) => status === "fulfilled")
        const filters = fulfilled.map(({value})=>value)
        resolve(filters)
      })
      .catch(reject);
  });

exports.getFiltersOfMany = getFiltersOfMany;
