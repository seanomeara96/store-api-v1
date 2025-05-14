/*
believe I am to ouput the custom fields for the chairhire category on hireall
for human review

*/

import path from "node:path";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
async function exportCustomFields() {
  try {
    require("../../config/config").config("ha")
    const data: {
      product_id: number;
      product_name: string;
      custom_field_id: number;
      custom_field_name: string;
      custom_field_value: string;
    }[] = [];
    const products = await getAllProducts({ "categories:in": [268].join(",") });
    for (let i = 0; i < products.length; i++) {
      console.log(`fetching custom fields`, i, products.length);
      const product = products[i];
      const customFields = await getCustomFields(product.id);
      for (let j = 0; j < customFields.length; j++) {
        const customField = customFields[j];
        data.push({
          product_id: product.id,
          product_name: product.name,
          custom_field_id: customField.id,
          custom_field_name: customField.name,
          custom_field_value: customField.value,
        });
      }
    }
    output(path.resolve(__dirname, "custom-field-export.csv"), data, true)
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}
exportCustomFields()