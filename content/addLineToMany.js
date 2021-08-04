const { addLine } = require("./addLine");
/**
 * adds line to descriptions of specific products
 * @param {object[]} productIds
 * @param {string} lineToAdd
 * @returns
 */
const addLineToMany = (productIds, lineToAdd) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product)[0];
      promises.push(addLine(product[idKey], lineToAdd));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
exports.addLineToMany = addLineToMany;
