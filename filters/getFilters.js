const { getFilters } = require("./modules/getFilters");

getFilters(178)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
