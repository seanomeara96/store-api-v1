/**
 * validates params for remove line/ promotion. remove promotion function
 * does not require a string to be passed in. Therfore its an optional param
 * @param {number} numero
 * @param {object} reject
 * @param {string} sentence
 */
export function validateParams(
  numero: number,
  reject: (s: string) => any,
  sentence = ""
) {
  if (typeof sentence !== "string") {
    return reject("lineToAdd must be a string");
  }
  if (typeof numero !== "number") {
    return reject("product id must be a number");
  }
}
