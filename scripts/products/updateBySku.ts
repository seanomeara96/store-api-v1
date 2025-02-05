import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

const data = [
  {
    name: "Alfaparf Semi Di Lino Density Christmas Gift Set 2024",
    sku: "20648",
    price: 44.9,
    sale_price: 32.9,
  },
 
];

async function exec(storeInitials: string) {
  require("../../config/config").config(storeInitials);
  for (let i = 0; i < data.length; i++) {
    try {
      console.log(i + 1, data.length);
      const row = data[i];
      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }
      await updateProduct(vars[0].product_id, { name: row.name });
    } catch (err) {
      console.log(err);
    }
  }
}

async function main() {
  for (const store of ["px"]) {
    await exec(store);
  }
}

main();
