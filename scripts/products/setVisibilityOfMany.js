require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5644},
{"Product ID":5645},
{"Product ID":5646},
{"Product ID":5647}]

function main() {
  setVisibilityOfMany(products, true)
    .then((res) =>
      console.log(
        `${res.reduce((a, c) => (c.status === "fulfilled" ? a + 1 : a), 0)}/${
          res.length
        } fulfilled`
      )
    )
    .catch(console.log);
}

main();
