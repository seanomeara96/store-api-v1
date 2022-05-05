fetch("https://www.beautyfeatures.ie/remote/v1/cart/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    action: "add",
    product_id: 5893,
    qty: 1,
  }),
})
  .then(async (res) => {
    console.log(res);
    return await res.text();
  })
  .then((res) => console.log(res))
  .catch(console.log);
