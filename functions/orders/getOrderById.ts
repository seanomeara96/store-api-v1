import { Order } from "./Order";

/**
 * @param {number} order_id
 * @returns order json
 */
export function getOrderById(order_id: number):Promise<Order> {
  return new Promise(function (resolve, reject) {
    require("../../config/config")
      .store.get(`/orders/${order_id}`)
      .then((response: any) => resolve(response.data))
      .catch((ex: any) => reject(ex.response));
  });
}
