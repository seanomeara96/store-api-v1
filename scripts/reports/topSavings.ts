
import { getAllProducts } from "../../functions/products/getAllProducts";
require("../../config/config").config("bf");


async function test() {
  try {
   const products = await getAllProducts({brand_id: 80})

   let highestAbsolute = 0;
   let highestRelative = 0;

   for(const product of products){
      let absolute = product.retail_price - product.sale_price
      if (absolute > highestAbsolute) highestAbsolute = absolute

      let relative = (absolute / product.retail_price) * 100 
      if (relative > highestRelative) highestRelative = relative
   }

   console.log(highestAbsolute)
   console.log(highestRelative)

  } catch (err) {
    console.log(err);
  }
}

test();
