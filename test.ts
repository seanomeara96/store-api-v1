import { getAllProducts } from "./functions/products/getAllProducts";
import { JSDOM } from "jsdom";
import path from "path";
import fs from "fs";
function insertDomain(link: string, store: string): string {
  return link.replace(
    `%%GLOBAL_ShopPathSSL%%`,
    store === "ch" ? "https://caterhire.ie" : "https://hireall.ie"
  );
}

function getHrefValues(descriptionHTML: string) {
  const { document } = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${descriptionHTML}
</body>
</html>`).window;
  return Array.from(document.querySelectorAll("a")).map((a) => a.href);
}
async function foo() {
  try {
    for (let store of ["ch", "ha"]) {
      require("./config/config").config(store);
      const products = await getAllProducts();
      for (let i = 0; i < products.length; i++) {
        console.log(i, products.length);
        const product = products[i];
        const hrefs = getHrefValues(product.description);

        const links = hrefs.map((link) =>
          link.includes(`%%GLOBAL_ShopPathSSL%%`)
            ? insertDomain(link, store)
            : link
        );

        for (const link of links) {
          try {
            const res = await fetch(link);
            if (res.status === 404) {
              fs.appendFileSync(
                path.resolve(__dirname, "internal-link-404.csv"),
                `${store}\t${product.id}\t${product.name}\t${link}\n`
              );
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

foo();
