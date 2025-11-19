import { parseHTML } from "linkedom";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";

interface config {
  key: string;
  productFilters: any;
  domain: string;
  swaps: { [key: string]: string };
}

const configs: config[] = [
  {
    key: "ch",
    productFilters: { "categories:in": "38" },
    domain: "https://caterhire.ie",
    swaps: {},
  },
  {
    key: "ha",
    productFilters: { "categories:in": "266" },
    domain: "https://hireall.ie",
    swaps: {
      "/blog/table-seating-and-linen-guide/": "/table-seating-and-linen-guide/",
    },
  },
];

async function check() {
  try {
    for (const config of configs) {
      require("../../config/config").config(config.key);
      const products = await getAllProducts(config.productFilters);
      const count = products.length;
      for (let i = 0; i < count; i++) {
        const product = products[i];

        let html = product.description;

        for (const swap in config.swaps) {
          if (html.includes(swap)) {
            html = html.replaceAll(swap, config.swaps[swap]);
            console.log(`replacing ${swap} with ${config.swaps[swap]}`);
          }
        }

        if (html !== product.description) {
          await updateProduct(product.id, { description: html });
          console.log(`updated`, config.key, product.id, product.name);
        }

        const { document } = parseHTML(html);
        const links = [...document.querySelectorAll("a")]
          .map((a) =>
            a
              .getAttribute("href")
              ?.replaceAll("%%GLOBAL_ShopPathSSL%%", config.domain)
          )
          .filter((link) => typeof link === "string");
        for (const link of links) {
          const res = await fetch(link);
          if (!res.ok)
            console.log(config.key, "not okay", link, res.status, product.sku);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

check();
