import { updateProduct } from "../../functions/products/updateProduct";

require("../../config/config").config("bf");
const sort_orders = [
  {
    id: 8777,
    name: "Alfaparf Semi Di Lino Diamond Exclusive Gift Set",
    sort_order: 10,
  },
];

async function main() {
  for (let i = 0; i < sort_orders.length; i++) {
    console.log(i + 1 + " / " + sort_orders.length);
    const row = sort_orders[i];
    try {
      await updateProduct(row.id, {
        sort_order: row.sort_order,
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
      continue;
    }
  }
}
main();
