require("../../config/config").config("bf");
import { updateProduct } from "../../functions/products/updateProduct";
const sort_orders = [
  { id: 6903, sort_order: 3620 },
  { id: 6901, sort_order: 4760 },
  { id: 6900, sort_order: 6120 },
  { id: 6904, sort_order: 6420 },
  { id: 6905, sort_order: 6910 },
  { id: 6902, sort_order: 8810 },
  { id: 6070, sort_order: 10150 },
  { id: 6871, sort_order: 13440 },
  { id: 6870, sort_order: 14770 },
  { id: 6867, sort_order: 14800 },
  { id: 6866, sort_order: 21330 },
  { id: 6869, sort_order: 21630 },
  { id: 6868, sort_order: 21635 },
  { id: 5879, sort_order: 21640 },
  { id: 6061, sort_order: 21645 },
  { id: 5497, sort_order: 21650 },
  { id: 4470, sort_order: 21655 },
  { id: 4471, sort_order: 21655 },
  { id: 4841, sort_order: 23330 },
  { id: 4842, sort_order: 29460 },
  { id: 4840, sort_order: 30620 },
  { id: 4843, sort_order: 33800 },
  { id: 4845, sort_order: 35200 },
  { id: 4844, sort_order: 35250 },
  { id: 5499, sort_order: 35300 },
  { id: 5496, sort_order: 35390 },
  { id: 5498, sort_order: 35395 },
  { id: 5612, sort_order: 35400 },
  { id: 5720, sort_order: 35405 },
  { id: 6163, sort_order: 35770 },
  { id: 4417, sort_order: 38380 },
  { id: 4694, sort_order: 39750 },
  { id: 4424, sort_order: 40870 },
  { id: 4715, sort_order: 43220 },
  { id: 4846, sort_order: 49300 },
  { id: 4639, sort_order: 51200 },
  { id: 4640, sort_order: 51540 },
  { id: 4059, sort_order: 52190 },
  { id: 4872, sort_order: 52740 },
  { id: 4871, sort_order: 57100 },
  { id: 5849, sort_order: 57480 },
];

async function main() {
  for (let i = 0; i < sort_orders.length; i++) {
    console.log(`${i + 1} / ${sort_orders.length}`);
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
