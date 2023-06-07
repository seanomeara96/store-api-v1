import { getAllProducts } from "../../functions/products/getAllProducts";
import { search } from "./search-embeddings";
import openai, { Configuration, OpenAIApi } from "openai";
require("../../config/config").config("px");

const query = "What do you reccomend for Dry hair, flaky scalp and itchiness";

async function main() {
  const products = await getAllProducts();

  const res = await search(query);

  console.log("res!.length",res!.length);

  if (res) {
    const contextProducts = [];
    for (const id of res) {
      const product = products.find((p) => p.id === id);
      if (product) {
        contextProducts.push(product);
      }
    }

    const contextText = contextProducts
      .map((p) =>
        JSON.stringify({
          name: p.name,
          description: p.description,
          price: p.sale_price,
          url: p.custom_url.url,
        })
      )
      .join("").replace(/\\n/gi, " ")

    const prompt = `You are a very enthusiastic pixieloves representative who loves to help prople. Given the following products from the beautyfeatures catalog answer the question and make recommendations. If you are unsure and the answer is not to be found in the provided information say "Sorry I dont know how to help with that"
    
        Context sections: ${contextText}
        
        Question:"""
        ${query}
        """`;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2000,
      temperature: 0,
    }).catch(err => console.log(err.response.data || err))

    console.log(response!.data.choices[0].text);

    return response!.data.choices[0].text;
  }
}

main();
