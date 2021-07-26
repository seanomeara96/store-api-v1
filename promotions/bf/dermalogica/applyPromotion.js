require("../../../config/config").config("bf")
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate")
const brand = "Dermalogica"
const lineToAdd = bfGwpTemplate(brand,"https://www.beautyfeatures.ie/free-dermalogica-gift-with-purchase/", "Pollution Protection Kit", 90);

addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch(() => console.log("something went wrong"));
