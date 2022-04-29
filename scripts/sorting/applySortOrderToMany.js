require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5875},
{"Product ID":5888},
{"Product ID":5889},
{"Product ID":5890},
{"Product ID":5891},
{"Product ID":5893}]

applySortOrderToMany(productIds, 26).then(console.log).catch(console.log);
