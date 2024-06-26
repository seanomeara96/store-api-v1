import { getAllProducts } from "../../functions/products/getAllProducts";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";
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

      if (productMl <= 100 && isOnSale(product)) {
        let updated = false;

        const haircare = 12,
          skincare = 11,
          fragrance = 598,
          travelSizeCategory = 518,
          travelhair = 984,
          travelskin = 985,
          travelfragrance = 986;

        if (!product.categories.includes(travelSizeCategory)) {
          addCategory(product, travelSizeCategory);
          updated = true;
        }
        if (product.categories.includes(haircare)) {
          addCategory(product, travelhair);
          updated = true;
        }
        if (product.categories.includes(skincare)) {
          addCategory(product, travelskin);
          updated = true;
        }
        if (product.categories.includes(fragrance)) {
          addCategory(product, travelfragrance);
          updated = true;
        }

        if (updated) {
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

function addCategory(p: Product, id: number) {
  if (!p.categories.includes(id)) p.categories.push(id);
}

function getDiscount(p: Product): number {
  if (p.sale_price == 0) return 0;
  return Math.round(((p.price - p.sale_price) / p.price) * 100);
}

function isOnSale(p: Product): boolean {
  return getDiscount(p) > 0;
}
