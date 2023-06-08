import sqlite from "sqlite3";
import path from "path";
import { search } from "../../chat/embeddings/search-embeddings";
import { Configuration, OpenAIApi } from "openai";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { marked } from "marked";
import { createBlog } from "../../functions/blogs/createBlog";
import { BlogPostCreationParams } from "../../functions/blogs/BlogPost";
import { htmlToText } from "html-to-text";
import { encode } from "gpt-3-encoder";
const db = new sqlite.Database(path.resolve(__dirname, "main.db"));

require("../../config/config").config("px");
const sqlQuery = /*SQL*/ `SELECT * FROM posts WHERE categoryLabel LIKE "discover" LIMIT 1 OFFSET 2`;

db.get(sqlQuery, main);

async function main(err: Error, row: any) {
  try {
    if (err) {
      throw err;
    }

    // top 500 products
    const products = (await getAllProducts())
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, 500);
    console.log(`received top ${products.length} products`);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    console.log(`requesting content be split`);
    const t0 = performance.now();

    const content = row.content
      .replace(/\[(.+)\]/gi, "")
      .replace(/[\n]+/gi, " ")
      .trim();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Split this blog post """${content}""" into 5 or 6 separate paragraphs and return them ONLY as an JSON array`,
      max_tokens: 2000,
      temperature: 0,
    });
    const t1 = performance.now();
    console.log(`splitting content took ${(t1 - t0) / 1000} seconds.`);

    let paragraphs: string[];
    try {
      paragraphs = JSON.parse(response.data.choices[0].text as string);
      if (!Array.isArray(paragraphs)) {
        throw "not an array";
      }
    } catch (err) {
      throw ("response from openai was not a js array. received instead: " +
        response.data.choices[0].text) as string;
    }

    const newParagraphs: string[] = [];

    // for each paragraph find relevant products for context
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];

      if (encode(newParagraphs.join("\n")).length > 1700) {
        break;
      }

      const relaventProductIds = await search(paragraph);
      if (!relaventProductIds) {
        throw "no product ids returned";
      }

      const data = [];
      for (let ii = 0; ii < relaventProductIds.length; ii++) {
        const id = relaventProductIds[ii];
        const product = products.find((p) => p.id === id);
        if (product) {
          const { name, description, sale_price, custom_url } = product;
          data.push({
            name,
            description: htmlToText(description),
            sale_price,
            url: custom_url.url,
          });
        }
      }
      const context = JSON.stringify(data).replace(/\n+/gi, " ");

      const rewriteResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a very enthusiastic beauty and cosmetics content writer who loves to write blogs for https://pixieloves.ie, an online store for haircare, skincare and other beauty products. Write a paragraph similar to the paragraph provided using instead products in the supplied context sections. Output in markdown format and internally link products in the following manner """[Product Name](https://pixieloves.ie/product-url/)"""

Context sections:${context}
      
Paragraph:"""
${paragraph.replace(/\n+/gi, " ")}
"""`,
        max_tokens: 1000,
        temperature: 0,
      });

      newParagraphs.push(rewriteResponse.data.choices[0].text as string);
    }

    const draftBlog = newParagraphs.join("\n");

    const postRewriteResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a very enthusiastic beauty and cosmetics content writer for https://pixieloves.ie. Rewrite this blog post so that it reads exceptionally well. Output in markdown format. Blog Post:"""${draftBlog}"""`,
      max_tokens: 2000,
      temperature: 0,
    });

    try {
      require("../../config/config").config("px", "2");

      const params: BlogPostCreationParams = {
        title: row.title,
        body: marked(postRewriteResponse.data.choices[0].text as string),
      };

      await createBlog(params);
    } catch (err) {
      throw err;
    }
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
