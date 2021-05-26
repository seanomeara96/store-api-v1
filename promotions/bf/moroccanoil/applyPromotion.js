// Moroccanoil GWP URL https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/
require("../../../config/config").config("bf");
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brandName = "Moroccanoil";
const lineToAdd = bfGwpTemplate(
  brandName,
  "https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/",
  "Travel Essentials Kit",
  80
);
addLineToBrandProducts(brandName, lineToAdd)
  .then((res) => console.log(res, "success"))
  .catch((err) => console.log("something went wrong ", err));
