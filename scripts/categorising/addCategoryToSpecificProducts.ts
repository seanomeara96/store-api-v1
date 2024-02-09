import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 960;
const productIdString = `7195
7221
7772
7773
7774
7776
7777
7778
7779
7781`;

const productIds = productIdString.split("\n").map((i) => parseInt(i));

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
