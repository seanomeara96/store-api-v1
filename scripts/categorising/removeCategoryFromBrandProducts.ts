import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { getAllProducts } from "../../functions/products/getAllProducts";

/**
 * removes category from products by brand
 * @returns
 */
async function main() {
  try {
    require("../../config/config").config("bf");

    const brandName = "The Ordinary";
    const catId = 640;

    const brand = await getBrandByName(brandName);

    if (!brand || brand.name !== brandName) return console.log("brand fault");

    console.log(brand.name)

    const products = await getAllProducts({ brand_id: brand.id });

    for (const product of products) {
      if (product.categories.includes(catId)) {
        await removeCatFromProduct(product.id, catId);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

main();
