import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";

const data = [{ sku: "5185" }];
async function exec() {
  try {
    for (const store of ["ih", "pb"]) {
      require("../../config/config").config(store);
      for (let i = 0; i < data.length; i++) {
        await new Promise((res) => setTimeout(res, 2000));
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
          inventory_tracking: "product",
        });
      }
    }
  } catch (err: unknown) {
    const e = err as any;
    console.log("errored", {
      name: e?.name,
      message: e?.message,
      stack: e?.stack,
      err: e,
      json: (() => {
        try {
          return JSON.stringify(e);
        } catch {
          return "[unserializable]";
        }
      })(),
      string: (() => {
        try {
          return String(e);
        } catch {
          return "[unstringifiable]";
        }
      })(),
    });
  }
}

exec();
