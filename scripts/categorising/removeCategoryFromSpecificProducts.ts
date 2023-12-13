require("../../config/config").config("bf");
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";

const catId = 515;

const productIds = [
  { "Product ID": 6306 },
  { "Product ID": 2939 },
  { "Product ID": 3785 },
  { "Product ID": 6807 },
  { "Product ID": 3980 },
  { "Product ID": 5841 },
  { "Product ID": 6251 },
  { "Product ID": 6830 },
  { "Product ID": 5457 },
  { "Product ID": 3701 },
  { "Product ID": 3699 },
  { "Product ID": 3698 },
  { "Product ID": 4020 },
  { "Product ID": 3700 },
];

async function main() {
  for (let i = 0; i < productIds.length; i++) {
    let n = productIds[i];
    try {
      console.log(`removing cat from ${i + 1} of ${productIds.length}`);
      await removeCatFromProduct(n["Product ID"], catId);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (err) {
      console.log(err);
    }
  }
}
main();
