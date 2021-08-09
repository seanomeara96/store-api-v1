const validateParams = (numero, reject, sentence = "") => {
  if(!sentence.length) reject("there must be a line to remove")
  if (typeof sentence !== "string") reject("lineToAdd must be a string");
  if (typeof numero !== "number") reject("product id must be a number");
}

exports.validateParams = validateParams;
