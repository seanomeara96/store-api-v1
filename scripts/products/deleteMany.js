const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

function deleteMany() {
  const products = [{"Product ID":6142},
{"Product ID":6143},
{"Product ID":6144},
{"Product ID":6160},
{"Product ID":6161},
{"Product ID":6162}]

  deleteManyProducts(products).then(console.log).catch(console.log);
}

deleteMany();
