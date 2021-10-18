// Moroccanoil GWP URL https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/
require("../../../../config/config").config("bf");
const {
  addLineToBrandProducts,
} = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brandName = "Moroccanoil";
const lineToAdd = bfGwpTemplate(
  brandName,
  "https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/",
  "Hydrate Shampoo and Conditioner 70ml",
  80
);
addLineToBrandProducts(brandName, lineToAdd)
  .then((res) => console.log(res, "success"))
  .catch((err) => console.log("something went wrong ", err));
