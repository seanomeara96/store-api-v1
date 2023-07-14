require("../../config/config").config("pb");
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";

async function main() {
  try {
    const products = await getAllProducts();
    for (const p of products) {
      try {
        await updateProduct(p.id, { price: p.retail_price });
        console.log("updated", p.id);
      } catch (err: any) {
        console.log(err.response.data);
        continue;
      }
    }
  } catch (err: any) {
    console.log(err.response.data);
  }
}
main();
