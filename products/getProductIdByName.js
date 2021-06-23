const { getAllProducts } = require("./getAllProducts");
/**
 *
 * @param {number} productName
 * @returns
 */
exports.getProductIdByName = (productName) =>
  new Promise((resolve, reject) => {
    getAllProducts({ name: productName })
      .then((products) => {
        if (products.length < 1) {
          reject("No Products");
        } else if (products.length > 1) {
          reject("There are multiple producs with that name");
        } else {
          resolve(products[0].id);
        }
      })
      .catch((err) => console.log("Error in getProductByName", err));
  });
