require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5851},
{"Product ID":5857},
{"Product ID":5859},
{"Product ID":5861},
{"Product ID":5862},
{"Product ID":5863},
{"Product ID":5864},
{"Product ID":5866},
{"Product ID":5867}]

function notifyFulfillmentStatus(res) {
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

  console.log(`${countFulfilled(res)}/${res.length} fulfilled`);
}

setVisibilityOfMany(products, true)
  .then(notifyFulfillmentStatus)
  .catch(console.log);
