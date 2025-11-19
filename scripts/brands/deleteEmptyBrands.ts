import { deleteBrand } from "../../functions/brands/deleteBrand";
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { deleteProduct } from "../../functions/products/deleteProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";

async function test() {
  try {
    require("../../config/config").config("ah");

    const brands = [
      "Moxi Loves",
      "Caudalie",
      "E45",
      "Olos",
      "Geske",
      "Cosrx",
      "Tommy Hilfiger",
    ];

    for (const brandName of brands) {
      const brand = await getBrandByName(brandName);

      if (!brand) continue;

      const brandProducts = await getAllProducts({ brand_id: brand.id });
      const allOOS = await Promise.all(
        brandProducts.map(async (product) => {
          if (product.sku !== "" && product.inventory_level) return false;
          const variants = await getProductVariants(product.id);
          return !variants.some((v) => v.inventory_level);
        }),
      );

      // The .every() method is being used here to check if all elements
      // in the 'allOOS' array are true. The 'allOOS' array contains boolean
      // values indicating whether each product is out of stock (OOS).
      // If every element in this array is true, it implies that all products
      // associated with the brand are out of stock, hence the code proceeds to
      // delete all products and then the brand itself.
      if (allOOS.every((status) => status)) {
        console.log(`Deleting all products for ${brand.name}`);
        await Promise.all(
          brandProducts.map((product) => deleteProduct(product.id, true)),
        );
        console.log(`Deleting brand: ${brand.name}`);
        await deleteBrand(brand.id, true);
      } else {
        console.log(`Brand ${brand.name} has products. skipping...`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();
