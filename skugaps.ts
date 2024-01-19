import { ProductVariant } from "./functions/product-variants/ProductVariant";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductVariants } from "./functions/products/getProductVariants";
import { output } from "./scripts/utils/output";
import path from "path";

async function skugaps() {
  try {
    require("./config/config").config("ch");
    const chProducts = await getAllProducts();
    const chSKUs: ProductVariant[] = [];
    for (const product of chProducts) {
      const skus = await getProductVariants(product.id);
      skus.push(...skus);
      console.log(`added ${skus.length} skus ch`)
      // new Promise((r) => setTimeout(r, 1500))
    }

    require("./config/config").config("ha");
    const haProducts = await getAllProducts();
    const haSKUs: ProductVariant[] = [];
    for (const product of haProducts) {
      const skus = await getProductVariants(product.id);
      skus.push(...skus);
      console.log(`added ${skus.length} skus ha`)
      await new Promise((r) => setTimeout(r, 1500))
    }

    console.log(chSKUs.length, haSKUs.length, haSKUs.length > chSKUs.length);

    await output(path.resolve(__dirname, "chskus.csv"), chSKUs, true)
    await output(path.resolve(__dirname, "haskus.csv"), haSKUs, true)


  } catch (err: any) {
    console.log(err)
  }
}

skugaps();
