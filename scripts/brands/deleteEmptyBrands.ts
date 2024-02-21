import { deleteBrand } from "./functions/brands/deleteBrand";
import { getBrandByName } from "./functions/brands/getBrandByName";
import { deleteProduct } from "./functions/products/deleteProduct";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductVariants } from "./functions/products/getProductVariants";

async function test() {
  try {
    require("./config/config").config("px");

    const brands = [
      "SOSU",
      "TRUE BEAUTY",
      "Ariana Grande",
      "Embryolisse",
      "Wild",
      "The Inkey List",
      "The Belle Brush",
      "NUXE",
      "Narciso Rodriguez",
      "Isoclean",
      "HD Brows",
      "Dripping Gold",
      "BeautyFeatures"
  ];

    for (let i = 0; i < brands.length; i++) {
      const brand = await getBrandByName(brands[i]);

      if (!brand) continue;

      const brand_products = await getAllProducts({ brand_id: brand.id });

      // check all products/variants are oos
      let all_oos = true;
      for (const product of brand_products) {
        if (product.sku != "" && product.inventory_level) {
          all_oos = false;
          continue;
        }
        const variants = await getProductVariants(product.id);
        for (const v of variants) {
          if (v.inventory_level) {
            all_oos = false;
          }
        }
      }

      // if all are oos then delete all
      if (all_oos) {
        console.log(`Deleting all products for ${brand.name}`);
        for (const product of brand_products) {
          await deleteProduct(product.id);
        }
      } else {
        console.log(`Brand ${brand.name} has products`);
        continue;
      }

      console.log(`Deleting brand: ${brand.name}`);
      // finally delete brand
      await deleteBrand(brand.id);
    }
  } catch (err) {
    console.log(err);
  }
}

test();
