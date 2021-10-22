const { validateParams } = require("./utils/validateParams");
const { getProductDescription } = require("./getProductDescription");
const { updateProductDescription } = require("./updateProductDescription");
/**
 * removes gwp promotion from product
 * @param {number} productId
 * @returns
 */
const removePromotion = (productId) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, reject);
    try {
      const productDescription = await getProductDescription(productId);
      const updatedProductDescription = productDescription.replace(
        /<!-- start promotion -->(.|\n)*?<!-- end promotion -->/,
        ""
      );

      if (productDescription === updatedProductDescription)
        return reject(`Cant make change was made to product ${productId}`);

      await updateProductDescription(productId, updatedProductDescription);

      resolve(`Promotion was removed from product ${productId}`);
    } catch (err) {
      console.log(err)
      reject(`An error occured when trying to remove promotion from product ${productId}`);
    }
  });

exports.removePromotion = removePromotion;
