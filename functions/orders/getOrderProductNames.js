const { getOrderProducts } = require("./getOrderProducts");
const getOrderProductNames = (orderId, resource) =>
  new Promise((resolve, reject) => {
    getOrderProducts(orderId, resource)
      .then((e) => resolve(e.map(({ name }) => name)))
      .catch(reject);
  });
exports.getOrderProductNames = getOrderProductNames;
