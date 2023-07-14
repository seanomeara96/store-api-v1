import { Product } from "../../functions/products/Product";

require("../../config/config").config("bf");
import { getAllProducts } from "../../functions/products/getAllProducts";
import { removeCategoryFromProductsInCategory } from "../../functions/products/removeCategoryFromProductsInCategory";
import { addCatToProduct } from "../../functions/products/addCatToProduct";

function currentDiscount(product: Product) {
  return Math.round(
    ((product.price - product.sale_price) / product.price) * 100
  );
}

(async function () {
  const shopByOffer = 668;
  const save50 = 660;
  const save40 = 661;
  const save30 = 662;
  const save20 = 705;
  const save10 = 706;
  console.log("getting products");
  let products;
  try {
    products = await getAllProducts();
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(`found ${products.length} products`);
  if (!products) {
    console.log("No products");
    return;
  }

  console.log("empty cats");
  for (const id of [shopByOffer, save50, save40, save30, save20, save10]) {
    try {
      console.log(`removing products from category with id of ${id}...`);
      await removeCategoryFromProductsInCategory(id, products);
      console.log(`removed products from category with id of ${id}`);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  for (const product of products) {
    try {
      if (currentDiscount(product) >= 50) {
        console.log(`${product.name} is > 50% off`);
        await Promise.all([
          addCatToProduct(product.id, shopByOffer),
          addCatToProduct(product.id, save50),
        ]);
      }
      if (40 <= currentDiscount(product) && currentDiscount(product) < 50) {
        console.log(`${product.name} is > 40% off`);
        await Promise.all([
          addCatToProduct(product.id, shopByOffer),
          addCatToProduct(product.id, save40),
        ]);
      }
      if (30 <= currentDiscount(product) && currentDiscount(product) < 40) {
        console.log(`${product.name} is > 30% off`);
        await Promise.all([
          addCatToProduct(product.id, shopByOffer),
          addCatToProduct(product.id, save30),
        ]);
      }
      if (20 <= currentDiscount(product) && currentDiscount(product) < 30) {
        console.log(`${product.name} is > 20% off`);
        await Promise.all([
          addCatToProduct(product.id, shopByOffer),
          addCatToProduct(product.id, save20),
        ]);
      }
      if (10 <= currentDiscount(product) && currentDiscount(product) < 20) {
        console.log(`${product.name} is > 10% off`);
        await Promise.all([
          addCatToProduct(product.id, shopByOffer),
          addCatToProduct(product.id, save10),
        ]);
      }
    } catch (err) {
      console.log(err);
      continue;
    }
  }
  console.log("done");
})();
