require("../../../../config/config").config("bf");
const {
  addLineToBrandProducts,
} = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Dermalogica";
const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-dermalogica-gift-with-purchase/",
  "Multivitamin Essentials Kit",
  100
);

function applyPromotion() {
  addLineToBrandProducts(brand, lineToAdd)
    .then((res) => console.log(res))
    .catch(() => console.log("something went wrong"));
}
applyPromotion();
