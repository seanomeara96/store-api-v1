import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

const data = [
    { sku: "12942", cost_price: 5, sale_price: 6.85 },
    { sku: "12941", cost_price: 5, sale_price: 6.85 },
    { sku: "10272", cost_price: 8, sale_price: 10.95 },
    { sku: "12944", cost_price: 4.5, sale_price: 6.15 },
    { sku: "12945", cost_price: 6, sale_price: 8.2 },
    { sku: "12946", cost_price: 5, sale_price: 6.85 },
    { sku: "10274", cost_price: 7.5, sale_price: 10.25 },
    { sku: "12943", cost_price: 8, sale_price: 10.95 },
    { sku: "12947", cost_price: 6, sale_price: 8.2 },
    { sku: "10273", cost_price: 8, sale_price: 10.95 },
    { sku: "10271", cost_price: 12.5, sale_price: 17.1 },
  ];

async function main() {
  try {
    require("../../config/config").config("bf");
    for (let i = 0; i < data.length; i++) {
      console.log(i + 1, data.length);
      const row = data[i];
      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }
      await addCatToProduct(vars[0].product_id, 515);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
