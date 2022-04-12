require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");

const productIds = [{"Product ID":5826},
{"Product ID":5827},
{"Product ID":5828},
{"Product ID":5829},
{"Product ID":5830},
{"Product ID":5831},
{"Product ID":5832},
{"Product ID":5833},
{"Product ID":5834},
{"Product ID":5835},
{"Product ID":5836},
{"Product ID":5837},
{"Product ID":5838}]

applySortOrderToMany(productIds, 4480).then(console.log).catch(console.log);
