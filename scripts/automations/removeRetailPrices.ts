import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

require("../../config/config").config("ch");

async function main(){
  try{
    const productVariants = await getAllProductVariants()
    for(let  i = 0 ; i < productVariants.length; i++){
      console.log(i, productVariants.length)
      await new Promise(function(res){setTimeout(res, 1500)})
      const pv = productVariants[i]
      if (pv.price && pv.price > 0 ) {
        await updateProductVariant(pv.product_id, pv.id, {retail_price: 0})
      }
    }
  } catch(err) {
    console.log(err)
  }
}

main()