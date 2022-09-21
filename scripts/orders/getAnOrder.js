(async function () {
  require("../../config/config").config("ih", 2);

  const { getOrderById } = require("../../functions/orders/getOrderById");
  const orders = [];
  //glopal
  orders.push(await getOrderById(100143186).catch(console.log));

  // native - recieved
  orders.push(await getOrderById(100143188).catch(console.log));

  // native - shipped
  orders.push(await getOrderById(100143178).catch(console.log));

  for (const order of orders) {
    console.log(order.payment_method, order.payment_status, order.payment_provider_id);
  }
})();
