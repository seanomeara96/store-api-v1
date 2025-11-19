import { deleteProduct } from "../../functions/products/deleteProduct";
require("../../config/config").config("px");
const data = [
  { "Product ID": 1617 },
  { "Product ID": 3382 },
  { "Product ID": 3383 },
  { "Product ID": 3384 },
  { "Product ID": 3387 },
  { "Product ID": 3398 },
  { "Product ID": 3399 },
  { "Product ID": 3401 },
  { "Product ID": 3402 },
  { "Product ID": 3403 },
  { "Product ID": 3410 },
  { "Product ID": 3422 },
  { "Product ID": 3424 },
  { "Product ID": 3468 },
  { "Product ID": 3481 },
  { "Product ID": 3482 },
  { "Product ID": 3483 },
];

async function deleteProducts() {
  for (let i = 0; i < data.length; i++) {
    try {
      const p = data[i];
      console.log(`deleting ${i + 1} of ${data.length}`);
      await deleteProduct(p["Product ID"], false);
      await delay(1500);
    } catch (err: any) {
      console.log(err.data ? err.data : err);
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

deleteProducts();
