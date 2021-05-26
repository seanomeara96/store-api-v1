require("../../../config/config").config("bf");
const {
  removeLineFromBrandProducts,
} = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brandName = "Moroccanoil";
const lineToRemove ="";
//console.log(lineToRemove)
removeLineFromBrandProducts(brandName, lineToRemove)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
 
