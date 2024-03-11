import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";
import { getProductsByBrand } from "../../functions/products/getProductsByBrand";
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { getAllProducts } from "../../functions/products/getAllProducts";

/**
 * removes category from products by brand
 * @param {*} categoryName
 * @returns
 */
async function main() {
  try {
    require("../../config/config").config("bf");

    const brandName = "Redken";
    const catId = 640;

    const brand = await getBrandByName(brandName);

    if (!brand || brand.name !== brandName) return console.log("brand fault");

    const products = await getAllProducts({ brand_id: brand.id });

    for (const product of products) {
      await removeCatFromProduct(product.id, catId);
    }
  } catch (err) {
    console.log(err);
  }
}

main();
