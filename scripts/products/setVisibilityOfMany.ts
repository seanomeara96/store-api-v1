require("../../config/config").config("bf");

import { setVisibilityOfMany } from "../../functions/products/setVisibilityOfMany";

const products = [
  { "Product ID": 8849 },
  { "Product ID": 8850 },
  { "Product ID": 8928 },
  { "Product ID": 8930 },
  { "Product ID": 8931 },
  { "Product ID": 8934 },
  { "Product ID": 8935 },
  { "Product ID": 8936 },
  { "Product ID": 8937 },
  { "Product ID": 8939 },
  { "Product ID": 8941 },
  { "Product ID": 8943 },
  { "Product ID": 8944 },
  { "Product ID": 8945 },
  { "Product ID": 8947 },
  { "Product ID": 8948 },
  { "Product ID": 8952 },
  { "Product ID": 8953 },
  { "Product ID": 8954 },
  { "Product ID": 8956 },
  { "Product ID": 8960 },
  { "Product ID": 8961 },
  { "Product ID": 8962 },
  { "Product ID": 8970 },
  { "Product ID": 8986 },
  { "Product ID": 9006 },
  { "Product ID": 9133 },
  { "Product ID": 9138 },
  { "Product ID": 9143 },
  { "Product ID": 9146 },
  { "Product ID": 9152 },
  { "Product ID": 9159 },
  { "Product ID": 9163 },
  { "Product ID": 9167 },
  { "Product ID": 9179 },
  { "Product ID": 9186 },
  { "Product ID": 9191 },
  { "Product ID": 9200 },
  { "Product ID": 9207 },
  { "Product ID": 9210 },
  { "Product ID": 9212 },
  { "Product ID": 9214 },
  { "Product ID": 9217 },
  { "Product ID": 9220 },
  { "Product ID": 9223 },
  { "Product ID": 9227 },
  { "Product ID": 9229 },
  { "Product ID": 9231 },
  { "Product ID": 9236 },
  { "Product ID": 9238 },
  { "Product ID": 9240 },
  { "Product ID": 9242 },
  { "Product ID": 9245 },
  { "Product ID": 9247 },
  { "Product ID": 9249 },
  { "Product ID": 9252 },
  { "Product ID": 9260 },
];

async function main() {
  try {
    const ids = products.map((p) => p["Product ID"]);
    await setVisibilityOfMany(ids, true);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}
main();
