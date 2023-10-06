import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const productIds = [
  "7175",
  "7176",
  "7177",
  "7178",
  "7179",
  "7180",
  "7181",
  "7183",
  "7184",
  "7185",
  "7186",
  "7187",
  "7188",
  "7189",
  "7190",
  "7191",
  "7192",
  "7193",
  "7194",
  "7195",
  "7205",
  "7206",
  "7208",
  "7209",
  "7210",
  "7211",
  "7212",
  "7213",
  "7214",
  "7215",
  "7216",
  "7217",
  "7221",
];
(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      const p_id = productIds[i];
      try {
        await addCatToProduct(parseInt(p_id), 517);
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
