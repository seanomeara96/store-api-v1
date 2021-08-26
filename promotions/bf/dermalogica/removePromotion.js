require("../../../config/config").config("bf");
const {
  removePromotionFromBrandProducts,
} = require("../../../content/removePromotionFromBrandProducts");
const brand = "Dermalogica";

removePromotionFromBrandProducts(brand).then(console.log).catch(console.log);
