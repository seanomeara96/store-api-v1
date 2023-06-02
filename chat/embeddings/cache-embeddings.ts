import { createClient } from "redis";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { Product } from "../../functions/products/Product";
require("../../config/config").config("px");
const options = {
  url: process.env.REDIS_URL,
};

function top500(products: Product[]): Product[] {
  return products.sort((a, b) => a.sort_order - b.sort_order).slice(0, 500);
}

async function main() {
  const client = createClient(options);
  try {
    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();

    await client.flushAll();

    
    const products = top500(await getAllProducts());

    for (let i = 0; i < products.length; i++) {
      console.log(`${i} / ${products.length}`);
      const product = products[i];
      try {
        await client.json.SET("product:" + product.id, ".", {
          id: product.id,
          embedding: JSON.parse(product.search_keywords),
        });

        await new Promise((res) => setTimeout(res, 700));
      } catch (err) {
        console.log(err);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
  await client.disconnect();
}
main();
