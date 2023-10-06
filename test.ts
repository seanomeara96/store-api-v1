import { getAllProducts } from "./functions/products/getAllProducts";

import fs from "fs";
import path from "path";

let out = `name\n`;

async function test() {
  require("./config/config").config("px");
  const products = await getAllProducts({ sku: "" });
  for (const product of products) {
    out += product.name + "\n";
  }

  fs.writeFileSync(path.resolve(__dirname, "px-issues.csv"), out, {
    encoding: "utf-8",
  });
}

test();
