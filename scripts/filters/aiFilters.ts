import OpenAI from "openai";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { convert } from "html-to-text";
import { applyCustomField } from "../../functions/custom-fields/applyCustomField";

require("./config/config").config("bf");

const hairTypeFilters = [
  { "Hair Type": "All Types" },
  {
    "Hair Type": "Coloured",
  },
  {
    "Hair Type": "Curly",
  },
  {
    "Hair Type": "Damaged",
  },
  {
    "Hair Type": "Dry",
  },
  {
    "Hair Type": "Fine",
  },
  {
    "Hair Type": "Hair Loss/Thinning",
  },
  {
    "Hair Type": "Oily",
  },
];

const hairConcernFilters = [
  {
    "Hair Concerns": "Anti Dandruff",
  },
  {
    "Hair Concerns": "Dehydrated Hair",
  },
  {
    "Hair Concerns": "Hair Breakage",
  },
  {
    "Hair Concerns": "Heat & Chemical Damage",
  },
  {
    "Hair Concerns": "Itchy & Sensitive Scalps",
  },
  {
    "Hair Concerns": "Oily Scalp",
  },
];

const productTypeFilters = [
  {
    "Product Type": "Paraben Free",
  },
  {
    "Product Type": "Sulphate Free",
  },
  {
    "Product Type": "Vegan",
  },
];

function htmlToText(html: string) {
  return convert(html);
}

async function test() {
  try {
    let products = await getAllProducts({ brand_id: 48 });

    const filters = [
      ...hairTypeFilters,
      ...hairConcernFilters,
      ...productTypeFilters,
    ];

    const filterString = JSON.stringify(filters);

    for (const product of products) {
      product.description = htmlToText(product.description);
    }

    // do some hand holding here
    products = products.filter((p) =>
      p.description.toLowerCase().includes("paraben")
    );

    console.log("products.length", products.length);
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const start = performance.now();

    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      console.log(`updateing ${i + 1} of ${products.length}`, product.id);

      const messageContent = `Return only a javascript array of custom fields from these options 
      """${filterString}"""
      that are highly relevant (Important: Make no assumptions and only supply custom fields with a high level of confidence that they are relevant) to this product and is supported by the product description 
      """${product.description}""".
      Make sure to include the full js object e.g [{"Hair Type": "All Types"}]. """Only return the js array"""`;

      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "user",
            content: messageContent,
          },
        ],
        temperature: 0,
        max_tokens: 1000,
      });

      if (!response.choices[0].message) {
        console.log("no response");
        return;
      }

      console.log(response.choices[0].message.content);

      const regexPattern = /\[\s*{[\s\S]*?}\s*\]/;
      const matchArray =
        response.choices[0].message.content!.match(regexPattern);

      if (matchArray) {
        console.log("Match found");
        const extractedArray = JSON.parse(matchArray[0]);
        for (let ii = 0; ii < extractedArray.length; ii++) {
          const field = extractedArray[ii];
          const name = Object.keys(field)[0] as string;
          const value = Object.values(field)[0] as string;
          try {
            await applyCustomField(product.id, name, value);
          } catch (err: any) {
            console.log(
              err.response ? err.response.data : err.data ? err.data : err
            );
          }
        }
      } else {
        console.log("No match found");
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();
