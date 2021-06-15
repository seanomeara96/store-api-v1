const { getAllBrands } = require("../brands/getAllBrands");

getAllBrands().then((res) => {
  res[0]["meta_description_length"] = res[0]["meta_description"].length
  console.log(res[0]);
});
