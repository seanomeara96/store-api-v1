require("../../../config/config").config("bf")
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate")
const brand = "NUXE"
const lineToAdd = bfGwpTemplate(brand,"https://www.beautyfeatures.ie/free-nuxe-gift-with-purchase/", "NUXE Reve De Miel Lip Balm", 60);
addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch(() => console.log("something went wrong"));
