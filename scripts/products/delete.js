require("../../config/config").config("ih");
const { deleteProduct } = require("../../functions/products/deleteProduct");
console.log("\n");
deleteProduct(3847).then((res) => console.log(res + "\n")).catch(console.log);

