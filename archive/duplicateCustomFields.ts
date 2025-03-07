import path from "path"
import { getCustomFields } from "../functions/custom-fields/getCustomFields";
import { getAllProducts } from "../functions/products/getAllProducts";
import { output } from "../scripts/utils/output";

async function test() {
  try {
    require("./config/config").config("ha")
    const products = await getAllProducts();

    const problems = []

    for(let i = 0;  i < products.length;i++){
      console.log(i, products.length)
      const customFields = await getCustomFields(products[i].id)
      let obj:{[key:string]: number} = {}
      for(const field of customFields){
        if(!obj[field.name]){
          obj[field.name] = 1
        } else {
          obj[field.name]++
        }
      }


      if (Math.max(...Object.values(obj)) > 1) {
        const p = products[i]
        problems.push({
          id: p.id,
          name: p.name,
          sku: p.sku,
          duplicate_names: (function(){
            const names: string[] = []
            for(const name in obj){
              if(obj[name] > 1){
                names.push(name)
              }
            }
            return names
          })()
        })
      }
    }

    output(path.resolve(__dirname, "products-with-duplicate-custom-fields-hireall.csv"), problems, true)
  } catch (err) {
    console.log(err);
  }
}

test();
