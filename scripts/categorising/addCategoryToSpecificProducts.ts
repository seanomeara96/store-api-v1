import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("ch");

const cat_id = 541;
const ids = [
  { "Product ID": 119 },
  { "Product ID": 203 },
  { "Product ID": 232 },
  { "Product ID": 462 },
  { "Product ID": 564 },
  { "Product ID": 719 },
  { "Product ID": 731 },
  { "Product ID": 1087 },
];

const productIds = ids.map((i) => Object.values(i)[0]);

(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      try {
        await addCatToProduct(productIds[i], cat_id);
        console.log(`updated ${i + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 10000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
