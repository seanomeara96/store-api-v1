require("../../config/config").config("pb");
const { deleteProduct } = require("../../functions/products/deleteProduct");
deleteProduct(464).then((res) => console.log(res + "\n")).catch(console.log);

