import { addCatToProduct } from "./functions/products/addCatToProduct";
import { getAllProducts } from "./functions/products/getAllProducts";

const haircare_category = 12;
const haircare_clearance_catageory = 899;

const skincare_category = 11;
const skincare_clearance_catageory = 900;

const makeup_category = 13;
const makeup_clearance_catageory = 902;

const fragrance_category = 598;
const fragrance_clearance_catageory = 903;

async function test() {
  try {
    require("./config/config").config("bf");

    const clearance_products = await getAllProducts({"categories:in": 515})

    console.log("sorting products")
    
    for(const product of clearance_products){
      if(product.categories.includes(haircare_category)){
        await addCatToProduct(product.id, haircare_clearance_catageory)
      }

      if(product.categories.includes(skincare_category)){
        await addCatToProduct(product.id, skincare_clearance_catageory)
      }

      if(product.categories.includes(makeup_category)){
        await addCatToProduct(product.id, makeup_clearance_catageory)
      }

      if(product.categories.includes(fragrance_category)){
        await addCatToProduct(product.id, fragrance_clearance_catageory)
      }
    }

    console.log("DONE")

  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}

test();
