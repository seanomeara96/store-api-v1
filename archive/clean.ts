
import { getAllProducts } from "../functions/products/getAllProducts";
import { updateProduct } from "../functions/products/updateProduct";



async function clean() {
  try {
    require("./config/config").config("bf");
    let products = await getAllProducts({
      "categories:in":982,
    });
    for (let i = 0; i < products.length;i++) {
      console.log(i, products.length)
      const product =  products[i]
      await updateProduct(product.id, {categories: product.categories.filter(id => ![11, 1031,983].includes(id))})
    }    
  } catch (err) {
    console.log(err);
  }
}

clean();
