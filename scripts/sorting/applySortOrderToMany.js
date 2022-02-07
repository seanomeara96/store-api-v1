require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");
const productIds = [
  { "Product ID": 5679 },
  { "Product ID": 5680 },
  { "Product ID": 5681 },
  { "Product ID": 5682 },
  { "Product ID": 5683 },
];

applySortOrderToMany(productIds, 942).then(console.log).catch(console.log);
