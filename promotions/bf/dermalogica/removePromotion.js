require("../../../config/config").config("bf")
const { removeLineFromBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate")
const brand = "Dermalogica"
const lineToRemove = bfGwpTemplate(brand,"https://www.beautyfeatures.ie/free-dermalogica-gift-with-purchase/","Pollution Protection Kit",90);

removeLineFromBrandProducts(brand, lineToRemove)
  .then((res) => console.log(res))
  .catch(() => console.log("something went wrong"));
