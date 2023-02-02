require("../../config/config").config("bf");
const {
  applyFilterToMany,
} = require("../../functions/filters/applyFilterToMany");

const products = [{"Product ID":5933},
{"Product ID":5934},
{"Product ID":5935},
{"Product ID":5936},
{"Product ID":5937},
{"Product ID":5938}]



applyFilterToMany(products, skinConcerns, redness)
  .then(console.log)
  .catch(console.log);
