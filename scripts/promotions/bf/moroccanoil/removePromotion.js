require("../../../../config/config").config("bf");
const {
  removePromotionFromBrandProducts,
} = require("../../../../functions/content/removePromotionFromBrandProducts");

const brandName = "Moroccanoil";

//console.log(lineToRemove)
removePromotionFromBrandProducts(brandName)
  .then((res) => console.log(`${res.filter(i => i.status === "rejected").length} items rejected. Will require manual check`))
  .catch((err) => console.log(err));
