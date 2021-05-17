const { removeFilter } = require("./modules/delete");

removeFilter(177, "Proceive", "Men")
  .then(() => console.log("filter removed"))
  .catch(() => console.log("somthing went wrong"));
