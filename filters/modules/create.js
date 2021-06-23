const { getProductIdByName } = require("../../products/getProductIdByName");

const applyFilter = (productId, name, value) =>
  new Promise(async (resolve, reject) => {
    const data = {
      name,
      value,
    };
    try {
      const { status } = await require("../../config/config").store.post(
        `/catalog/products/${productId}/custom-fields`,
        data
      );
      resolve(status);
    } catch (err) {
      reject(err);
    }
  });

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
/**
 * applies specific filters by name marked x e.g. key = "field" value = "filter" name1 ="x" name2 = ""
 * @param {array} data
 * @returns promise
 */
const applySpecificFilters = (data) =>
  new Promise((resolve, reject) => {
    let promises = [];
    data.forEach((item) => {
      if (!item["Key"]) return reject("No Key Heading");
      if (!item["Value"]) return reject("No Value heading");
      const key = item["Key"];
      const value = item["Value"];
      // generate array of product names by removing fields key and value
      let productNames = Object.keys(item).filter(
        (key) => key !== "Key" && key !== "Value"
      );
      for (var name in productNames) {
        if (item[productNames[name]].toUpperCase() === "X") {
          getProductIdByName(productNames[name])
            .then((id) => {
              promises.push(applyFilter(id, key, value).catch(err => console.log(err)));
            })
            .catch((err) => console.log(err));
        }
      }
      Promise.allSettled(promises)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });

exports.applyFilter = applyFilter;
exports.applyFilterToMany = applyFilterToMany;
exports.applyManyFilters = applyManyFilters;
exports.applyManyFiltersToMany = applyManyFiltersToMany;
exports.applySpecificFilters = applySpecificFilters;
