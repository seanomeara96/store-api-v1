const { applyFilter } = require("./modules/create");

applyFilter(178, "Proceive", "Men & Women")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
