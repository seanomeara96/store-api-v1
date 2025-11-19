import { getOrderById } from "../../functions/orders/getOrderById";
import { Order } from "../../functions/orders/Order";
require("../../config/config").config("bf", 2);
// 9376405
const orderNumbers: number[] = [9376402];
const orders: Order[] = [];

async function fetchOrders() {
  try {
    for (const order of orderNumbers) {
      // native - shipped
      orders.push(await getOrderById(order));
    }

    for (const order of orders) {
      console.log({
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        payment_provider_id: order.payment_provider_id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

fetchOrders();
