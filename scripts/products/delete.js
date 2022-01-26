require("../../config/config").config("bf");
const { deleteProduct } = require("../../functions/products/deleteProduct");

deleteProduct(4406).then(console.log).catch(console.log)