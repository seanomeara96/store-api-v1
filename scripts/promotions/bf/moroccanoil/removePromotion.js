require("../../../../config/config").config("bf");
const {
  removePromotionFromBrandProducts,
} = require("../../../../functions/content/removePromotionFromBrandProducts");

const brandName = "Moroccanoil";

//console.log(lineToRemove)
removePromotionFromBrandProducts(brandName)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
