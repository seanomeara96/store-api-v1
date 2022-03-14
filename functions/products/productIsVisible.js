const { updateProduct } = require("./updateProduct");

const productIsVisible = (productId, is_visible) =>
  new Promise((resolve, reject) =>
    updateProduct(productId, {
      is_visible,
    })
      .then(resolve)
      .catch(reject)
  );

exports.productIsVisible = productIsVisible;
