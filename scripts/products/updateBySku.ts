import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";

const data = [
  { l: 27, w: 27, h: 111, weight: 50, sku: "10354a" },
  { l: 33, w: 33, h: 98, weight: 66, sku: "9045" },
  { l: 34, w: 34, h: 95, weight: 70, sku: "9050" },
];

async function exec() {
  require("../../config/config").config("bf");
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i + 1, data.length);
      const row = data[i];
      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        console.log(
          `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`,
        );
        continue;
      }
      console.log(`updating ${row.sku}`);
      await updateProduct(vars[0].product_id, {
        width: row.w,
        depth: row.l,
        length: row.l,
        height: row.h,
        weight: row.weight,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

exec();
