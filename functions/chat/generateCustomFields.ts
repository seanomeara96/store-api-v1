import { htmlToText } from "html-to-text";
import OpenAI from "openai";

export async function generateCustomFields(
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