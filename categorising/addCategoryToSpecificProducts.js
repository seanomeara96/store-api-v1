const store = require("../config/axios-config");
const { getProductById } = require("../products/getProductById");
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryName) =>
  new Promise((resolve, reject) => {
    if (typeof categoryName !== "string")
      return reject("category name must be a string");
    getCategoryIdByName(categoryName)
      .then((categoryId) => {
        let promises = [];
        productIds.forEach((productId) => {
          let idKey = productId[Object.keys(productId)[0]];
          if (typeof idKey !== "number")
            return reject("product id must be a number");
          getProductById(idkey)
            .then((product) => {
              const { categories } = product;
              const updatedCategories = [...categories, categoryId];
              promises.push(
                updateProductCategories(productId[idKey], updatedCategories)
              );
            })
            .catch((err) => reject(err));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

function updateProductCategories(productId, updatedProductCategories) {
  return new Promise((resolve, reject) => {
    store
      .put(`/catalog/products/${productId}`, {
        categories: updatedProductCategories,
      })
      .then((res = resolve(res)))
      .catch((err) => reject(err));
  });
}
