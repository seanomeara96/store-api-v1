import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

require("../../config/config").config("bf");

(async () => {
  try {
    const products = await getAllProducts({'categories:in': 55})
    for (let i = 0; i < products.length; i++) {
      const p_id = products[i].id
      try {
        await addCatToProduct(p_id, 640);
        console.log(`updated ${i + 1} of ${products.length}`);
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
