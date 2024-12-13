import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 1090;
const ids = [
  { "Product ID": 7176 },
  { "Product ID": 7175 },
  { "Product ID": 1534 },
  { "Product ID": 1772 },
  { "Product ID": 7180 },
  { "Product ID": 8588 },
  { "Product ID": 8777 },
  { "Product ID": 8659 },
  { "Product ID": 8772 },
  { "Product ID": 8778 },
  { "Product ID": 8612 },
  { "Product ID": 8590 },
  { "Product ID": 8776 },
  { "Product ID": 3551 },
  { "Product ID": 2674 },
  { "Product ID": 8630 },
  { "Product ID": 724 },
  { "Product ID": 8631 },
  { "Product ID": 8642 },
  { "Product ID": 8591 },
  { "Product ID": 6980 },
  { "Product ID": 722 },
  { "Product ID": 8657 },
  { "Product ID": 2058 },
  { "Product ID": 8771 },
  { "Product ID": 8645 },
  { "Product ID": 8653 },
  { "Product ID": 8638 },
  { "Product ID": 8655 },
  { "Product ID": 7188 },
  { "Product ID": 8656 },
  { "Product ID": 7208 },
  { "Product ID": 6205 },
  { "Product ID": 5443 },
  { "Product ID": 8589 },
  { "Product ID": 6979 },
  { "Product ID": 5442 },
  { "Product ID": 721 },
  { "Product ID": 8629 },
  { "Product ID": 8613 },
  { "Product ID": 8769 },
  { "Product ID": 5872 },
  { "Product ID": 6303 },
  { "Product ID": 8768 },
  { "Product ID": 5445 },
  { "Product ID": 8770 },
  { "Product ID": 8643 },
  { "Product ID": 7204 },
  { "Product ID": 5417 },
  { "Product ID": 8650 },
  { "Product ID": 6366 },
  { "Product ID": 5440 },
  { "Product ID": 5444 },
  { "Product ID": 8637 },
  { "Product ID": 4928 },
  { "Product ID": 5873 },
  { "Product ID": 725 },
  { "Product ID": 726 },
  { "Product ID": 3354 },
  { "Product ID": 3547 },
  { "Product ID": 3558 },
  { "Product ID": 8596 },
  { "Product ID": 3602 },
  { "Product ID": 3603 },
  { "Product ID": 3606 },
  { "Product ID": 3607 },
  { "Product ID": 4178 },
  { "Product ID": 4212 },
  { "Product ID": 4213 },
  { "Product ID": 4216 },
  { "Product ID": 4929 },
  { "Product ID": 5106 },
  { "Product ID": 5315 },
  { "Product ID": 5317 },
  { "Product ID": 5319 },
  { "Product ID": 5320 },
  { "Product ID": 5322 },
  { "Product ID": 8635 },
  { "Product ID": 5641 },
  { "Product ID": 5642 },
  { "Product ID": 5719 },
  { "Product ID": 6128 },
  { "Product ID": 6129 },
  { "Product ID": 6130 },
  { "Product ID": 6206 },
  { "Product ID": 6363 },
  { "Product ID": 6367 },
  { "Product ID": 6430 },
  { "Product ID": 6456 },
  { "Product ID": 6457 },
  { "Product ID": 6458 },
  { "Product ID": 6459 },
  { "Product ID": 6460 },
  { "Product ID": 6981 },
  { "Product ID": 7177 },
  { "Product ID": 7183 },
  { "Product ID": 7184 },
  { "Product ID": 7186 },
  { "Product ID": 7187 },
  { "Product ID": 7206 },
  { "Product ID": 7216 },
  { "Product ID": 7484 },
  { "Product ID": 3564 },
  { "Product ID": 5441 },
  { "Product ID": 8628 },
  { "Product ID": 8632 },
  { "Product ID": 8651 },
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
