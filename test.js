require("./config/config").config("bf");

const {getProductById} = require("./functions/products/getProductById");

getProductById(5358).then(console.log)