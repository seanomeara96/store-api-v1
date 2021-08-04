const { validateParams } = require("./utils/validateParams");
const { updateProductDescription } = require("./updateProductDescription");
/**
 * matches string in product content and removes it
 * @param {number} productId 
 * @param {string} lineToRemove 
 * @returns 
 */
const removeLine = (productId, lineToRemove) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, lineToRemove, reject);
    try {
      const productDescription = await getProductDescription(productId);
      const updatedProductDescription = productDescription.replace(
        lineToRemove,
        ""
      );
      await updateProductDescription(productId, updatedProductDescription);
      if (productDescription === updatedProductDescription)
        return reject("no change was made");
      resolve("Line removed");
    } catch (err) {
      reject(err);
    }
  });

exports.removeLine = removeLine;
