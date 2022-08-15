require("./config/config").config("fs");
const { getAllProducts } = require("./functions/products/getAllProducts");
(async () => {
  const products = await getAllProducts();

  for(const p of products){
    console.log((new Date(p.date_created)).toLocaleDateString())
  }
})();
