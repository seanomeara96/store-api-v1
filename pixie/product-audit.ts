require("../config/config").config("px");
import { Configuration, OpenAIApi } from "openai";
import { Database } from "sqlite3";
import path from "path";
import { getAllProducts } from "../functions/products/getAllProducts";
import { convert } from "html-to-text";
import { Product } from "../functions/products/Product";
const db = new Database(path.join(__dirname, "main.db"));

function initDB() {
  return new Promise(function (resolve, reject) {
    db.exec(
      `CREATE TABLE IF NOT EXISTS content_audit(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            misrepresentation_confidence_score INTEGER NOT NULL
        )`,
      (err) => (err ? reject(err) : resolve(undefined))
    );
  });
}

function getPreviouslyScoredProducts(): Promise<number[]> {
  return new Promise(function (resolve, reject) {
    db.all(`SELECT product_id FROM content_audit`, function (err, rows) {
      if (err) return reject(err);
      resolve(rows.map((row: any) => row.product_id) as number[]);
    });
  });
}

function storeResults(
  product_id: number,
  misrepresentation_confidence_score: number
) {
  return new Promise(function (resolve, reject) {
    db.run(
      `INSERT INTO content_audit(product_id, misrepresentation_confidence_score) VALUES (?, ?)`,
      [product_id, misrepresentation_confidence_score],
      (err) => (err ? reject(err) : resolve(undefined))
    );
  });
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
  try {
    await initDB();
    const scoredProductIds: number[] = await getPreviouslyScoredProducts();
    const previouslyScored = (p: Product) => !scoredProductIds.includes(p.id);
    const productsToScore = (await getAllProducts()).filter(previouslyScored);

    for (let i = 0; i < productsToScore.length; i++) {
      console.log(`product ${i + 1} of ${productsToScore.length}`);
      const product = productsToScore[i];
      const description = convert(product.description);
      const questionContent = `Respond only with an integer. On a scale from 1 to 10 (10 being most confident) how confident are you that this product content does not violate the google merchant center's misrepresentation policy?
        Product content: """${description}"""`;
      let response;
      try {
        response = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [{ role: "user", content: questionContent }],
        });
      } catch (err) {
        i--;
        await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
        continue;
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const score = parseInt(response!.data!.choices![0].message!.content!);
      await storeResults(product.id, score);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
