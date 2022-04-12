// require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5869},
{"Product ID":5870},
{"Product ID":5871}]

applySortOrderToMany(productIds, 209).then(console.log).catch(console.log);
