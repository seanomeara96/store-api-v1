import path from "path"
import { output } from "../scripts/utils/output";
import { getAllProductVariants } from "../functions/products/getAllProductVariants";
import { getProductBySku } from "../functions/products/getProductBySKU";




async function main(){
  try {
    require("./config/config").config("ch")
    const chVars = await getAllProductVariants()
    require("./config/config").config("ha")
    const haVars = await getAllProductVariants()

    let data = []

    require("./config/config").config("ch")
    for(let i = 0; i < chVars.length; i++){
      const chVar = chVars[i]
      const found = haVars.find(v => v.sku === chVar.sku)
      if(!found) {
        const product = await getProductBySku(chVar.sku)
        if(!product) {
          throw `no product for ${chVar.sku}`
        }
        data.push({
          name: product.name,
          sku: chVar.sku,
          missing_from: "hireall",
        })
      }
    }

    require("./config/config").config("ha")
    for(let i = 0; i < haVars.length; i++){
      const haVar = haVars[i]
      const found = haVars.find(v => v.sku === haVar.sku)
      if(!found) {
        const product = await getProductBySku(haVar.sku)
        if(!product) {
          throw `no product for ${haVar.sku}`
        }
        data.push({
          name: product.name,
          sku: haVar.sku,
          missing_from: "caterhire",
        })
      }
    }

    await output(path.resolve(__dirname, "cross-check.csv"), data, true)
    
  } catch(err) {
    console.log(err)
  }
}

main()