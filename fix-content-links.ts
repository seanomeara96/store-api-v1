import { getAllProducts } from "./functions/products/getAllProducts";
import { parse } from "node-html-parser";
import { Database } from "sqlite3";
import { updateProduct } from "./functions/products/updateProduct";

require("./config/config").config("ah");

async function test() {
  try {
    const db = new Database(`allhair-broken-links.db`);

    db.run(
      `CREATE TABLE IF NOT EXISTS links(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          product_name TEXT,
          link TEXT
      );`,
      function (err) {
        throw err;
      }
    );

    const products = await getAllProducts();

    for (const product of products) {
      const elem = parse(product.description);
      const links = elem.querySelectorAll(`[href]`);
      for (const link of links) {
        let href = link.getAttribute("href");
        if (href) {
          const res = await fetch(
            href.replace(`%%GLOBAL_ShopPathSSL%%`, `https://allhair.ie`)
          );
          if (!res.ok) {
            console.log(href);
            let fixedLink;

            if (href.includes(`/Kérastase`)) {
              fixedLink = href.replace(`/Kérastase`, `/kerastase`);
            }

            if (fixedLink) {
              await updateProduct(product.id, {
                description: product.description.replace(href, fixedLink),
              });
            } else {
              await new Promise((resolve, reject) =>
                db.run(
                  `INSERT INTO links(product_id, product_name, link) VALUES(?,?,?)`,
                  [product.id, product.name, href],
                  (err) => (err ? reject(err) : resolve(undefined))
                )
              );
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();
