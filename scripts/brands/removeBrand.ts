import { deleteBrand } from "../../functions/brands/deleteBrand";
import { getAllBrands } from "../../functions/brands/getAllBrands";
import { deleteProduct } from "../../functions/products/deleteProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";
require("../../config/config").config("bs");

main("Scandinavian Pet Design");


async function main(brandName: string) {
  try {
    const brands = await getAllBrands({
      name: brandName,
    });

    if (brands.length > 1) {
      throw "multiple brands";
    }

    if (!brands.length) {
      throw "no brands";
    }

    const brand = brands[0];

    const brand_products = await getAllProducts({
      brand_id: brand.id,
    });

    let product_in_stock = false;

    for (let i = 0; i < brand_products.length; i++) {
      const product = brand_products[i];

      if (product.inventory_level > 0) {
        product_in_stock = true;
      }
    }

    if (product_in_stock) {
      throw "brand has existing products";
    }

    console.log(`will delete ${brand_products.length} products and brand`);

    let all_product_deletions_successful = true;

    for (let i = 0; i < brand_products.length; i++) {
      const product = brand_products[i];
      try {
        await deleteProduct(product.id);
      } catch (err) {
        console.log(`error deleting product`);
        all_product_deletions_successful = false;
      }
    }

    if (all_product_deletions_successful) {
      await deleteBrand(brand.id);
      console.log(`deleted brand: ${brand.name}`);
    }
  } catch (err) {
    console.log(err);
  }
}


