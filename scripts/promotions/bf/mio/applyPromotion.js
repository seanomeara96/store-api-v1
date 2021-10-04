const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Mio";
const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-mio-gift-with-purchase/",
  "Clay Away Cleanser 30ml",
  30
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
