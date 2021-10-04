const { addLineToBrandProducts } = require("../../../content/modules/update");
const { bfGwpTemplate } = require("../../../templates/bfGwpTemplate");
const brand = "Mama Mio";
const lineToAdd = bfGwpTemplate(
  brand,
  "https://www.beautyfeatures.ie/free-mama-mio-gift-with-purchase/",
  "Tummy Rub Butter 30ml",
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
