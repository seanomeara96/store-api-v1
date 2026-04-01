import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { deleteCustomField } from "../../functions/custom-fields/deleteCustomField";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

const data = [
  { sku: "20617", name: "Isoclean Luxury Trio Collection" },
  {
    sku: "20611",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20612",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20613",
    name: "Isoclean Professional Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20613",
    name: "Isoclean Professional Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20613",
    name: "Isoclean Professional Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20614",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20614",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20611",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20616",
    name: "Isoclean Professional Brush Cleaner Gift Set 525ml",
  },
];
async function applyFOMOTag() {
  require("../../config/config").config("bf");
  const newTagValue = "buy one get one free";
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
      const tags = customFields.filter((cf) => cf.name === "tag");
      if (!tags.length) {
        // add new tag
        await applyCustomField(product.id, "tag", newTagValue);
        continue;
      }
      if (tags.length > 1) {
        for (let ii = 1; ii < tags.length; ii++) {
          await deleteCustomField(product.id, tags[ii].id);
        }
      }
      // update existing tag
      await updateCustomField(
        product.id,
        tags[0].id,
        tags[0].name,
        newTagValue,
      );
    }
  } catch (err) {
    console.log(err);
  }
}

applyFOMOTag();
