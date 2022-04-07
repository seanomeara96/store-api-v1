require("../../config/config").config("ih");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":4175},
{"Product ID":4176}]

applySortOrderToMany(productIds, 587).then(console.log).catch(console.log);
