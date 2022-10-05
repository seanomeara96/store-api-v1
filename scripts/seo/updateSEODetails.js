require("./config/config").config("ha");
const {updateProduct} = require("./functions/products/updateProduct");

const updates = [];

(async ()=>{

  for(const x of updates){
    await updateProduct(x.id, {
      page_title: x.page_title,
      meta_description: x.meta_description
    }).catch(console.log)
    console.log(`updated product ${x.id}`)
  }

})()