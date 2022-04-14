require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5644},
{"Product ID":5645},
{"Product ID":5646},
{"Product ID":5647}]

applySortOrderToMany(productIds, 1300).then(console.log).catch(console.log);
