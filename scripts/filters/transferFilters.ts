const api = require("../../config/config");
import { applyCustomField } from "../../functions/custom-fields/applyCustomField";

import { applyManyCustomFields } from "../../functions/custom-fields/applyManyCustomFields";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductBySku } from "../../functions/products/getProductBySKU";
const fromStore = "bf";
const toStore = "ah";
async function transferFilters() {
  try {
    // get bf products
    api.config(fromStore);
    const srcProducts = await getAllProducts();
    for (let i = 0; i < srcProducts.length; i++) {
      const product = srcProducts[i];
      api.config(fromStore);
      const customFields = await getCustomFields(product.id);
      api.config(toStore);
      const destProduct = await getProductBySku(product.sku);
      if (destProduct) {
        for (let j = 0; j < customFields.length; j++) {
          const field = customFields[j];
          await applyCustomField(destProduct.id, field.name, field.value);
        }
      } else {
        console.log(
          `Product with SKU ${product.sku} not found in destination store.`,
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}
transferFilters();
