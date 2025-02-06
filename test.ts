import { getAllProducts } from "./functions/products/getAllProducts";

async function main() {
  try {
    let stores = ["ch", "ha"];
    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];
      require("./config/config").config(store);
      const data = [];
      const products = await getAllProducts();
      for (let j = 0; j < products.length; j++) {
        const p = products[j]
        if (
          p.is_visible &&
          (!p.page_title.length || !p.meta_description.length)
        ) {
          if(j < 5) {
            console.log(p.id, p.name)
          }
          data.push(p);
        }
        
      }
      console.log(store, data.length);
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

main();
