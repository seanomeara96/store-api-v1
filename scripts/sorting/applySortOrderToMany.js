require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [
  { "Product ID": 5878 },
  { "Product ID": 5880 },
];

applySortOrderToMany(productIds, 300).then(console.log).catch(console.log);
