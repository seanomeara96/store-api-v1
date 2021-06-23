const { applySpecificFilters } = require("./modules/create");
require("../config/config").config("bf");
const data = []; // data goes here

applySpecificFilters(data)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
