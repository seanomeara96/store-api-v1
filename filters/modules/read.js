const store = require("../../config/axios-config");

const getFilters = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await store.get(
        `/catalog/products/${productId}/custom-fields`
      );
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });

const getFiltersOfMany = (productIds) =>
  new Promise((resolve, reject) => {
    let response = {};
    Promise.allSettled(
      productIds.map((product) =>
        getFilters(product[Object.keys(product)[0]])
          .then((res) => (response[product[Object.keys(product)[0]]] = res))
          .catch((err) => reject("there was a problem getting filters", err))
      )
    )
      .then(() => resolve(response))
      .catch(reject);
  });

exports.getFilters = getFilters;
exports.getFiltersOfMany = getFiltersOfMany;
