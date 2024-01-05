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
    for (const product of srcProducts) {
      api.config(fromStore);
      const customFields = await getCustomFields(product.id);
      api.config(toStore);
      const destProduct = await getProductBySku(product.sku);
      for (const field of customFields) {
        await applyCustomField(destProduct.id, field.name, field.value);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
transferFilters();
