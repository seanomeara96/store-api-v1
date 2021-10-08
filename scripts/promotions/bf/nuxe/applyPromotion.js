require("../../../../config/config").config("bf")
const { addLineToBrandProducts } = require("../../../../functions/content/addLineToBrandProducts");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate")
const brand = "NUXE"
const lineToAdd = bfGwpTemplate(brand,"https://www.beautyfeatures.ie/free-nuxe-gift-with-purchase/", "NUXE Very Rose 3-in-1 Soothing Micellar Water 100ml", 60);
addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch(() => console.log("something went wrong"));
