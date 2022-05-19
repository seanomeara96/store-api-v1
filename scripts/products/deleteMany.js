const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("hie");

function deleteMany() {
  const products = [{"bc_id":233},
  {"bc_id":235},
  {"bc_id":245}]

  deleteManyProducts(products).then(console.log).catch(console.log);
}

deleteMany();
