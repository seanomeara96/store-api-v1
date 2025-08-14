import { caterhirePrompt } from "./chat/prompts";
import { generateProductDescription } from "./functions/chat/generateProductDescription";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";
import fs from "fs";
import path from "path";

const FILE_NAME = `ch-content-changes-table-service.json`;

function getChanges(): { sku: string; before: string; after: string }[] {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, FILE_NAME), {
      encoding: "utf-8",
    })
  );
}

function saveChange(change: {
  sku: string;
  before: string;
  after: string;
}): { sku: string; before: string; after: string }[] {
  const changes = getChanges();
  changes.push(change);
  fs.writeFileSync(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(changes),
    { encoding: "utf-8" }
  );
  return changes;
}

async function test() {
  try {
    const data: {
      sku: string;
      description: string;
      blogs?: string[];
      links?: string[];
      name?: string;
    }[] = []
    require("./config/config").config("ch");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];

      if (
        getChanges()
          .map((r) => r.sku)
          .includes(row.sku)
      ) {
        continue;
      }

      let product = await getProductBySku(row.sku);
      if (!product) {
        const products = await getAllProducts({ sku: row.sku });
        if (!products.length || products.length > 1) {
          fs.appendFileSync(
            path.resolve(__dirname, `table-service-errors.txt`),
            `no products (${products.length}) found on caterhire for sku ${row.sku}`,
            { encoding: "utf-8" }
          );
          continue;
        }
        product = products[0];
      }
      console.log(product.name);
      if (row.name) console.log(row.name);
      console.log(row.sku);

      let additionalContext = "";
      if (row.links && row.links.length) {
        additionalContext += ` Product/Category Links to include: ${JSON.stringify(
          row.links
        )}.`;
      }
      if (row.blogs && row.blogs.length) {
        additionalContext += ` Blog Posts to include: ${JSON.stringify(
          row.blogs
        )}.`;
      }
      const description = await generateProductDescription(
        row.description,
        additionalContext,
        caterhirePrompt
      );

      // update
      const updates: any = { description };
      if (row.name) updates.name = row.name;
      await updateProduct(product!.id, updates);

      saveChange({
        sku: row.sku,
        before: product!.description,
        after: description,
      });
    }
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}
test();
