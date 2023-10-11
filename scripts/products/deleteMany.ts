import { deleteProduct } from "../../functions/products/deleteProduct";

(async () => {
  require("../../config/config").config("px");

  const data = [
    { "Product ID": 2061 },
    { "Product ID": 2588 },
    { "Product ID": 2637 },
    { "Product ID": 2638 },
    { "Product ID": 2665 },
    { "Product ID": 2666 },
    { "Product ID": 2667 },
  ];

  for (const p of data) {
    try {
      await deleteProduct(p["Product ID"]);
      console.log("deleted");
    } catch (err) {
      console.log(err);
    }
  }
})();
