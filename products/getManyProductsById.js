const { getAllProducts } = require("./getAllProducts");

exports.getManyProductsById = (idArray) =>
  new Promise((resolve, reject) => {
    let promises = [];
    let products = [];
    idArray.forEach((id) => {
      promises.push(
        getAllProducts({
          id,
        })
          .then((product) => products.push(product[0]))
          .catch((err) => reject(err))
      );
    });
    Promise.allSettled(promises)
      .then(() => resolve(products))
      .catch((err) => console.log(err));
  });
// 3615