require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5769},
{"Product ID":5770},
{"Product ID":5771}]

applySortOrderToMany(productIds, 1308).then(console.log).catch(console.log);
