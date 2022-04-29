require("../../config/config").config("bf");
const { addCatToProduct } = require("../../functions/products/addCatToProduct");
const { getProductsByBrand } = require("../../functions/products/getProductsByBrand");

const addCatToProductsNotInCat = (products, catId) =>
  products.map((product) => {
    if (!product.categories.includes(catId))
      return addCatToProduct(product.id, catId);
  });
const throwErr = (err) => {
  console.log(err);
  throw new Error(err);
};
async function addBrandToCat(brandName, catId) {
  let products = await getProductsByBrand(brandName).catch(throwErr);
  let res = await Promise.allSettled(
    addCatToProductsNotInCat(products, catId)
  ).catch(throwErr);

  console.log(res);
}

const brandName = "Shiseido";
const catId = 607;

addBrandToCat(brandName, catId);
