import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

require("../../config/config").config("bf");

async function applyCustomFieldBySKU() {
  try {
    const data = [];

    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      const product = await getProductBySku(row.sku);
      if (!product) {
        console.log(`no product found for ${row.sku} expected ${row.name}`);
        continue;
      }
      await applyCustomField(product.id, "tag", "Selling Fast");
    }
  } catch (err) {
    console.log(err);
  }
}
applyCustomFieldBySKU();
