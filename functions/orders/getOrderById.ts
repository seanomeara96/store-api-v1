import { Order } from "./Order";

/**
 * @param {number} order_id
 * @returns order json
 */
export async function getOrderById(order_id: number): Promise<Order> {
  try {
    const response = await require("../../config/config").store.get(
      `/orders/${order_id}`,
    );
    return response.data;
  } catch (ex: any) {
    throw ex.response;
  }
}
