import { getAllProducts } from "./functions/products/getAllProducts"
import { getAllProductVariants } from "./functions/products/getAllProductVariants"
import { updateProduct } from "./functions/products/updateProduct"

require("./config/config").config("bf")

async function test(){
    try{
        const products = await getAllProducts({brand_id: 154})
        for(const product of products){
            const variants  = await getAllProductVariants(product.id)
            let toUpdate = false
            for(const v of variants){
                // current discount
                if (!v.sale_price || !v.price) continue
                if ((v.price - v.sale_price) / v.price > .26) {
                    continue
                }  
                toUpdate = true
            }

            if(toUpdate) {
                await updateProduct(product.id, {
                    categories: product.categories.filter(id => id !== 640)
                })
            }
        }

    } catch(err) {
        console.log(err)
    }
}

test()
