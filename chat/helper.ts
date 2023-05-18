import sqlite from "sqlite3";
import { getAllProducts } from "../functions/products/getAllProducts";
import path from "path";
import { updateProduct } from "../functions/products/updateProduct";

require("../config/config").config("px");

const db = new sqlite.Database(path.resolve(__dirname, "./changes.db"));

async function main() {
  try {
    const products = await getAllProducts({
      brand_id: 62,
    });

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      console.log(`${i + 1}/${products.length}`);

      const oldContent:string = await new Promise(function (resolve, reject) {
        db.get(
          "SELECT content FROM old_content WHERE product_id = ?",
          [product.id],
          (err, row: any) => (err ? reject(err) : resolve(row.content))
        );
      });

      if (!oldContent.length){
        console.log(`something went wrong fetching old content for ${product.id}: "${oldContent}"`)
      }

      try {
        await updateProduct(product.id, {
          description: oldContent,
        });
        console.log(`product updated`)
      } catch (err) {
        console.log(`could not update product ${product.id}`, err);
      }

      await new Promise(function (resolve, reject) {
        db.run(
          "UPDATE changes SET updated = false WHERE product_id = ?",
          [product.id],
          (err) => (err ? reject(err) : resolve(true))
        );
      });
    }

    db.close();
  } catch (err) {
    console.log(err);
  }
}

main();
