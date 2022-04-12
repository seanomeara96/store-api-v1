require("../../config/config").config("bf");

const {
  setVisibilityOfMany,
} = require("../../functions/products/setVisibilityOfMany");

const products = [{"Product ID":5830},
{"Product ID":5832},
{"Product ID":5833},
{"Product ID":5834},
{"Product ID":5835},
{"Product ID":5836},
{"Product ID":5837},
{"Product ID":5838}]

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
