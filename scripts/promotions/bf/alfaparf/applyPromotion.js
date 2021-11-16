require("../../../../config/config").config("bf")
const {
  addLineToBrandProducts,
} = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Alfaparf";

const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-alfaparf-gift-with-purchase/",
  "Cristalli Liquidi 15ml",
  100
);
addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch("something went wrong");
