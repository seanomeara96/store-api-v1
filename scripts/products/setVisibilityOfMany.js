require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [
  { "Product ID": 5769 },
  { "Product ID": 5770 },
  { "Product ID": 5771 },
];
/**
 *
 * @param {{status: "fulfilled" | "rejected";}[]} allSettledResult
 * @returns {number}
 */
function countFulfilled(allSettledResult) {
  return allSettledResult.reduce(
    (a, c) => (c.status === "fulfilled" ? a + 1 : a),
    0
  );
}

setVisibilityOfMany(products, true)
  .then((res) => console.log(`${countFulfilled(res)}/${res.length} fulfilled`))
  .catch(console.log);
