require("../../config/config").config("ch");
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";

const catId = 542;

const productIds = [
  { "Product ID": 270 },
  { "Product ID": 277 },
  { "Product ID": 288 },
  { "Product ID": 297 },
  { "Product ID": 351 },
  { "Product ID": 389 },
  { "Product ID": 744 },
  { "Product ID": 825 },
  { "Product ID": 1013 },
  { "Product ID": 1065 },
  { "Product ID": 1072 },
];

// convert product ids to number array
const ids = productIds.map((i) => Object.values(i)[0]);

async function main() {
  try {
    for (const id of ids) {
      await removeCatFromProduct(id, catId);
    }
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}
main();
