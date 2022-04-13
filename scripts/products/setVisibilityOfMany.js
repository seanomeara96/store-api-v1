require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [
  { "Product ID": 5665 },
  { "Product ID": 5667 },
  { "Product ID": 5668 },
  { "Product ID": 5669 },
  { "Product ID": 5670 },
  { "Product ID": 5671 },
  { "Product ID": 5672 },
  { "Product ID": 5675 },
];

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
