require("../../../config/config").config("bf");
const {
  removeLineFromBrandProducts,
} = require("../../../content/removeLineFromBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brandName = "Moroccanoil";
const lineToRemove = bfGwpTemplate(
  brandName,
  "https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/",
  "Travel Essentials Kit",
  80
);
//console.log(lineToRemove)
removeLineFromBrandProducts(brandName, lineToRemove)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
