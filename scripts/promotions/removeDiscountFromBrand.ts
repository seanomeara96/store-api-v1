import { getBrandByName } from "../../functions/brands/getBrandByName";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";

require("../../config/config").config("hie");

async function applyDiscountToBrand() {
  try {
    const brand = await getBrandByName("Haakaa");

    if (!brand) return;

    console.log(brand.name);

    const products = await getAllProducts({ brand_id: brand.id });

    if (!products) {
      return;
    }

    for (const product of products) {
      const variants = await getProductVariants(product.id);
      for (const v of variants) {
        if(v.sale_price !== v.price) {
          await updateProductVariant(product.id, v.id, {
            sale_price: v.price,
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

applyDiscountToBrand();
