import { Configuration, OpenAIApi } from "openai";
import sqlite from "sqlite3";
import { getAllProducts } from "../functions/products/getAllProducts";
import { updateProduct } from "../functions/products/updateProduct";
import path from "path";
import { convert } from "html-to-text";
require("../config/config").config("px");

function htmlToText(html: string) {
  const options = {
    wordwrap: 130,
    // ...
  };
  return convert(html, options);
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const db = new sqlite.Database(path.resolve(__dirname, "changes.db"));

async function main() {
  try {
    const toUpdate: number[] = await getProductIdsNotUpdated();

    const allProducts = await getAllProducts();

    const products = allProducts.filter((p) => toUpdate.includes(p.id));

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productDescription = htmlToText(product.description);
      console.log(`updating ${i + 1}/${products.length}`);
      console.log(
        `updating ${product.name} https://pixieloves.ie${product.custom_url.url}`,
        product.id
      );

      try {
        await saveOldContent(product);
        console.log("successfully saved old content");
      } catch (err) {
        console.log("failed to save old content");
      }

      const start = performance.now();
      let response;

      try {
        response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: /*html  */ `You are Pixie, a content writer for the pixieloves beauty store. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
        'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:

        <h3>Why I Love It:</h3>
        (only 3-5 key bullet-points about key product features)
        
        <h3>Pixie’s Guide for Use:</h3>
        (give a 2-5 point guide for use)
        
        <h3>Pixie's Picks:</h3>
        (If unable to recommend a particular product just make a general recommendation as to what to pair this product with)
        
        <h3>Answered by Pixie:</h3>
        (Answer a question or two that is typically asked about this type of product. Do not use list elements in this section. Format example: <strong>Question: Question goes here</strong><br /><span>Answer: Answer goes here</span><br/><br/>)
        '. Replace any instance of 'beautyfeatures.ie' with "pixieloves.ie". Output as HTML.`,
          temperature: 0,
          max_tokens: 2000,
        });
      } catch (err: any) {
        if (
          err.response.data.error &&
          err.response.data.error.type !== "server_error"
        ) {
          console.log(err.response.data.error);
          const { message, type } = err.response.data.error;

          await saveError(product, message, type);
        } else {
          console.log(`server error occured, waiting 5 minutes`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5));
          i--;
        }

        continue;
      }

      const end = performance.now();
      console.log(`ChatGPT Execution time: ${(end - start) / 1000} s`);

      const text = response.data.choices[0].text;

      if (!text) {
        console.log("No text in chatgpt response");
        continue;
      }

      try {
        await updateProduct(product.id, {
          description: text,
        });
        console.log(`successfully updated`, product.name);
      } catch (err) {
        console.log(`Error updating product`, err);
        continue;
      }

      try {
        await setProductUpdatedStatus(product, true);
        console.log(`Set updated to true for product id:`, product.id);

        await saveNewContent(product, text);
        console.log(`Saved new content for product id:`, product.id);
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    db.close();
  } catch (err: any) {
    console.log(err.response.data);
  }
}
main();
function saveError(product: any, message: string, type: string) {
  return new Promise(function (resolve) {
    db.run(
      /*SQL*/`INSERT INTO errors (product_id, product_name, error_message, error_type) VALUES (?,?,?,?)`,
      [product.id, product.name, message, type],
      (err) => (err ? resolve(console.log(err)) : resolve(true))
    );
  });
}
function setProductUpdatedStatus(product: any, updated: boolean) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/`UPDATE changes SET updated = ? WHERE product_id = ?`,
      [updated, product.id],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}
function saveNewContent(product: any, text: string) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/`INSERT INTO new_content(product_id, content) VALUES(?, ?)`,
      [product.id, text],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}

function saveOldContent(product: any) {
  return new Promise(function (resolve, reject) {
    db.run(
      /*SQL*/`INSERT INTO old_content(product_id, content) VALUES (?, ?)`,
      [product.id, product.description],
      (err) => (err ? reject(err) : resolve(true))
    );
  });
}

function getProductIdsNotUpdated(): Promise<number[]> {
  return new Promise(function (resolve, reject) {
    db.all(
      /*SQL*/`SELECT product_id FROM changes WHERE updated = false`,
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
