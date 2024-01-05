require("../../config/config").config("bf");

import { setVisibilityOfMany } from "../../functions/products/setVisibilityOfMany";

const products = [
  { "Product ID": 5843 },
  { "Product ID": 5844 },
  { "Product ID": 5845 },
  { "Product ID": 5846 },
  { "Product ID": 5847 },
  { "Product ID": 5848 },
  { "Product ID": 5849 },
  { "Product ID": 5850 },
];

async function main() {
  try {
    const ids  = products.map(p => p["Product ID"])
    await setVisibilityOfMany(ids, true);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}
main();
