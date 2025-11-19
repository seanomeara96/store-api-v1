import { updateProduct } from "../../functions/products/updateProduct";

async function executeUpdate() {
  require("../../config/config").config("bf");

  const data = [{ "Product ID": 6851 }];

  try {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      console.log(i, data.length);
      try {
        await updateProduct(p["Product ID"], {
          sale_price: 0,
        });
      } catch (err: any) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.status == 404
        ) {
          console.log(err.response.data.title);
          continue;
        }
        throw err;
      }
      await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });
    }
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
}

executeUpdate();
