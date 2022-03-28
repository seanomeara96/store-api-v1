require("./config/config").config("bf", 2);
const { getAllOrders } = require("./functions/orders/getAllOrders");
const { getOrderProducts } = require("./functions/orders/getOrderProducts");
const startDate = new Date(2022, 1, 15);
const endDate = new Date(2022, 2, 15);

const promiseReducer = (arr) =>
  new Promise((res, rej) => {
    arr.push(() => res());
    arr.reduce((a, c) => {
      return a.then(() => c());
    }, Promise.resolve());
  });

const batchPromises = (promiseArr, chunkSize = 440) => {
  return new Promise(async(resolve, reject) => {
    const responses = [];
    const batchPromises = [];
    for (let i = 0; i < promiseArr.length; i += chunkSize) {
      let temporary = promiseArr.slice(i, i + chunkSize);
      batchPromises.push(() => Promise.allSettled(temporary.map((fn,idx) => {
        console.log("map is called", idx);
        return fn();
      })).then((results) =>
      responses.push(results)
    ))
    }
    await promiseReducer(batchPromises);
    resolve(responses);
  });
};

getAllOrders({
  min_date_created: startDate.toISOString(),
  max_date_created: endDate.toISOString(),
})
  .then(async (orders) => {
    console.log(orders.length);
    const requests = orders.map(
      (order) => () =>
        getOrderProducts(order)
          .then((products) => (order.order_products = products))
          .catch(console.log)
    );
    await batchPromises(requests, 4400 / 5)
    console.log(orders);
    return;
    await promiseReducer(requests);

    console.log(orders);
  })
  .catch(console.log);
