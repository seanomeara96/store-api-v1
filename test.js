require("./config/config").config("pb");
const {getAllProducts}  = require("./functions/products/getAllProducts")
async function main(){
  const products = await getAllProducts();
  let wrongTitles = products.filter(({page_title}) => page_title.match(/inhealth/gi));
  console.log(wrongTitles.map(({id}) => id))

}

main();