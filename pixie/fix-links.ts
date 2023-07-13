import { Configuration, OpenAIApi } from "openai";
import { getAllProducts } from "../functions/products/getAllProducts";
import { Database } from "sqlite3";
import { updateProduct } from "../functions/products/updateProduct";
import path from "path";
import { Product } from "../functions/products/Product";
require("../config/config").config("px");

const db = new Database(path.join(__dirname, "./main.db"));

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

function initTable() {
  return new Promise(function (resolve, reject) {
    db.run(
      /*sql*/ `CREATE TABLE IF NOT EXISTS content_update(product_id INTEGER, old_content TEXT, new_content TEXT)`,
      function (err) {
        if (err) return reject(err);
        resolve(undefined);
      }
    );
  });
}

function getUpdatedProductIDs(): Promise<number[]> {
  return new Promise(function (resolve, reject) {
    db.all(
      /*SQL*/ `SELECT product_id FROM content_update`,
      function (err, rows) {
        if (err) return reject(err);
        resolve((rows as { product_id: number }[]).map((r) => r.product_id));
      }
    );
  });
}

function saveUpdate(
  product_id: number,
  old_content: string,
  new_content: string
) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/ `INSERT INTO content_update(product_id, old_content, new_content) VALUES(?,?,?)`,
      [product_id, old_content, new_content],
      function (err) {
        if (err) return reject(err);
        resolve(undefined);
      }
    );
  });
}

function fixLinks(html: string): Promise<string> {
  return new Promise(async function (resolve, reject) {
    try {
      const content = `The links were embedded in this content incorrectly:"""${html}""" Can you fix these links. You can derive the anchor text from the slug of the url in the href attribute.`;
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content }],
      });
      if (
        !response ||
        !response.data ||
        !response.data.choices ||
        !response.data.choices[0].message
      ) {
        throw "error with response";
      }
      resolve(response.data.choices[0].message.content || "");
    } catch (err) {
      reject(err);
    }
  });
}

function notUpdatedAndHasIssueFilter(
  updatedProductList: number[],
  content_issue: string
) {
  return function (product: Product) {
    return (
      !updatedProductList.includes(product.id) &&
      product.description.includes(content_issue)
    );
  };
}

async function main() {
  await initTable();
  const updatedProductIDs = await getUpdatedProductIDs();
  const products = await getAllProducts();
  const notUpdatedAndHasIssue = notUpdatedAndHasIssueFilter(updatedProductIDs, "[http");
  const issueProducts = products.filter(notUpdatedAndHasIssue);
  for (let i = 0; i < issueProducts.length; i++) {
    const product = issueProducts[i];
    try {
      const fixedContent = await fixLinks(product.description);
      await updateProduct(product.id, { description: fixedContent });
      await saveUpdate(product.id, product.description, fixedContent);
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
main();
