// Moroccanoil GWP URL https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/
require("../../../../config/config").config("bf");
const {
  addLineToBrandProducts,
} = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brandName = "SVR";
const lineToAdd = bfGwpTemplate(
  brandName,
  "https://www.beautyfeatures.ie/free-svr-gift-with-purchase/",
  "SVR Sebiaclear Gel Moussant 50ml",
  30
);
addLineToBrandProducts(brandName, lineToAdd)
  .then((res) => console.log(res, "success"))
  .catch((err) => console.log("something went wrong ", err));
