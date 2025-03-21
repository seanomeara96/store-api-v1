import path from "path"
import { output } from "../scripts/utils/output";
import { getAllProductVariants } from "../functions/products/getAllProductVariants";
import { getProductBySku } from "../functions/products/getProductBySKU";

const storeA = "ch"
const storeB = "ha"


async function main(){
  try {
    require("../config/config").config(storeA)
    const chVars = await getAllProductVariants()
    require("../config/config").config(storeB)
    const haVars = await getAllProductVariants()

    let data = []

    require("../config/config").config(storeA)
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
          is_visible: product.is_visible?"TRUE":"FALSE",
        })
      }
    }

    require("../config/config").config(storeB)
    for(let i = 0; i < haVars.length; i++){
      const haVar = haVars[i]
      const found = chVars.find(v => v.sku === haVar.sku)
      if(!found) {
        const product = await getProductBySku(haVar.sku)
        if(!product) {
          throw `no product for ${haVar.sku}`
        }
        data.push({
          name: product.name,
          sku: haVar.sku,
          missing_from: "caterhire",
          is_visible: product.is_visible?"TRUE":"FALSE",
        })
      }
    }

    await output(path.resolve(__dirname, `${storeA}-${storeB}-cross-check.csv`), data, true)
    
  } catch(err) {
    console.log(err)
  }
}

main()