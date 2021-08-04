/**
 * matches and removes a string from brand product descriptions
 * @param {string} brandName
 * @param {string} lineToRemove
 * @returns
 */
const removeLineFromBrandProducts = (brandName, lineToRemove) =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(removeLine(id, lineToRemove));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

exports.removeLineFromBrandProducts = removeLineFromBrandProducts;
