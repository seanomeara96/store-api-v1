import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const productIds = [
  5069,
  5070,
  5455,
  5460,
  7023
];


(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      const p_id = productIds[i];
      try {
        await addCatToProduct(p_id, 952);
        console.log(`updated ${i + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
