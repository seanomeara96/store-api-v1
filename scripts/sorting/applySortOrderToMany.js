require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5851},
{"Product ID":5852},
{"Product ID":5853},
{"Product ID":5854},
{"Product ID":5855},
{"Product ID":5856},
{"Product ID":5857},
{"Product ID":5858},
{"Product ID":5859},
{"Product ID":5860},
{"Product ID":5861},
{"Product ID":5862},
{"Product ID":5863},
{"Product ID":5864},
{"Product ID":5865},
{"Product ID":5866},
{"Product ID":5867}]

applySortOrderToMany(productIds, 1621).then(console.log).catch(console.log);
