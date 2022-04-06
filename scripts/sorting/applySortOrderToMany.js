require("../../config/config").config("bf");

const {
  applySortOrderToMany,
} = require("../../functions/products/applySortOrderToMany");
const productIds = [{"Product ID":5793},
{"Product ID":5794},
{"Product ID":5795},
{"Product ID":5797},
{"Product ID":5798},
{"Product ID":5799},
{"Product ID":5801},
{"Product ID":5802},
{"Product ID":5803},
{"Product ID":5804},
{"Product ID":5805},
{"Product ID":5806},
{"Product ID":5807},
{"Product ID":5808},
{"Product ID":5809},
{"Product ID":5810}]

applySortOrderToMany(productIds, 210).then(console.log).catch(console.log);
