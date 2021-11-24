require("../../../../config/config").config("bf")
const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts");
const brand = "Caudalie"
removePromotionFromBrandProducts(brand)
  .then((res) => console.log(`${res.filter(i => i.status === "rejected").length}/${res.length} items rejected. Will require manual check`))
  .catch(() => console.log("something went wrong"));