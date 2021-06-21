require("./config/config").config("pb");
const { getProductsByBrand } = require("./products/getProductsByBrand");
getProductsByBrand("Gro Company")
  .then((products) => {
    console.log(products);
  })
  .catch((err) => console.log(err));
