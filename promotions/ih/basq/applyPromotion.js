require("../../../config/config").config("ih");
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { ihGwpTemplate } = require("../../../templates/ihGwpTemplate");
const brand = "Basq";
const lineToAdd = ihGwpTemplate(
  brand,
  "https://www.inhealth.ie/free-basq-gift-with-purchase/",
  "Basq Cooling Body Bliss Lotion 30ml",
  50
);
addLineToBrandProducts(brand, lineToAdd)
  .then((res) => {
      let count = 0;
      res.forEach(result => {
        if(result.status == "fulfilled")  count++
      })
      console.log(`Made ${count} changes to ${res.length} products`)
  })
  .catch((err) => console.log(err));
