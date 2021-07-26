require("../../../config/config").config("bf")
const { removeLineFromBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Redken";
const lineToRemove = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-redken-gift-with-purchase/",
  "One United 30ml",
  50
);
removeLineFromBrandProducts(brand, lineToRemove)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));