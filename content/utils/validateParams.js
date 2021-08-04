const validateParams = (numero, reject, sentence = "") => {
  if (typeof sentence !== "string") reject("lineToAdd must be a string");
  if (typeof numero !== "number") reject("product id must be a number");
}

exports.validateParams = validateParams;
