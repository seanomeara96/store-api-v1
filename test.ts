import { updateProductVariant } from "./functions/product-variants/updateProductVariant";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductVariants } from "./functions/products/getProductVariants";


async function test() {
  try {
    require("./config/config").config("pb");
    for (const product of await getAllProducts()) {
      for (const variant of await getProductVariants(product.id)) {
        await updateProductVariant(product.id, variant.id, {
          retail_price: 0,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();
