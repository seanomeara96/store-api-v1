require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [
  { "Product ID": 5775 },
  { "Product ID": 5777 },
  { "Product ID": 5778 },
  { "Product ID": 5780 },
  { "Product ID": 5781 },
  { "Product ID": 5782 },
  { "Product ID": 5783 },
  { "Product ID": 5784 },
  { "Product ID": 5785 },
  { "Product ID": 5786 },
  { "Product ID": 5787 },
  { "Product ID": 5788 },
  { "Product ID": 5789 },
  { "Product ID": 5790 },
  { "Product ID": 5791 },
  { "Product ID": 5792 },
  { "Product ID": 5814 },
  { "Product ID": 5815 },
  { "Product ID": 5816 },
  { "Product ID": 5817 },
  { "Product ID": 5819 },
];

function main() {
  setVisibilityOfMany(products, true)
    .then((res) =>
      console.log(
        `${res.reduce((a, c) => {
          if (c.status === "fulfilled") {
            return a + 1;
          }
          return a;
        }, 0)}/${res.length} fulfilled`
      )
    )
    .catch(console.log);
}

main();
