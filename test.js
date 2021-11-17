require("./config/config").config("bf")
const { removeCategoryFromProductsInCategory } = require("./scripts/categorising/removeCategoryFromProductsInCategory");

removeCategoryFromProductsInCategory(28).then((res) => console.log(res.length)).catch(console.log)