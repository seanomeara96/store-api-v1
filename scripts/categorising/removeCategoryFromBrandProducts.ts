require("../../config/config").config("bf");
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";
import { getProductsByBrand } from "../../functions/products/getProductsByBrand";

/**
 * removes category from products by brand
 * @param {*} categoryName
 * @returns
 */
async function removeCategoryFromBrandProducts(brand: string, categoryId: number) {
  const products = await getProductsByBrand(brand);
  for (const product of products) {
    await removeCatFromProduct(product.id, categoryId);
  }
}
const brand = "Olaplex";
const catId = 640;
removeCategoryFromBrandProducts(brand, catId);
