const { applyManyFiltersToMany } = require("./modules/create");

const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

const filters = [
  {
    name: "Proceive",
    value: "Men",
  },
  {
    name: "Proceive",
    value: "Women",
  },
  {
    name: "Proceive",
    value: "Men & Women",
  },
];

applyManyFiltersToMany(productIDs, filters)
  .then((res) => res.forEach((item) => console.log(item.value)))
  .catch(() => console.log("err"));
