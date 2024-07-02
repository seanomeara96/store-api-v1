import OpenAI from "openai";
import sqlite from "sqlite3";
import { getAllProducts } from "../functions/products/getAllProducts";
import { updateProduct } from "../functions/products/updateProduct";
import path from "path";
import { convert } from "html-to-text";
import { Product } from "../functions/products/Product";
import { marked } from "marked";
function pixiePrompt(productDescription: string) {
  return `You are Pixie, a content writer for the pixieloves beauty store. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
  'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
  
  <h3>Why I Love It:</h3>
  (only 3-5 key bullet-points about key product features)
  
  <h3>Pixie’s Guide for Use:</h3>
  (give a 2-5 point guide for use)
  
  <h3>Pixie's Picks:</h3>
  (If unable to recommend a particular product just make a general recommendation as to what to pair this product with)
  
  <h3>Answered by Pixie:</h3>
  (Answer a question or two that is typically asked about this type of product. Do not use list elements in this section. Format example: <strong>Question: Question goes here</strong><br /><span>Answer: Answer goes here</span><br/><br/>)
  '. Replace any instance of 'beautyfeatures.ie' with "pixieloves.ie". Remove all internal links. Unordered list-items only. Output in MARKUP format`;
}
function allhairPrompt(productDescription: string) {
  return `You are a content writer for the allhair haircare store. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
  'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
  
  <strong>For Hair That's…</strong><br/>
  (The type of hair this product is suitable for)
  
  <strong>What Does It Do?</strong>
  (give a 2-5 point guide on what this product does for your hair and it's benefits)

  <strong>How Do I Use It?</strong>
  (give a 2-5 point guide for use)
  
  <strong>A Little Tip:</strong><br/>
  (If unable to recommend a particular product just make a general recommendation as to what to pair this product with)
  
  <strong>One More Thing…</strong>
  (list a 2-3 key ingredients or useful information such as whether it's vegan, sulphate free etc.)
  '. Unordered list-items only. Output in MARKUP format`;
}

require("../config/config").config("ah");

function htmlToText(html: string) {
  return convert(html);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const db = new sqlite.Database(path.resolve(__dirname, "ahchanges.db"));

async function main() {
  try {
    await initDB();

    //const productsInAllHairDummyCategory = { "categories:in": 190 }
    let allProducts = await getAllProducts();

    allProducts = allProducts.filter(product => !product.description.includes("What Does It Do") && product.inventory_level)


    // const allProducts = await getAllProducts();

    /**
     * this checks the db to see if any products have been prepared for update
     * probably because of script restarting etc and not updating the same product twice
     */
    const dontHaveProductsToUpdate = !(await countAllProductIDs());
    /**if there are no products prepared for updating*/
    let count = 0;
    if (dontHaveProductsToUpdate) {
      for (const product of allProducts) {
        try {
          console.log(`preparing product ${product.id}`);
          await prepareProduct(product.id);
          count++
        } catch {
          throw new Error("could not prepare product");
        }
      }
    }

    console.log(`Prepared ${count} products for update`)

    /**
     * product ids for those that need update
     */
    const toUpdate: number[] = await getProductIdsNotUpdated();

    /**
     * map ids that need update to product objects
     */
    const products = allProducts.filter(function (product) {
      return toUpdate.includes(product.id);
    });


    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      /**
       * skip products with empty descriptions
       */
      if (product.description === "") {
        continue;
      }

      /**
       * remove html tags from content to keep token count low
       */
      const productDescription = htmlToText(product.description);
      console.log(`updating ${i + 1}/${products.length}`);
      console.log(
        `updating ${product.name} at ${product.custom_url.url}`,
        product.id
      );

      try {
        /**
         * save the old content for the product in case of need to revert
         */
        await saveOldContent(product);
        console.log("successfully saved old content");
      } catch (err) {
        console.log("failed to save old content");
      }

      /**
       * lets see how fast openai can respond
       */
      const start = performance.now();

      let completion;
      try {
        let response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "user", content: allhairPrompt(productDescription) },
          ],
        });

        completion = response.choices[0].message.content;
      } catch (err: any) {
        if (
          err.response.data.error &&
          err.response.data.error.type !== "server_error"
        ) {
          console.log(err.response.data.error);
          const { message, type } = err.response.data.error;
          /**
           * save error for review
           */
          await saveError(product, message, type);
        } else {
          /**
           * retry if server error
           */
          console.log(`server error occured, waiting 5 minutes`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5));
          i--;
        }

        continue;
      }

      const end = performance.now();

      console.log(`ChatGPT Execution time: ${(end - start) / 1000} s`);

      if (typeof completion !== "string" || completion == "") {
        throw new Error("somehting went wrong in response");
      }

      const text = completion;

      if (!text) {
        console.log("No text in chatgpt response");
        continue;
      }
      /**
       * convert from markdown back to html
       */
      const html = await marked(text);

      /**
       * try update the product
       */
      try {
        await updateProduct(product.id, {
          description: html,
        });
        console.log(`successfully updated`, product.name);
      } catch (err) {
        console.log(`Error updating product`, err);
        continue;
      }

      /**
       * try update the product status to "updated" and save the generated response jic
       */
      try {
        await setProductUpdatedStatus(product, true);
        console.log(`Set updated to true for product id:`, product.id);

        await saveNewContent(product, html);
        console.log(`Saved new content for product id:`, product.id);
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    db.close();
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
main();

function initDB() {
  return new Promise(function (resolve, reject) {
    const script = /*SQL*/ `CREATE TABLE IF NOT EXISTS changes (
      product_id INTEGER,
      updated BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      product_name TEXT,
      error_message TEXT,
      error_type TEXT
    );

    CREATE TABLE IF NOT EXISTS new_content(
      product_id INTEGER, 
      content TEXT
    );

    CREATE TABLE IF NOT EXISTS old_content(
      product_id INTEGER, 
      content TEXT
    );`;

    db.exec(script, (err) => (err ? reject(err) : resolve(undefined)));
  });
}

function saveError(product: any, message: string, type: string) {
  return new Promise(function (resolve) {
    db.run(
      /*SQL*/ `INSERT INTO errors (product_id, product_name, error_message, error_type) VALUES (?,?,?,?)`,
      [product.id, product.name, message, type],
      (err) => (err ? resolve(console.log(err)) : resolve(true))
    );
  });
}

function setProductUpdatedStatus(product: any, updated: boolean) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/ `UPDATE changes SET updated = ? WHERE product_id = ?`,
      [updated, product.id],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}

function saveNewContent(product: any, text: string) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/ `INSERT INTO new_content(product_id, content) VALUES(?, ?)`,
      [product.id, text],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}

function saveOldContent(product: Product) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/ `INSERT INTO old_content(product_id, content) VALUES (?, ?)`,
      [product.id, product.description],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}

function countAllProductIDs(): Promise<number> {
  return new Promise(function (resolve, reject) {
    db.get(`SELECT count(product_id) AS count FROM changes`, (err, row: any) =>
      err ? reject(err) : resolve(row.count as number)
    );
  });
}

function prepareProduct(product_id: number) {
  return new Promise(function (resolve, reject) {
    db.run(
      `INSERT INTO changes(product_id, updated) VALUES (?, ?)`,
      [product_id, false],
      (err) => (err ? reject(err) : resolve(undefined))
    );
  });
}

function getProductIdsNotUpdated(): Promise<number[]> {
  return new Promise(function (resolve, reject) {
    db.all(
      /*SQL*/ `SELECT product_id FROM changes WHERE updated = false`,
      function (err, rows) {
        if (err) {
          return reject(err);
        }

        let IDs: number[] = [];
        for (let i = 0; i < rows.length; i++) {
          IDs.push((rows[i] as { product_id: number }).product_id);
        }

        resolve(IDs);
      }
    );
  });
}
