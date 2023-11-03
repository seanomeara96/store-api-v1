import { getAllProducts } from "./functions/products/getAllProducts";
import { updateProduct } from "./functions/products/updateProduct";

async function test() {
  require("./config/config").config("bf");
  const products = await getAllProducts({ brand_id: 280 });
  for (const product of products) {
    const name = product.name.replace(/Loreal Professionnel|L'Oreal Professionnel|Loreal/gi, "L'Oréal Professionnel").replace(/Kerastase/gi, "Kérastase");
    const description = product.description.replace(/Loreal Professionnel|L'Oreal Professionnel|Loreal/gi, "L'Oréal Professionnel").replace(/Kerastase/gi, "Kérastase");
    try {
      await updateProduct(product.id, {
        name,
        description,
      });
      console.log(`updated product`, product.sku, product.id)
    } catch (err) {
      console.log(err);
    }
  }
}

test();
