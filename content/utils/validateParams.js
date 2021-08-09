/**
 * validates params for remove line/ promotion. remove promotion function
 * does not require a string to be passed in. Therfore its an optional param
 * @param {number} numero
 * @param {object} reject
 * @param {string} sentence
 */
const validateParams = (numero, reject, sentence = "") => {
  if (typeof sentence !== "string") reject("lineToAdd must be a string");
  if (typeof numero !== "number") reject("product id must be a number");
};

exports.validateParams = validateParams;
