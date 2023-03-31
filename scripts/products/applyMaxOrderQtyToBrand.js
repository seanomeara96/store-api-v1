const {
  getProductsByBrand,
} = require("../../functions/products/getProductsByBrand");
const { updateProduct } = require("../../functions/products/updateProduct");

const applyMaxOrderQty = (product_id, qty) =>
  new Promise((resolve, reject) =>
    updateProduct(product_id, { order_quantity_maximum: qty })
      .then(resolve)
      .catch(reject)
  );

const applyMaxLimit = (products, limit) =>
  new Promise((resolve, reject) => {
    const qualifiers = products.filter(function isOrderQtyLessThan5 (product) {
      return product.order_quantity_maximum < limit;
    });
    Promise.allSettled(qualifiers.map(({ id }) => applyMaxOrderQty(id, limit)))
      .then(resolve)
      .catch(reject);
  });

function notifyFulfillmentStatus(res) {
  /**
   *
   * @param {{status: "fulfilled" | "rejected";}[]} allSettledResult
   * @returns {number}
   */
  function countFulfilled(allSettledResult) {
    /**
     *
     * @param {number} a
     * @param {{status: "fulfilled" | "rejected";}} c
     * @returns
     */
    function countIfFulfilled(a, c) {
      return c.status === "fulfilled" ? a + 1 : a;
    }
    return allSettledResult.reduce(countIfFulfilled, 0);
  }

  console.log(`${countFulfilled(res)}/${res.length} fulfilled`);
}

// add max 5 limit to products
function applyMaxOderQtyToBrand(store, brandName, limit) {
  return new Promise(function (resolve, reject) {
    require("../../config/config").config(store);
    getProductsByBrand(brandName)
      .then((products) => {
        applyMaxLimit(products, limit)
          .then(notifyFulfillmentStatus)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

const storeDetails = [
  {
    store: "bf",
    brand: "The Ordinary",
  }
];

const promises = storeDetails.map(function (dt) {
  return () => applyMaxOderQtyToBrand(dt.store, dt.brand, 10);
});

promises.reduce(function promiseReducer(a, c) {
  return a.then(c);
}, Promise.resolve());
