require("../../config/config").config("bf");
import { getProductById } from "../../functions/products/getProductById";
import { updateProduct } from "../../functions/products/updateProduct";
import { getPrices, percentageDiscount } from "./utils";


async function main() {
  const productIDs = [1];
  for (const id of productIDs) {
    try {
      const product = await getProductById(id);
      const prices = getPrices(product, percentageDiscount, 0.1);
      // return
      await updateProduct(id, {
        sale_price: prices.promo_price,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
main()