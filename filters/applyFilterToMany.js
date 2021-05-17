const { applyFilterToMany } = require("./index");

const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

applyFilterToMany(productIDs, "Proceive", "Men & Women");
