require("../../config/config").config("bf");
const { addCatToProduct } = require("../products/addCatToProduct");
const { getProductsByBrand } = require("../products/getProductsByBrand");
const brandName = "Eleven Australia";
const catId = 592;
getProductsByBrand(brandName)
  .then((products) => {
    let promises = [];
    products.forEach((product) => {
      if (!product.categories.includes(catId)) {
        promises.push(addCatToProduct(product.id, catId));
      }
    });
    Promise.allSettled(promises)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
