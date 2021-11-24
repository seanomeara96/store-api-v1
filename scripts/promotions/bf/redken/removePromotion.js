const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts")

require("../../../../config/config").config("bf")
removePromotionFromBrandProducts("Redken").then((res) => console.log(`${res.filter(i => i.status === "rejected").length}/${res.length} items rejected. Will require manual check`)).catch(console.log)