require("../../config/config").config("bf");
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";

const catId = 640;

const productIds = [];

// convert product ids to number array
const ids = productIds.map((i) => Object.values(i)[0]);

async function main() {
  try {
    for (let i = 0; i < ids.length; i++) {
      console.log(i, ids.length);
      const id = ids[i];
      await removeCatFromProduct(id, catId);
    }
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}
main();
