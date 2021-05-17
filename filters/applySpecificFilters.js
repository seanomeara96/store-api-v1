const { applySpecificFilters } = require("./modules/create");

const data = [
  {
    "Product Id": 177,
    Filters: "Proceive=Men;Proceive=Women;Proceive=Women & Men",
  },
  { "Product Id": 178, Filters: "Proceive=Women;Proceive=Women & Men" },
  { "Product Id": 179, Filters: "Proceive=Men;Proceive=Women & Men" },
  { "Product Id": 180, Filters: "Proceive=Men;Proceive=Women;" },
  { "Product Id": 181, Filters: "Proceive=Men;" },
];

applySpecificFilters(data);
