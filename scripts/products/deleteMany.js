const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("ah");

function deleteMany() {
  const products = [{"Product ID":1181},
  {"Product ID":1182},
  {"Product ID":1194},
  {"Product ID":1428},
  {"Product ID":1430},
  {"Product ID":1501}]

  deleteManyProducts(products).then(console.log).catch(console.log);
}
deleteMany();
