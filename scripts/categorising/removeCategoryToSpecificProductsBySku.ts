import { getProductBySku } from "../../functions/products/getProductBySKU";
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";
require("../../config/config").config("bf");

const SKUs = [];

async function processSKUs() {
  try {
    for (let i = 0; i < SKUs.length; i++) {
      const sku = SKUs[i]["Product Code/SKU"];
      try {
        const product = await getProductBySku(sku);
        if (!product) {
          console.log("no product for", sku);
          continue;
        }
        await removeCatFromProduct(product.id, 640);
        console.log(`updated ${i + 1} of ${SKUs.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise(function (resolve) {
            setTimeout(resolve, 5000);
          });
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

processSKUs();
