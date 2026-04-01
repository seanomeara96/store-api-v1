import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 1274; //640;
const ids = [];

const productIds = ids.map((row) => row["Product ID"]);
(async () => {
  const RATE_LIMIT_STATUS = 429;
  const RATE_LIMIT_DELAY_MS = 10_000;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    for (let index = 0; index < productIds.length; index++) {
      const productId = productIds[index];

      try {
        await addCatToProduct(productId, cat_id);
        console.log(`updated ${index + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status !== RATE_LIMIT_STATUS) continue;

        console.log("too many requests");
        await sleep(RATE_LIMIT_DELAY_MS);
        index--;
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
