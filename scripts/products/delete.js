require("../../config/config").config("ih");
const { deleteProduct } = require("../../functions/products/deleteProduct");
deleteProduct(3255).then((res) => console.log(res + "\n")).catch(console.log);

