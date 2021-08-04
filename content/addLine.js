const { validateParams } = require("./utils/validateParams");
const { getProductDescription } = require("./getProductDescription");
const { updateProductDescription } = require("./updateProductDescription");
/**
 * adds a line to the product description
 * @param {number} productId
 * @param {string} lineToAdd
 * @param {boolean} noDuplicateLines default true
 * @returns
 */
exports.addLine = (productId, lineToAdd, noDuplicateLines = true) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, reject, lineToAdd);
    try {
      const productDescription = await getProductDescription(productId);
      if (noDuplicateLines && productDescription.includes(lineToAdd))
        return reject("This line already exists");
      const updatedProductDescription = lineToAdd + productDescription;
      await updateProductDescription(productId, updatedProductDescription);
      resolve("Line added");
    } catch (err) {
      reject(err);
    }
  });
