import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const catId = 950;

const productIds = [
  { id: 3813, sale_price: 60 },
  { id: 5361, sale_price: 60 },
  { id: 3800, sale_price: 60 },
  { id: 3801, sale_price: 60 },
];
(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      const p_id = productIds[i].id;
      try {
        await addCatToProduct(p_id, catId);
        console.log(`updated ${i + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
