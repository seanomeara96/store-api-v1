require("./config/config").config("ss");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { updateProduct } = require("./functions/products/updateProduct");
getAllProducts().then(main);

async function main(products) {
  for(const p of products){
    await updateProduct(p.id, {description: p.description.replace('<h2>Description</h2>', "")}).catch(console.log)
  }
  console.log("done")
}
