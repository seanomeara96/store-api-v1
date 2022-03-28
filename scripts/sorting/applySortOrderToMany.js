require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");
const productIds = [{"Product ID":5755},
{"Product ID":5756},
{"Product ID":5757},
{"Product ID":5758},
{"Product ID":5759},
{"Product ID":5760},
{"Product ID":5761},
{"Product ID":5762},
{"Product ID":5763},
{"Product ID":5764},
{"Product ID":5765},
{"Product ID":5766}]

applySortOrderToMany(productIds, 1939).then(console.log).catch(console.log);
