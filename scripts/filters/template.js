require("../../config/config").config("bf");
const { applyFilter } = require("../../functions/filters/applyFilter");
const {
  getProductIdByName,
} = require("../../functions/products/getProductIdByName");

const data = [];

(async function () {
  for (const field of data) {
    const products = Object.keys(field).filter(
      (name) => name !== "Key" && name !== "Value"
    );
    for (const product of products) {
      if (field[product].toLowerCase() === "x") {
        const id = await getProductIdByName(product.trim()).catch(console.log);
        if (!id || typeof id !== "number")
          return console.log("failed to fetch ID");
        const res = await applyFilter(id, field.Key, field.Value).catch((err) =>
          console.log(err)
        );
        console.log(
          `${field.Key}=${field.Value} was ${res ? "" : "not "}added to ${product}`
        );
      }
    }
  }
})();
