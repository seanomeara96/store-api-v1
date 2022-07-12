require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [
{"Product ID":1534},
{"Product ID":1772},
{"Product ID":2058},
{"Product ID":2674},
]

applySortOrderToMany(productIds, 0).then(console.log).catch(console.log);
