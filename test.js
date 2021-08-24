require("./config/config").config("bf")
const { getProductById } = require("./products/getProductById");
// getProductById(5298).then(console.log).catch(console.log)
let product_id =5283 
getProductById(product_id).then(({option_set_id})=>{
  if(option_set_id){
    require("./config/config").store.get(`/catalog/products/${product_id}/variants`).then((data) => console.log(data.data))
  }
}).catch(console.log)