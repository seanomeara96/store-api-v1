// require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5869},
{"Product ID":5870},
{"Product ID":5871}]

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
