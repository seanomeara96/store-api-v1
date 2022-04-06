// TODO move to scripts
const { validateParams } = require("./utils/validateParams");
const { getProductDescription } = require("./getProductDescription");
const { updateProductDescription } = require("./updateProductDescription");
/**
 * adds a line to the product description
 * @param {number} productId
 * @param {string} lineToAdd
 * @param {string} location defaults to before
 * @param {boolean} noDuplicateLines default true
 * @returns
 */
const addLine = (
  productId,
  lineToAdd,
  location = "before",
  noDuplicateLines = true
) =>
  new Promise(async (resolve, reject) => {
    validateParams(productId, reject, lineToAdd);
    try {
      const productDescription = await getProductDescription(productId);
      if (noDuplicateLines && productDescription.includes(lineToAdd))
        return reject("This line already exists");
      const updatedProductDescription =
        location === "before"
          ? lineToAdd + productDescription
          : productDescription + lineToAdd;
      await updateProductDescription(productId, updatedProductDescription);
      resolve("Line added");
    } catch (err) {
      reject(err);
    }
  });
exports.addLine = addLine;