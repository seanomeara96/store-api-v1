require("../../../config/config").config("ih");
const { addLineToBrandProducts } = require("../../../content/modules/update");
const { ihGwpTemplate } = require("../../../templates/ihGwpTemplate");
const brand = "Mama Mio";
const lineToAdd = ihGwpTemplate(
  brand,
  "https://www.inhealth.ie/free-mama-mio-gift-with-purchase/",
  "Mama Mio Tummy Rub Butter 30ml",
  40
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
