import OpenAI from "openai";
import { getAllProducts } from "../functions/products/getAllProducts";
import { htmlToText } from "html-to-text";
import { updateProduct } from "../functions/products/updateProduct";
import { ChatCompletionMessageParam } from "openai/resources";
import { Database } from "sqlite3";
import path from "path";

const store: string = "ih"
require("../config/config").config(store);

const db = new Database(path.resolve(__dirname, store+"meta_description_backups.db"));

function createTable(): Promise<void> {
  return new Promise((resolve, reject) =>
    db.exec(
      /*SQL*/`CREATE TABLE IF NOT EXISTS changes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        product_name TEXT,
        old TEXT,
        new TEXT,
        change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
      (err) => (err ? reject(err) : resolve())
    )
  );
}

function insert(
  product_id: number,
  product_name: string,
  old_description: string,
  new_description: string
): Promise<void> {
  return new Promise((resolve, reject) =>
    db.run(
      /*SQL*/`INSERT INTO changes(product_id, product_name, old, new) VALUES(?,?,?,?)`,
      [product_id, product_name, old_description, new_description],
      (err) => (err ? reject(err) : resolve(undefined))
    )
  );
}

function checkIfUpdated(product_id: number): Promise<boolean> {
  return new Promise((resolve, reject) =>
    db.get(
      /*SQL*/`SELECT count(id) as count FROM changes WHERE product_id = ?`,
      [product_id],
      (err, res: any) => (err ? reject(err) : resolve(res.count > 0))
    )
  );
}

const openai = new OpenAI();
const model = "gpt-4o";
const { completions } = openai.chat;

async function main() {
  try {
    await createTable();

    const products = await getAllProducts();

    for (let i = 0; i < products.length; i++) {
      console.log(i, products.length);

      const product = products[i];

      const productIsUpdated = await checkIfUpdated(product.id);
      if (productIsUpdated) {
        continue;
      }

      let prompt
      if (store === "ah"){
        prompt = `You are an expert SEO focused content writer for an irish online cosmetics retailer at Allhair.ie who offer a wide range of luxury hair products with net day delivery anywhere in ireland.` 
      }

      if(store === "ih") {
        prompt = `You are an expert SEO focused content writer for an irish online retailer at InHealth.ie offering an extensive selection of products for different stages of pregnancy, post-pregnancy care, baby essentials, health monitors, and general wellness items. The website is known for its competitive prices, next-day delivery within Ireland, and a focus on customer satisfaction.`
      }

      if (!prompt) {
        throw new Error("no prompt supplied for store "+store)
      }

      const systemMsg: ChatCompletionMessageParam = {
        role: "system",
        content:prompt,
      };

      const userMsg: ChatCompletionMessageParam = {
        role: "user",
        content: `Write a high seo quality meta description of maximum 160 characters for the following product.
            name: ${product.name}
            description: ${htmlToText(product.description)}`,
      };

      const messages: ChatCompletionMessageParam[] = [systemMsg, userMsg];

      const completion = await completions.create({ messages, model });

      const meta_description = completion.choices[0].message.content;

      if (!meta_description) {
        throw new Error("Openai did not respond with a meta description");
      }

      console.log();
      console.log(product.meta_description);
      console.log(meta_description);
      console.log();

      await updateProduct(product.id, {
        meta_description,
      });

      await insert(
        product.id,
        product.name,
        product.meta_description,
        meta_description!
      );
    }
  } catch (err) {
    console.log(err);
  }
}

main();
