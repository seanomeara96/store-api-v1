const { deleteProduct } = require("../../functions/products/deleteProduct");

require("../../config/config").config("");

deleteProduct().then(console.log).catch(console.log);
