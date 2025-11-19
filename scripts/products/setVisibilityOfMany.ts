require("../../config/config").config("bf");

import { setVisibilityOfMany } from "../../functions/products/setVisibilityOfMany";

const products = [
  { "Product ID": 9242 },
  { "Product ID": 9245 },
  { "Product ID": 9247 },
  { "Product ID": 9249 },
  { "Product ID": 9252 },
  { "Product ID": 9260 },
];

function extractProductIds() {
  const ids = [];
  for (const product of products) {
    ids.push(product["Product ID"]);
  }
  return ids;
}

async function main() {
  try {
    const ids = extractProductIds();
    await setVisibilityOfMany(ids, true);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}
main();
