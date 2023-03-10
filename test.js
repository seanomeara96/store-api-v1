const { updateProductVariant } = require("./functions/product-variants/updateProductVariant");
const { getProductVariants } = require("./functions/products/getProductVariants");

require("./config/config").config("bf");

getProductVariants(4470).then(res => {
    console.log(res)
    updateProductVariant(4470, 5666, {
        price: 27
    }).catch(console.log) 
})
