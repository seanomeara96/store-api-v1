import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bsk");

const cat_id = 17; //640;
const ids = [
  { "Product ID": 282 },
  { "Product ID": 304 },
  { "Product ID": 313 },
  { "Product ID": 321 },
  { "Product ID": 410 },
  { "Product ID": 425 },
  { "Product ID": 434 },
  { "Product ID": 451 },
  { "Product ID": 464 },
  { "Product ID": 506 },
  { "Product ID": 526 },
  { "Product ID": 528 },
  { "Product ID": 571 },
  { "Product ID": 663 },
  { "Product ID": 664 },
  { "Product ID": 674 },
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
