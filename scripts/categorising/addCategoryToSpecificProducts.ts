import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 640;
const ids = [{"Product ID":3084},
  {"Product ID":3085},
  {"Product ID":3086},
  {"Product ID":3938},
  {"Product ID":4698},
  {"Product ID":5317},
  {"Product ID":5319},
  {"Product ID":5320},
  {"Product ID":5322},
  {"Product ID":6825},
  {"Product ID":6826},
  {"Product ID":7177},
  {"Product ID":8056},
  {"Product ID":8355},
  {"Product ID":8356},
  {"Product ID":8357},
  {"Product ID":8358},
  {"Product ID":8427},
  {"Product ID":8428},
  {"Product ID":8429},
  {"Product ID":8437},
  {"Product ID":8438},
  {"Product ID":8439},
  {"Product ID":8440},
  {"Product ID":8441},
  {"Product ID":8442},
  {"Product ID":8814},
  {"Product ID":8815},
  {"Product ID":8816},
  {"Product ID":8817},
  {"Product ID":8818},
  {"Product ID":8819},
  {"Product ID":8820},
  {"Product ID":8821},
  {"Product ID":8828},
  {"Product ID":8829},
  {"Product ID":8830},
  {"Product ID":8831},
  {"Product ID":8832},
  {"Product ID":8833},
  {"Product ID":8834},
  {"Product ID":8835}];

const productIds = ids.map((i) => Object.values(i)[0]);

(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      try {
        await addCatToProduct(productIds[i], cat_id);
        console.log(`updated ${i + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 10000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
