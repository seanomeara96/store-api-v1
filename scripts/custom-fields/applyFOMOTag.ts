import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

const data = [];
async function applyFOMOTag() {
  require("../../config/config").config("bf");
  const newTagValue = "limited stock";
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      const product = await getProductBySku(row.sku);
      if (!product) {
        console.log(`no product for ${row.sku}`);
        continue;
      }
      const customFields = await getCustomFields(product.id);
      const tag = customFields.find((cf) => cf.name === "tag");
      if (!tag) {
        // add new tag
        await applyCustomField(product.id, "tag", newTagValue);
        continue;
      }
      // update existing tag
      await updateCustomField(product.id, tag.id, tag.name, newTagValue);
    }
  } catch (err) {
    console.log(err);
  }
}

applyFOMOTag();
