import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 1057;
const ids = [
  { "Product ID": 3404 },
  { "Product ID": 8503 },
  { "Product ID": 8634 },
  { "Product ID": 8356 },
  { "Product ID": 5878 },
  { "Product ID": 7370 },
  { "Product ID": 3785 },
  { "Product ID": 6693 },
  { "Product ID": 6753 },
  { "Product ID": 7026 },
  { "Product ID": 8647 },
  { "Product ID": 8014 },
  { "Product ID": 8091 },
  { "Product ID": 4588 },
  { "Product ID": 7038 },
  { "Product ID": 2054 },
  { "Product ID": 8355 },
  { "Product ID": 6422 },
  { "Product ID": 5880 },
  { "Product ID": 8588 },
  { "Product ID": 8491 },
  { "Product ID": 1772 },
  { "Product ID": 8629 },
  { "Product ID": 8645 },
  { "Product ID": 6387 },
  { "Product ID": 7102 },
  { "Product ID": 8648 },
  { "Product ID": 6131 },
  { "Product ID": 8676 },
  { "Product ID": 7351 },
  { "Product ID": 6980 },
  { "Product ID": 7505 },
  { "Product ID": 3610 },
  { "Product ID": 8610 },
  { "Product ID": 174 },
  { "Product ID": 8640 },
  { "Product ID": 6403 },
  { "Product ID": 2954 },
  { "Product ID": 5408 },
  { "Product ID": 8016 },
  { "Product ID": 8646 },
  { "Product ID": 8094 },
  { "Product ID": 7360 },
  { "Product ID": 8607 },
  { "Product ID": 7017 },
  { "Product ID": 1534 },
  { "Product ID": 7925 },
  { "Product ID": 8590 },
  { "Product ID": 8510 },
  { "Product ID": 8630 },
  { "Product ID": 8631 },
  { "Product ID": 7203 },
  { "Product ID": 5750 },
  { "Product ID": 5357 },
  { "Product ID": 2959 },
  { "Product ID": 8612 },
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
