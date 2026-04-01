import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

const rows = [
  {
    sku: "BLRICE",
    name: "Case size",
    value: 10,
  },
  {
    sku: "CG003",
    name: "Pack Size",
    value: 25,
  },
  {
    sku: "1000910",
    name: "Case size",
    value: 10,
  },
  {
    sku: "24B",
    name: "Pack Size",
    value: 10,
  },
  {
    sku: "1000575A",
    name: "Pack size",
    value: 1,
  },
  {
    sku: "VV37",
    name: "Pack size",
    value: 10,
  },
  {
    sku: "VV34",
    name: "Pack Size",
    value: 10,
  },
  {
    sku: "VV36",
    name: "Pack size",
    value: 10,
  },
  {
    sku: "VV35",
    name: "Pack size",
    value: 10,
  },
  {
    sku: "1000034",
    name: "Case size",
    value: 10,
  },
];

async function updateCustomFieldBySku() {
  try {
    for (const store of ["ch", "ha"]) {
      require("../../config/config").config(store);
      for (let i = 0; i < rows.length; i++) {
        console.log(i, rows.length);
        const row = rows[i];
        const product = await getProductBySku(row.sku);
        if (!product) {
          console.log(`no product for ${row.sku} in store ${store}`);
          continue;
        }

        const field = (await getCustomFields(product.id)).find(
          (f) => f.name === row.name,
        );
        if (!field) {
          console.log(
            `no field exists ${row.name} for product ${row.sku} in store ${store}`,
          );
          continue;
        }

        await updateCustomField(
          product.id,
          field.id,
          field.name,
          String(row.value),
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

updateCustomFieldBySku();
