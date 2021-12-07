// add max 5 limit to products
require("./config/config").config("bf");
const {
  getProductsByBrand,
} = require("./functions/products/getProductsByBrand");
const { updateProduct } = require("./functions/products/updateProduct");

const applyMaxOrderQty = (product_id, qty) =>
  new Promise((resolve, reject) =>
    updateProduct(product_id, { order_quantity_maximum: qty })
      .then(resolve)
      .catch(reject)
  );

const applyMaxFiveLimit = (products) =>
  new Promise((resolve, reject) => {
    Promise.allSettled(products.map(({ id }) => applyMaxOrderQty(id, 5)))
      .then(resolve)
      .catch(reject);
  });

getProductsByBrand("Kerastase").then((products) => {
    applyMaxFiveLimit(products).then(console.log).catch(console.log)
}).catch(console.log)
