import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
require("../../config/config").config("bf");

const SKUs = [
  "13258",
  "13259",
  "13260",
  "13261",
  "13267",
  "13268",
  "13269",
  "13270",
  "13271",
  "13272",
  "13273"
];

(async () => {
  try {
    for (let i = 0; i < SKUs.length; i++) {
      const sku = SKUs[i];
      try {
        const product = await getProductBySku(sku);
        await addCatToProduct(product.id, 514);
        console.log(`updated ${i + 1} of ${SKUs.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
