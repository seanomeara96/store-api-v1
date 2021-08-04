/**
 * resolves with the description of the product
 * @param {number} id productId
 * @returns string
 */
const getProductDescription = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const product = await require("../../config/config").store.get(
        `/catalog/products/${id}`
      );
      const productDescription = product.data.data.description;
      resolve(productDescription);
    } catch (err) {
      reject(err);
    }
  });

exports.getProductDescription = getProductDescription;
