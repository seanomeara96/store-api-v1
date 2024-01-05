import { getOrderById } from "../../functions/orders/getOrderById";
require("../../config/config").config("ih", 2);

const orderNumbers: number[] = [100143186, 100143188, 100143178];
const orders = [];
(async function () {
  try {
    for (const order of orderNumbers) {
      // native - shipped
      orders.push(await getOrderById(order));
    }

    for (const order of orders) {
      console.log(
        order.payment_method,
        order.payment_status,
        order.payment_provider_id
      );
    }
  } catch (err) {
    console.log(err);
  }
})();
