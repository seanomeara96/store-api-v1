const { getProductsByBrand } = require("../products/getProductsByBrand");
const { addLine } = require("./addLine");
/**
 *
 * @param {string} brandName
 * @param {string} lineToAdd
 * @param {string} location "before" for before content and "after" for after content
 * @returns adds string to beginning of content
 *
 */
const addLineToBrandProducts = (brandName, lineToAdd, location = "before") =>
  new Promise((resolve, reject) => {
    let promises = [];
    getProductsByBrand(brandName)
      .then((products) => {
        products.forEach(({ id }) => {
          promises.push(addLine(id, lineToAdd, location));
        });
        Promise.allSettled(promises)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

exports.addLineToBrandProducts = addLineToBrandProducts;
