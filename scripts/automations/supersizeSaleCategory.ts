import { getAllProducts } from "./functions/products/getAllProducts";
import { Product } from "./functions/products/Product";
import { updateProduct } from "./functions/products/updateProduct";
async function test() {
  try {
    require("./config/config").config("bf");
    let products = await getAllProducts();

    const excludeCategories = [663];
    products = products.filter((p) => {
      for (const category of excludeCategories) {
        if (p.categories.includes(category)) return false;
      }
      return true;
    });

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      product.name = product.name.toLowerCase();

      let productMl;

      let mlMatch = product.name.match(/([0-9]+)\s?ml/);
      if (!mlMatch) {
        let lMatch = product.name.match(/([0-9]+)\s?l/);
        if (!lMatch) continue;
        productMl = Number(lMatch[1]) * 1000;
      } else {
        productMl = Number(mlMatch[1]);
      }

      if (!productMl) continue;

      if (productMl >= 500 && isOnSale(product)) {
        if (!product.categories.includes(664)) {
          product.categories.push(664);
          await updateProduct(product.id, {
            categories: product.categories,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();

function getDiscount(p: Product): number {
  if (p.sale_price == 0) return 0;
  return Math.round(((p.price - p.sale_price) / p.price) * 100);
}

function isOnSale(p: Product): boolean {
  return getDiscount(p) > 0;
}
