/**
 * @param {number} order_id
 * @returns order json
 */
export const getOrderById = (order_id: number) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/orders/${order_id}`)
      .then((response: any) => resolve(response.data))
      .catch((ex: any) => reject(ex.response))
  );
