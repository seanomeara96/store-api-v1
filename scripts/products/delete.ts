require("../../config/config").config("bf");
import { deleteProduct } from "../../functions/products/deleteProduct";
deleteProduct(5181).then((res) => console.log(res + "\n")).catch(console.log);

