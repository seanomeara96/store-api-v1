require("../../config/config").config("ch");
import { deleteProduct } from "../../functions/products/deleteProduct";
async function executeDeleteProduct() {
  try {
    const res = await deleteProduct(250);
    console.log(res + "\n");
  } catch (err) {
    console.log(err);
  }
}
executeDeleteProduct();
