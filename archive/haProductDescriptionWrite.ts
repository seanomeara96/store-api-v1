import fs from "fs";
import path from "path";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductVariants } from "./functions/products/getProductVariants";
import { getProductBySku } from "./functions/products/getProductBySKU";
import OpenAI from "openai";
import { htmlToText } from "html-to-text";
import { marked } from "marked";
import { hireallPrompt } from "./chat/prompts";
import { CustomField, getCustomFields } from "./functions/custom-fields/getCustomFields";
import { updateProduct } from "./functions/products/updateProduct";

const tableHireCustomFields = [
    "Case Size",
    "Colour",
    "Table top colour",
    "Leg colour",
    "Material",
    "Dimensions",
    "Suitable for",
    "Seats"
]

function addUpdatedItem(id: number): number[] {
  const ids = getUpdatedItems();
  ids.push(id);
  fs.writeFileSync(
    path.resolve(__dirname, "ha-updated-products.json"),
    JSON.stringify(ids),
    { encoding: "utf-8" }
  );
  return ids;
}

function getUpdatedItems(): number[] {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "ha-updated-products.json"), {
      encoding: "utf-8",
    })
  );
}

async function main() {
  try {
    // const data: { [key: string]: { catID: number; products: Product[] } } = {
    //   ch: { catID: 34, products: [] },
    //   ha: { catID: 277, products: [] },
    // };
    require("./config/config").config("ch");
    const products = (
      await getAllProducts({
        "categories:in": 34,
      })
    ).filter((p) => p.is_visible);
    for (let i = 0; i < products.length; i++) {
      console.log(`fetching variants`, i, products.length);
      const product = products[i];
      require("./config/config").config("ch");
      const variants = await getProductVariants(product.id);
      for (const { sku } of variants) {
        require("./config/config").config("ha");
        const destProduct = await getProductBySku(sku);
        if (!destProduct) {
          throw `expected dest product for ${sku}`;
        }
        if (getUpdatedItems().includes(destProduct.id)) {
          console.log(`skipped ${destProduct.name} because already updated`);
          continue;
        }
        const customFields = await getCustomFields(destProduct.id)
        const newDescription = await contentStructure(product.description, customFields)
        
        console.log(product.description)
        console.log(`---- BEFORE ----`)
        console.log(newDescription)
        console.log(`---- AFTER ----`)

        await updateProduct(destProduct.id, {description: newDescription})

        console.log(`updated  ${destProduct.id}`);
        addUpdatedItem(destProduct.id);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();

export async function contentStructure(
  productDescription: string,
  customFields: CustomField[],
): Promise<string> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: hireallPrompt(htmlToText(productDescription), {customFields}),
        },
      ],
    });

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}

export async function customFields(
  productDescription: string,
  fieldNames: string[]
): Promise<{name: string; value: string}[]> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "user",
          content: `using the following product description 
          '''${htmlToText(productDescription)}''' 
          generate the applicable custom fields from this list of approved field names '''${fieldNames.join(", ")}'''
          If a field/value is not applicable or not specified do not include it in your response
          `,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { 
            name: "custom_fields_schema",
            schema: {
              $schema: "https://json-schema.org/draft/2020-12/schema",
              type: "object", // <-- FIXED: The root must be an object
              properties: {
                fields: { // <-- Wrap the array inside an object property
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      value: { type: "string" },
                    },
                    required: ["name", "value"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["fields"],
              additionalProperties: false,
            },
            strict: true,
          },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : { fields: [] };

    return parsed.fields; // Extract the array from the object
  } catch (err: any) {
    throw err;
  }
}
