import sqlite from "sqlite3";
import { getAllProducts } from "../functions/products/getAllProducts";
import path from "path"

require("../config/config").config("px");

const db = new sqlite.Database(path.resolve(__dirname, "./changes.db"));

async function main() {
  try {
    const res = await new Promise(function (resolve, reject) {
      db.run(
        `CREATE TABLE IF NOT EXISTS changes(product_id INTEGER, updated BOOLEAN)`,
        (err) => (err ? reject(err) : resolve("Table exists"))
      );
    });

    console.log(res);

    const products = await getAllProducts();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      console.log(
        `${i + 1}/${products.length} | storing status of ${product.name}`,
        product.id
      );

      try {
        await new Promise(function (resolve, reject) {
          db.run(
            `INSERT INTO changes(product_id, updated) VALUES( ?, false)`,
            [product.id],
            (err) => (err ? reject(err) : resolve(true))
          );
        });
      } catch (err) {
        console.log(err);
        continue;
      }
    }

    db.close()
  } catch (err) {
    console.log(err);
  }
}

main();
