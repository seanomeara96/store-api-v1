import { getBrandByName } from "./functions/brands/getBrandByName";
import { getAllProducts } from "./functions/products/getAllProducts";
import { Product } from "./functions/products/Product";
import { updateProduct } from "./functions/products/updateProduct";

const store = "ih";

async function test() {
  try {
    require("./config/config").config(store);

    const products = await getAllProducts();
    for (const product of products) {
      if (new Date(`1/1/2024`) < new Date(product.date_created)){
        product.categories.push(1494)
        await updateProduct(product.id, {
          categories: product.categories
        })
      }
     
    }
  } catch (err) {
    console.log(err);
  }
}

test();

function currentDiscount(product: Product) {
  if (!product.sale_price) {
    return 0;
  }
  return (product.price - product.sale_price) / product.price;
}
