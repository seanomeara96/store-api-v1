import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import fs from "fs";
import path from "path";
const warnings: any = [];

async function test() {
  const stores = ["bf", "bsk", "ah", "ih", "pb", "bs"];
  for (const store of stores) {
    try {
      require("./config/config").config(store);
      const vars = await getAllProductVariants();

      for (const v of vars) {
        if (v.sale_price === 0) {
          warnings.push({ store, variants: v });
        }
      }

      
    } catch (err) {
      console.log(err);
    }
  }
  fs.writeFileSync(
    path.resolve(__dirname, "sale-price-issues.json"),
    JSON.stringify(warnings),
    { encoding: "utf-8" }
  );
}
test();
