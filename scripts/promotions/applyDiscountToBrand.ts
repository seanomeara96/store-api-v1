import { getBrandByName } from "../../functions/brands/getBrandByName";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";
import { getPrices, percentageDiscount } from "./utils";

require("../../config/config").config("bf");

(async () => {
  const brand = await getBrandByName("Kérastase");

  if (!brand) return;

  const products = await getAllProducts({ brand_id: brand.id }).catch(
    console.log
  );

  if (!products) {
    return;
  }

  for (const product of products) {
    const variants = await getProductVariants(product.id);
    for (const v of variants) {
      v.sale_price = v.retail_price * (1 - 0.10);
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
  }
})();
