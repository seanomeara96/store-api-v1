import { getBrandByName } from "../../functions/brands/getBrandByName";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";

const store = "bf";
require("../../config/config").config(store);

async function applyDiscountToBrand() {
  try {
    /**const brand = await getBrandByName("Act + Acre");

    if (!brand) return;

    console.log(brand.name);

    { brand_id: brand.id } */
    const products = await getAllProducts();

    if (!products) {
      return;
    }

    for (const product of products) {
      const variants = await getProductVariants(product.id);
      for (const v of variants) {
        const initialSalePrice = v.sale_price;
        // retail price possibly null
        v.sale_price = v.price * (1 - 0.1);
        // Convert to cents
        v.sale_price = v.sale_price * 100;

        // Calculate 5-cent increments
        v.sale_price = v.sale_price / 5;

        // Round to the nearest whole number
        v.sale_price = Math.round(v.sale_price);

        // Convert back to cents
        v.sale_price = v.sale_price * 5;

        // Convert back to euro
        v.sale_price = v.sale_price / 100;

        if (initialSalePrice !== v.sale_price) {
          await updateProductVariant(product.id, v.id, {
            sale_price: v.sale_price,
            retail_price: v.price,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

applyDiscountToBrand();
