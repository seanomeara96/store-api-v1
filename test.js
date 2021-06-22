require("./config/config").config("pb");
const { getProductsByBrand } = require("./products/getProductsByBrand");
getProductsByBrand("LombaMum")
  .then((products) => {
    console.log(products.map(product => product.name));
  })
  .catch((err) => console.log(err));
