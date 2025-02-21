import { getAllProductImages, ProductImage } from "./functions/images/getAllProductImages";
import { getAllProducts } from "./functions/products/getAllProducts";
import { Product } from "./functions/products/Product";

interface ProductWithImages extends Product {
  Images: ProductImage[]
}

async function test() {
  try {
    require("./config/config").config("ch");

  } catch (err) {
    console.log(err);
  }
}
test();
