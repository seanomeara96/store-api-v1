const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

const products = [
  { "Product ID": 464 },
  { "Product ID": 2061 },
  { "Product ID": 5434 },
];

deleteManyProducts(products).then(console.log).catch(console.log);
