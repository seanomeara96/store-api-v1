import { deleteProduct } from "./functions/products/deleteProduct";
import { getProductIdFromSku } from "./functions/products/getProductIdFromSku";

require("./config/config").config("pb")

async function test() {
  const skus = [
    "12228",
    "12232",
    "12235",
    "12236",
    "12237",
    "12238",
    "12239",
    "12240",
    "12241",
    "12242",
    "12243",
    "12342",
    "12356",
    "12357",
    "12358",
    "12359",
    "12367",
    "12368",
    "12371",
    "12826",
    "12903",
    "11912",
  ];


  for (const sku of skus) {
    try {
      const id = await getProductIdFromSku(sku)
      await deleteProduct(id);
      console.log(`deleted ${sku}`);
    } catch (err) {
      console.log(err);
    }
  }
}
test();
