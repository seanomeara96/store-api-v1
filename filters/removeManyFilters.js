const { removeManyFilters } = require("./modules/delete");

const filters = [
  { name: "Proceive", value: "Women" },
  { name: "Proceive", value: "Men & Women" },
];

removeManyFilters(177, filters)
  .then(() => console.log("Filters removed."))
  .catch(() => console.log("Something went wrong."));
