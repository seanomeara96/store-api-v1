require("../../config/config").config("px");
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";

async function main() {
  try {
    const products = await getAllProducts();
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      try {
        await updateProduct(p.id, { price: p.retail_price });
        console.log("updated", p.id);
      } catch (err: any) {
        console.log(err.response ? err.response.data : err);
        continue;
      }
    }
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
main();
