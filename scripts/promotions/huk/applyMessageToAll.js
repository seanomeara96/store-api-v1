const {
  getAllProducts,
} = require("../../../functions/products/getAllProducts");
const { log } = console;
getAllProducts()
  .then((res) => log(res))
  .catch((err) => log(err));
