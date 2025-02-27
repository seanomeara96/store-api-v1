import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 983;//640;
const ids = [{"Product ID":3057},
  {"Product ID":3068},
  {"Product ID":3069},
  {"Product ID":3539},
  {"Product ID":3541},
  {"Product ID":4083},
  {"Product ID":4086},
  {"Product ID":4148},
  {"Product ID":4500},
  {"Product ID":4501},
  {"Product ID":4502},
  {"Product ID":5182},
  {"Product ID":5235},
  {"Product ID":5236},
  {"Product ID":5237},
  {"Product ID":5238},
  {"Product ID":5239},
  {"Product ID":5240},
  {"Product ID":5241},
  {"Product ID":5246},
  {"Product ID":5260},
  {"Product ID":5311},
  {"Product ID":5612},
  {"Product ID":6253},
  {"Product ID":6257},
  {"Product ID":6258},
  {"Product ID":6260},
  {"Product ID":6263},
  {"Product ID":6269},
  {"Product ID":8307},
  {"Product ID":8308},
  {"Product ID":8309},
  {"Product ID":8959},
  {"Product ID":8972},
  {"Product ID":8990},
  {"Product ID":9002},
  {"Product ID":9010},
  {"Product ID":9049}];

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
