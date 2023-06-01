require("../../config/config").config("px");

import { Configuration, OpenAIApi } from "openai";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { convert } from "html-to-text";
import { updateProduct } from "../../functions/products/updateProduct";

const options = {
  wordwrap: 130,
};

function totext(html: string): string {
  return convert(html, options);
}

async function main() {
  try {
    const products = await getAllProducts();

    for (let i = 44; i < products.length; i++) {
      const product = products[i];
      console.log(`${i} / ${products.length} | id = ${product.id}`);

      try {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const input = JSON.stringify({
          name: product.name,
          description: totext(product.description),
          url: product.custom_url.url,
          price: product.sale_price,
        }).replace(/\n/g, " ");

        const embeddingResponse = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input,
        });

        if (embeddingResponse.status !== 200) {
          throw embeddingResponse;
        }

        const [responseData] = embeddingResponse.data.data;

        try {
          await updateProduct(product.id, {
            search_keywords: JSON.stringify(responseData.embedding),
          });
        } catch (err) {
          throw err;
        }

        // await new Promise((res) => setTimeout(res, 700));
      } catch (err) {
        throw err;
      }
    }
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      console.log(err.response.data.errors);
    }
  }
}
main();
