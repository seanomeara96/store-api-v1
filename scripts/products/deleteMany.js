const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("pb");

function deleteMany() {
  const products = [{"Product ID":493},
  {"Product ID":494},
  {"Product ID":1240}]

  deleteManyProducts(products).then(console.log).catch(console.log);
}
deleteMany();
