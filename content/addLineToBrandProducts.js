const { getProductsByBrand } = require("../products/getProductsByBrand");
const { addLine } = require("./addLine");
/**
 *
 * @param {string} brandName
 * @param {string} lineToAdd
 * @returns adds string to beginning of content
 *
 */
const addLineToBrandProducts = (brandName, lineToAdd) =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(addLine(id, lineToAdd));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

exports.addLineToBrandProducts = addLineToBrandProducts;
