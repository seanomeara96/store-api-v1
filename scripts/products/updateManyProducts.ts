import { updateProduct } from "../../functions/products/updateProduct";
(async () => {
  require("../../config/config").config("bf");

  const data = [
    { id: 3813, sale_price: 60 },
    { id: 5361, sale_price: 60 },
    { id: 3800, sale_price: 60 },
    { id: 3801, sale_price: 60 },
    { id: 6646, sale_price: 50 },
    { id: 6647, sale_price: 50 },
    { id: 6648, sale_price: 50 },
    { id: 4667, sale_price: 50 },
    { id: 5579, sale_price: 50 },
    { id: 6655, sale_price: 50 },
    { id: 6656, sale_price: 50 },
    { id: 6650, sale_price: 40 },
    { id: 6658, sale_price: 40 },
    { id: 6659, sale_price: 40 },
    { id: 6662, sale_price: 40 },
    { id: 6158, sale_price: 40 },
    { id: 6660, sale_price: 40 },
    { id: 6661, sale_price: 40 },
    { id: 6642, sale_price: 20 },
    { id: 6643, sale_price: 20 },
    { id: 6644, sale_price: 20 },
    { id: 3206, sale_price: 20 },
    { id: 3798, sale_price: 20 },
    { id: 6641, sale_price: 20 },
    { id: 6645, sale_price: 20 },
  ];

  try {
    for (let i = 0; i < data.length; i++) {
     const p = data[i]
      await updateProduct(p.id, {
        sale_price: p.sale_price,
      });
      console.log(`Updated ${i+1}/${data.length}`);
    }
  } catch (err) {
    console.log(err);
  }
})();
