import { getBrandByName } from "../../functions/brands/getBrandByName";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";

require("../../config/config").config("px");

async function applyDiscountToBrand() {
  try {
    const products = await getAllProducts({
    });

    if (!products) {
      return;
    }

    for (const product of products) {
      const variants = await getProductVariants(product.id);
      for (const v of variants) {
        if(!v.price) {
          v.price = product.price
          v.retail_price = product.price
        }
        // retail price possibly null
        v.sale_price = (v.price! || v.retail_price!) * (1 - 0.15);
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

        await updateProductVariant(product.id, v.id, {
          sale_price: v.sale_price,
        });
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  } catch (err) {
    console.log(err);
  }
}

applyDiscountToBrand();
