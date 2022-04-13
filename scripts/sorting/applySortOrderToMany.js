require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5665},
{"Product ID":5667},
{"Product ID":5668},
{"Product ID":5669},
{"Product ID":5670},
{"Product ID":5671},
{"Product ID":5672},
{"Product ID":5675}]

applySortOrderToMany(productIds, 9).then(console.log).catch(console.log);
