require("../../config/config").config("bs");
const { deleteProduct } = require("../../functions/products/deleteProduct");
deleteProduct(1126).then((res) => console.log(res + "\n")).catch(console.log);

