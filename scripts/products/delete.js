require("../../config/config").config("ah");
const { deleteProduct } = require("../../functions/products/deleteProduct");

deleteProduct(860).then(console.log).catch(console.log)