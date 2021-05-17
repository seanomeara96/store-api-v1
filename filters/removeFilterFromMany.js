const { removeFilterFromMany } = require("./modules/delete");

const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

removeFilterFromMany(productIDs, "Proceive", "Women & Men")
  .then(() => console.log("done"))
  .catch(() => console.log("err"));
