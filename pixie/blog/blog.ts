import sqlite from "sqlite3";
import path from "path";
import { search } from "../../chat/embeddings/search-embeddings";
import { Configuration, OpenAIApi } from "openai";
import { getAllProducts } from "../../functions/products/getAllProducts";
const db = new sqlite.Database(path.resolve(__dirname, "main.db"));

require("../../config/config").config("px")

db.get(
  `SELECT * FROM posts WHERE categoryLabel LIKE "discover" LIMIT 1`,
  async function (err, row: any) {
    try {
      if (err) {
        throw err;
      }

      // top 500 products
      const products = (await getAllProducts())
        .sort((a, b) => a.sort_order - b.sort_order)
        .slice(0, 500);

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Split this content """${row.content}""" into separate sections/paragraphs and return as a JS array`,
        max_tokens: 2000,
        temperature: 0,
      });

      const paragraphs = JSON.parse(response.data.choices[0].text as string);
      for (let i = 0; i < paragraphs.length; i++) {
        const productIds = await search(paragraphs[i]);
        if (!productIds) {
          throw "no product ids";
        }
        const data = [];
        for (let ii = 0; ii < productIds.length; ii++) {
          const id = productIds[ii];
          const product = products.find((p) => p.id === id);
          if (product) {
            data.push(product.name);
          }
        }
        console.log(data)
        break;
      }
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  }
);
