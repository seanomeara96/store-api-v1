require("../../config/config").config("ch");
import { deleteProduct } from "../../functions/products/deleteProduct";
deleteProduct(250).then((res) => console.log(res + "\n")).catch(console.log);

