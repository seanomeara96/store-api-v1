import { Database } from "sqlite3";
import { getProductById } from "./functions/products/getProductById";
import { updateProduct } from "./functions/products/updateProduct";

const db = new Database("ih-faq.db");

function removeFaqSection(html: string): string {
  // matches from <!-- FAQ_START --> through <!-- FAQ_END -->, including newlines
  return html.replace(/<!-- FAQ_START -->[\s\S]*?<!-- FAQ_END -->/, "").trim();
}

async function main() {
  try {
    require("./config/config").config("ih");

    // 1. Find all FAQ rows that we previously inserted (colum = true)
    const faqRows: { product_id: number }[] = await new Promise((res, rej) => {
      db.all(
        "SELECT product_id FROM faqs WHERE colum = true",
        (err, rows: any) => err ? rej(err) : res(rows)
      );
    });

    for (const { product_id } of faqRows) {

        console.log(product_id)

      // 2. Fetch current product
      const product = await getProductById(product_id);
      if (!product.description.includes("<!-- FAQ_START -->")) {
        console.log(`Product ${product_id}: no FAQ found, skipping.`);
        continue;
      }

      // 3. Remove the FAQ block
      const cleaned = removeFaqSection(product.description);

      // 4. Update the product description
      await updateProduct(product_id, { description: cleaned });
      console.log(`Product ${product_id}: FAQ section removed.`);

      // 5. Optionally mark in your faqs table that it’s been removed
      await new Promise((res, rej) => {
        db.run(
          "UPDATE faqs SET colum = false WHERE product_id = ?",
          [product_id],
          (err) => err ? rej(err) : res(undefined)
        );
      });

      
    }

    console.log("All done.");
    db.close();
  } catch (err) {
    console.error(err);
  }
}

main();
