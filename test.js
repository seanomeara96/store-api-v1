const pid = 3481;
require("./config/config").config("bf")
const {getProductVariants} = require("./functions/products/getProductVariants")

getProductVariants(pid).then(console.log).catch(console.log)