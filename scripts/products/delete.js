const { deleteProduct } = require("../../functions/products/deleteProduct");

require("../../config/config").config("ih");

deleteProduct(3463).then(console.log).catch(console.log)