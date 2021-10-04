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
      await updateProductDescription(productId, updatedProductDescription);
      if (productDescription == updatedProductDescription)
        return reject("no change was made");
      resolve("Promotion removed.");
    } catch (err) {
      reject(err);
    }
  });

exports.removePromotion = removePromotion;
