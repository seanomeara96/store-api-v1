require("../../../config/config").config("bf")
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate")
const brand = "Carter Beauty"
const lineToAdd = bfGwpTemplate(brand,"https://www.beautyfeatures.ie/free-carter-beauty-gift-with-purchase/", "Carter Beauty Bounce & Blend Beauty Sponge", 16);
addLineToBrandProducts(brand, lineToAdd)
  .then(console.log)
  .catch(console.log);
