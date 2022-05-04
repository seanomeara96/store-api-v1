require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5875},
{"Product ID":5888},
{"Product ID":5889},
{"Product ID":5890},
{"Product ID":5891},
{"Product ID":5893}]
function notifyFulfillmentStatus(res) {
  /**
   * @param {{status: "fulfilled" | "rejected";}[]} allSettledResult
   * @returns {number}
   */
  function countFulfilled(allSettledResult) {
    /**
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
