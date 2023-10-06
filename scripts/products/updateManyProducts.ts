import { getProductById } from "../../functions/products/getProductById";
import { updateProduct } from "../../functions/products/updateProduct";
(async () => {
  require("../../config/config").config("bf");

  const data = [
    { "Product ID": 3756 },
    { "Product ID": 3972 },
    { "Product ID": 3973 },
    { "Product ID": 4481 },
    { "Product ID": 4482 },
    { "Product ID": 4999 },
    { "Product ID": 5186 },
    { "Product ID": 5273 },
    { "Product ID": 5275 },
    { "Product ID": 5508 },
    { "Product ID": 5611 },
    { "Product ID": 5706 },
    { "Product ID": 5826 },
    { "Product ID": 5827 },
    { "Product ID": 5828 },
    { "Product ID": 5830 },
    { "Product ID": 5832 },
    { "Product ID": 5837 },
    { "Product ID": 5838 },
    { "Product ID": 6018 },
    { "Product ID": 6019 },
    { "Product ID": 6020 },
    { "Product ID": 6021 },
    { "Product ID": 6022 },
    { "Product ID": 6028 },
    { "Product ID": 6139 },
    { "Product ID": 6217 },
    { "Product ID": 6253 },
    { "Product ID": 6263 },
    { "Product ID": 6267 },
    { "Product ID": 6269 },
    { "Product ID": 6505 },
    { "Product ID": 6584 },
    { "Product ID": 6626 },
    { "Product ID": 6908 },
  ];

  try {
    for (let i = 0; i < data.length; i++) {
      const p = data[i]["Product ID"]
      const product = await getProductById(p)
      await updateProduct(p, {
        sale_price: product.price,
      });
      console.log(`Updated ${i + 1}/${data.length}`);
    }
  } catch (err) {
    console.log(err);
  }
})();
