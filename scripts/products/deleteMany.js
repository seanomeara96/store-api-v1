const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

function deleteMany() {
  const products = [{"bc_id":5277},
  {"bc_id":5280},
  {"bc_id":5883},
  {"bc_id":5914},
  {"bc_id":5939},
  {"bc_id":6152},
  {"bc_id":6232},
  {"bc_id":6358},
  {"bc_id":6416},
  {"bc_id":6461},
  {"bc_id":6462}];

  deleteManyProducts(products).then(console.log).catch(console.log);
}

deleteMany();
