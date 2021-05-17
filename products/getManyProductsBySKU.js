const { getAllProducts } = require("./getAllProducts");

exports.getManyProductsBySKU = (skuArray) =>
  new Promise((resolve, reject) => {
    let promises = [];
    let products = [];
    skuArray.forEach((SKU) => {
      promises.push(
        getAllProducts({
          sku: SKU[Object.keys(SKU)[0]],
        })
          .then((product) => products.push(product[0]))
          .catch((err) => reject(err))
      );
    });
    Promise.allSettled(promises)
      .then(() => resolve(products))
      .catch((err) => console.log(err));
  });
