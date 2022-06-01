require("../../config/config").config("ah");
const { deleteProduct } = require("../../functions/products/deleteProduct");
deleteProduct(1756).then((res) => console.log(res + "\n")).catch(console.log);

