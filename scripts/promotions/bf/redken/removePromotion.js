require("../../../../config/config").config("bf")
const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts")
const brand = "Redken";
removePromotionFromBrandProducts(brand)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));