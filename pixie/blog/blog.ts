import sqlite from "sqlite3";
import path from "path";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import { marked } from "marked";
import { htmlToText } from "html-to-text";
import { encode } from "gpt-3-encoder";
import { createBlog } from "../../functions/blogs/createBlog";
import { BlogPostCreationParams } from "../../functions/blogs/BlogPost";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { search } from "../../chat/embeddings/search-embeddings";
import { Product } from "../../functions/products/Product";

const db = new sqlite.Database(path.resolve(__dirname, "main.db"));

function getPostById(postId: string) {
  return new Promise((resolve, reject) =>
    db.get(`SELECT * FROM posts WHERE id = ?`, [postId], (err, row) =>
      err ? reject(err) : resolve(row)
    )
  );
}

function responseText(response: CreateCompletionResponse) {
  return response.choices[0].text;
}

require("../../config/config").config("px");

const postIds = [
  "157391",
  "157114",
  "156940",
  "156779",
  "156174",
  "155849",
  "154948",
  "154096",
  "153554",
  "153366",
  "153295",
  "152996",
  "152783",
  "152559",
  "152189",
  "151605",
  "151300",
  "151153",
  "150071",
  "149898",
  "149692",
  "149470",
  "149115",
  "148613",
  "148175",
  "147980",
  "147683",
  "145125",
  "144740",
  "143884",
  "143718",
  "143404",
  "143142",
  "142742",
  "142705",
  "142225",
  "141931",
  "141856",
  "141761",
  "141478",
  "141193",
  "141101",
  "140511",
  "140126",
  "139882",
  "139631",
  "139474",
  "139284",
  "138508",
  "137839",
  "137502",
  "137222",
  "137116",
  "136091",
  "135776",
  "135707",
  "135564",
  "134941",
  "134643",
  "133733",
  "133560",
  "132817",
  "132624",
  "132570",
  "132525",
  "132338",
  "131249",
  "131092",
  "130667",
  "130576",
  "130526",
  "130416",
  "123648",
  "119520",
  "115493",
  "115215",
  "115083",
  "112203",
  "110743",
  "107863",
  "106194",
  "101037",
  "99004",
  "88685",
  "86169",
  "79559",
  "79432",
  "77674",
  "75321",
  "71721",
  "62493",
  "60664",
  "60031",
  "57929",
  "50787",
  "50293",
  "50029",
  "46641",
  "43588",
  "42960",
  "42813",
  "42703",
  "42530",
  "41896",
  "41666",
  "41543",
  "36672",
  "30774",
  "29674",
  "28331",
  "24921",
  "24772",
  "24765",
  "24739",
  "23901",
  "23792",
  "23499",
  "23474",
  "23251",
  "23076",
  "22277",
  "21779",
  "20268",
  "16542",
  "12996",
  "7065",
  "4066",
  "3633",
  "3555",
  "1622",
  "768",
];

async function main() {
  const posts = [];
  // top 500 products
  const products = (await getAllProducts())
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 500);
  console.log(`received top ${products.length} products`);

  for (let i = 0; i < postIds.length; i++) {
    try {
      posts.push(await getPostById(postIds[i]));
    } catch (err: any) {
      console.log(err.response ? err.response.data : err);
      continue;
    }
  }
  const start = 7;
  const limit = 50;
  for (let i = start; i < limit; i++) {
    console.log(`writing post ${i} of ${limit - 1}`);
    try {
      await writeBlog(posts[i], products);
    } catch (err: any) {
      console.log(err.response ? err.response.data : err);
      continue;
    }
  }
}
main();

async function writeBlog(row: any, products: Product[]) {
  try {
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
      prompt: `Split this blog post """${content}""" into 5 or 6 separate paragraphs. Remove any shortcodes. Return them ONLY as VALID JAVASCRIPT array. Example: ["paragraph1", "paragraph2", "paragraph3"]`,
      max_tokens: 2000,
      temperature: 0,
    });
    const t1 = performance.now();
    console.log(`splitting content took ${(t1 - t0) / 1000} seconds.`);

    let paragraphs: string[];
    try {
      paragraphs = JSON.parse((response.data.choices[0].text as string).trim());
      if (!Array.isArray(paragraphs)) {
        throw "not an array";
      }
    } catch (err) {
      console.log(err);
      throw ("response from openai was not a js array. received instead: " +
        response.data.choices[0].text) as string;
    }

    const newParagraphs: string[] = [];

    // for each paragraph find relevant products for context
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];

      if (encode(newParagraphs.join("\n")).length > 1400) {
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
      prompt: `You are a very enthusiastic beauty and cosmetics content writer for https://pixieloves.ie. Rewrite this blog post so that it is informative and entertaining. Output in markdown format. Internal links follow the pattern: [Product Name](Product URL).
Blog Post:"""${draftBlog}"""`,
      max_tokens: 2000,
      temperature: 0,
    });

    const body = marked(postRewriteResponse.data.choices[0].text as string, {
      mangle: false,
      headerIds: false,
    });

    const titleResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me a title for this blog post: """${postRewriteResponse.data.choices[0].text}""". Do not enclose in quotes`,
      max_tokens: 2000,
      temperature: 0,
    });

    const title = responseText(titleResponse.data);

    try {
      require("../../config/config").config("px", "2");

      const params: BlogPostCreationParams = {
        title: title!,
        body: body,
        is_published: true,
        author: "Pixie Loves",
      };

      await createBlog(params);
      console.log("blog write success");
    } catch (err) {
      throw err;
    }
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
