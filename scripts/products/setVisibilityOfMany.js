require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5843},
{"Product ID":5844},
{"Product ID":5845},
{"Product ID":5846},
{"Product ID":5847},
{"Product ID":5848},
{"Product ID":5849},
{"Product ID":5850}]
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
