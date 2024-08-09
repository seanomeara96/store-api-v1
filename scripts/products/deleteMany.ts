import { deleteProduct } from "../../functions/products/deleteProduct";
require("../../config/config").config("ch");
const data = [
  { "Product ID": 187 },
  { "Product ID": 215 },
  { "Product ID": 273 },
  { "Product ID": 529 },
  { "Product ID": 614 },
  { "Product ID": 931 },
  { "Product ID": 963 },
  { "Product ID": 988 },
  { "Product ID": 1073 },
];
(async () => {
  for (let i = 0; i < data.length; i++) {
    try {
      const p = data[i];
      console.log(`deleting ${i + 1} of ${data.length}`);
      await deleteProduct(p["Product ID"]);
      await new Promise((res) => setTimeout(res, 1500));
    } catch (err: any) {
      console.log(err.data ? err.data : err);
    }
  }
})();
