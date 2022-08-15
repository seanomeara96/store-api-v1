const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("ih");

function deleteMany() {
  const products = [{"Product ID":2413},
  {"Product ID":2436},
  {"Product ID":2450},
  {"Product ID":2454},
  {"Product ID":2461},
  {"Product ID":2466},
  {"Product ID":2477},
  {"Product ID":2566},
  {"Product ID":2579},
  {"Product ID":2632},
  {"Product ID":2645},
  {"Product ID":2668},
  {"Product ID":2737},
  {"Product ID":2763},
  {"Product ID":2776},
  {"Product ID":2790},
  {"Product ID":2818},
  {"Product ID":2822},
  {"Product ID":2832},
  {"Product ID":2869},
  {"Product ID":2901},
  {"Product ID":2924},
  {"Product ID":2933},
  {"Product ID":2960},
  {"Product ID":2979},
  {"Product ID":2983},
  {"Product ID":3007},
  {"Product ID":3020},
  {"Product ID":3023},
  {"Product ID":3040},
  {"Product ID":3070},
  {"Product ID":3097},
  {"Product ID":3144},
  {"Product ID":3177},
  {"Product ID":3234},
  {"Product ID":3283},
  {"Product ID":3284},
  {"Product ID":3285},
  {"Product ID":3317},
  {"Product ID":3355},
  {"Product ID":3386},
  {"Product ID":3387},
  {"Product ID":3389},
  {"Product ID":3415},
  {"Product ID":3445},
  {"Product ID":3446},
  {"Product ID":3490},
  {"Product ID":3623}]

  deleteManyProducts(products).then(console.log).catch(console.log);
}

deleteMany();
