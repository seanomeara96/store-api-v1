const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts")

require("../../../../config/config").config("bf")
removePromotionFromBrandProducts("Alfaparf").then(console.log).catch(console.log)