require("../../../../config/config").config("bf")
const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts");
const brand = "NUXE"
removePromotionFromBrandProducts(brand)
  .then((res) => console.log(res))
  .catch(() => console.log("something went wrong"));