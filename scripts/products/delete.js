require("../../config/config").config("bf");
const { deleteProduct } = require("../../functions/products/deleteProduct");
deleteProduct(5716).then((res) => console.log(res + "\n")).catch(console.log);

