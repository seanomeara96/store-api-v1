import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
require("../../config/config").config("bf");

const SKUs = [
  "101602",
  "104403",
  "105012",
  "10643",
  "110105",
  "110207",
  "110624",
  "110625",
  "110631",
  "11070",
  "110700",
  "110905",
  "11186",
  "11244",
  "11248",
  "11335",
  "113511",
  "11990",
  "12169",
  "12210",
  "12304",
  "12745",
  "12748",
  "12759",
  "13145",
  "13148",
  "13149",
  "13150",
  "13153",
  "13285",
  "41059",
  "41065",
  "5891",
  "6082",
  "6508",
  "7170",
  "7215",
  "7603",
  "7998",
  "8037",
  "8069",
  "8220",
  "8523",
  "8755",
  "9219",
  "9234",
  "9306",
  "9559",
  "9666",
  "9794",
  "9834",
];

(async () => {
  try {
    for (let i = 0; i < SKUs.length; i++) {
      const sku = SKUs[i];
      try {
        const product = await getProductBySku(sku);
        await addCatToProduct(product.id, 686);
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
