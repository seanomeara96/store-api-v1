const { getProductById } = require("./functions/products/getProductById");
const {
  getProductVariants,
} = require("./functions/products/getProductVariants");

require("./config/config").config("bf");

getProductById(4145).then((product) =>
  getProductVariants(product.id).then(
    (variants) => {
        product.variants = variants
        console.log(product.variants)
    }
  )
);
