/**
 * gets the products in an order
 * requires v2
 * @param {number} orderId
 * @param {string} resource
 * @returns
 */
export const getOrderProducts = (order:any) =>
  new Promise((resolve, reject) => {
    const orderId = order.id;
    const { resource } = order.products;
    console.log("requesting products from order:", orderId);
    if (typeof orderId !== "number") {
      console.log("typeof orderId", typeof orderId);
      return reject("order id must be a number");
    }
    if (typeof resource !== "string") {
      console.log("typeof resource", typeof resource);
      return reject("resource must be a path string");
    }
    require("../../config/config")
      .store.get(resource)
      .then((e:any) => {
        console.log("success");
        resolve(e.data);
      })
      .catch(reject);
  });

