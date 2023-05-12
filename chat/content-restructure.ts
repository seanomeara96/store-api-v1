import { Configuration, OpenAIApi } from "openai";
import sqlite from "sqlite3";
import { getAllProducts } from "../functions/products/getAllProducts";
require("../config/config").config("px");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//const db = new sqlite.Database("changes.db");

async function main() {
  try {
    const products = await getAllProducts({
      brand_id: 62,
    });

    const start = performance.now();
    
    for (let i = 0; i < 1 /*products.length*/; i++) {
      const product = products[i];
      console.log(`updating ${i + 1}/${products.length}`);
      console.log(`updating ${product.name}`, product.id);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `rewrite this content "${product.description}" so that it conforms to the following structure: 
        'Product Overview:

        Why I Love It: 
        (only 3-5 key points/product features)
        
        Pixie’s Guide for Use:
        
        Hero Ingredients:  
        
        Pixie's Picks:
        
        Answered by Pixie:
        (Answer a question that is typically asked about this type of product)
        '. Output as HTML`,
        temperature: 0,
        max_tokens: 2000,
      });

      const text = response.data.choices[0].text;

      console.log(text);
    }

    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
  } catch (err: any) {
    console.log(err.response.data);
  }
}
main();
