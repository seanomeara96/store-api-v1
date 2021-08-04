const { removeLine } = require("./removeLine");
/**
 *
 * @param {object[]} productIds
 * @param {*} lineToRemove
 * @returns
 */
const removeLineFromMany = (productIds, lineToRemove) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idKey = Object.keys(product)[0];
      promises.push(removeLine(product[idKey], lineToRemove));
    });
    Promise.allSettled(promises)
      .then((res) => resolve(res))
      .catch(reject);
  });

exports.removeLineFromMany = removeLineFromMany;
