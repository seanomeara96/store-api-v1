require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [
  { "Product ID": 5853 },
  { "Product ID": 5854 },
  { "Product ID": 5855 },
  { "Product ID": 5856 },
];

/**
 *
 * @param {{status: "fulfilled" | "rejected";}[]} allSettledResult
 * @returns {number}
 */
function countFulfilled(allSettledResult) {
  /**
   *
   * @param {number} a
   * @param {{status: "fulfilled" | "rejected";}} c
   * @returns
   */
  function countIfFulfilled(a, c) {
    return c.status === "fulfilled" ? a + 1 : a;
  }
  return allSettledResult.reduce(countIfFulfilled, 0);
}

function notifyFulfillmentStatus(res) {
  console.log(`${countFulfilled(res)}/${res.length} fulfilled`);
}

setVisibilityOfMany(products, true)
  .then(notifyFulfillmentStatus)
  .catch(console.log);
