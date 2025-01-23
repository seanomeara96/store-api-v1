import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

const data = [
  "14788",
  "8785",
  "11644",
  "14035",
  "14038",
  "8776",
  "KER_4402020",
  "11648",
  "5048",
  "5053",
  "5057",
  "5052",
  "9764",
  "5011",
  "REDK_P027920",
  "14143",
  "12626",
  "13214",
  "11988",
  "11351",
  "11352",
  "13284",
  "13213"
]

async function main() {
  try {
    require("../../config/config").config("bf");
    for (let i = 3; i < data.length; i++) {
      console.log(i , data.length);
      const sku = data[i];
      const vars = await getAllProductVariants({ sku: sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${sku}. Expected ${expect}, received ${vars.length}.`;
      }
      await addCatToProduct(vars[0].product_id, 1109);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
