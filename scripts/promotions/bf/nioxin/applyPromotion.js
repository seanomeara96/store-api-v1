require("../../../../config/config").config("bf");
const {
  addLineToBrandProducts,
} = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Nioxin";
const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-nioxin-gift-with-purchase/",
  "Nioxin Diaboost Thickening Xtrafusion Treatment 100ml",
  80
);
addLineToBrandProducts(brand, lineToAdd).then(console.log).catch(console.log);
