const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Redken";
const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-redken-gift-with-purchase/",
  "One United 30ml",
  50
);
addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
