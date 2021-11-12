const { getProductsByCategory } = require("../products/getProductsByCategory");
const { addLine } = require("./addLine");
/**
 *
 * @param {string} brandName
 * @param {string} lineToAdd
 * @returns adds string to beginning of content
 *
 */
const addLineToCategoryProducts = (
  categoryId,
  lineToAdd,
  location = "before"
) =>
  new Promise((resolve, reject) => {
    getProductsByCategory(categoryId)
      .then((products) => {
        Promise.allSettled(
          products.map(({ id }) => {
            addLine(id, lineToAdd, location);
          })
        )
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });

exports.addLineToCategoryProducts = addLineToCategoryProducts;
