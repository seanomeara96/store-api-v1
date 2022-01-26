const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

function deleteMany() {
  const products = [
    { "Product ID": 4958 },
    { "Product ID": 4959 },
    { "Product ID": 4961 },
  ];

  deleteManyProducts(products).then(console.log).catch(console.log);
}
deleteMany()