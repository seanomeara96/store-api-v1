require("../../config/config").config("bf");
const { deleteProduct } = require("../../functions/products/deleteProduct");
console.log("\n");
deleteProduct(4820).then((res) => console.log(res + "\n")).catch(console.log);

