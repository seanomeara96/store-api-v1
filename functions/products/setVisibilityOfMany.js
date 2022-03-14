const { productIsVisible } = require("./productIsVisible");
/**
 * set visibility of many products to either true (visible) or false (not visible)
 * @param {object[]} productIds 
 * @param {boolean} is_visible 
 * @returns promise
 */
const setVisibilityOfMany = (productIds, is_visible) =>
  new Promise((resolve, reject) =>
    Promise.allSettled(
      productIds.map((i) => productIsVisible(Object.values(i)[0], is_visible))
    )
      .then(resolve)
      .catch(reject)
  );
exports.setVisibilityOfMany = setVisibilityOfMany;
