const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

function deleteMany() {
  const products = [{ "Product ID": 2821 }, { "Product ID": 5435 }];

  deleteManyProducts(products).then(console.log).catch(console.log);
}

deleteMany();
