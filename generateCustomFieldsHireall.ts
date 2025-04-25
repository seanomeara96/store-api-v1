import { generateCustomFields } from "./functions/chat/generateCustomFields";
import { applyManyCustomFields } from "./functions/custom-fields/applyManyCustomFields";
import { deleteCustomField } from "./functions/custom-fields/deleteCustomField";
import {
  CustomField,
  getCustomFields,
} from "./functions/custom-fields/getCustomFields";
import { getAllProducts } from "./functions/products/getAllProducts";
import { hireallCustomFieldNames } from "./hireall/customFieldNames";

import fs from "fs";
import path from "path";

function saveCustomFields(cf: CustomField[]) {
  fs.writeFileSync(
    path.resolve(__dirname, "ch-custom-field-backup.json"),
    JSON.stringify([...getSavedCustomFields(), ...cf]),
    { encoding: "utf-8" }
  );
}

function getSavedCustomFields(): CustomField[] {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "ch-custom-field-backup.json"), {
      encoding: "utf-8",
    })
  );
}

async function test() {
  try {
    require("./config/config").config("ha");

    const products = await getAllProducts({ "categories:in": 335 });
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      console.log(i, products.length);

      //const cf = await getCustomFields(product.id);

      const cf = await generateCustomFields(
        products[i].description,
        hireallCustomFieldNames.crockery
      );

      await applyManyCustomFields(product.id, cf)
    }
  } catch (err) {
    console.log(err);
  }
}
test();
