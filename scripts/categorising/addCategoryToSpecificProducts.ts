import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const cat_id = 1204; //640;
const ids = [
  { id: 9439 },
  { id: 8860 },
  { id: 10153 },
  { id: 8861 },
  { id: 9435 },
  { id: 8098 },
  { id: 9441 },
  { id: 4588 },
  { id: 6422 },
  { id: 10166 },
  { id: 10170 },
  { id: 10167 },
  { id: 10137 },
  { id: 8096 },
  { id: 8089 },
  { id: 5805 },
  { id: 6476 },
  { id: 8093 },
  { id: 10154 },
  { id: 8506 },
  { id: 8095 },
  { id: 8087 },
  { id: 8088 },
  { id: 8507 },
  { id: 9696 },
  { id: 7027 },
  { id: 8094 },
  { id: 8097 },
  { id: 9171 },
  { id: 8090 },
  { id: 9172 },
  { id: 9463 },
  { id: 8606 },
  { id: 8092 },
  { id: 8091 },
  { id: 4508 },
  { id: 8099 },
  { id: 8206 },
  { id: 5810 },
  { id: 9440 },
  { id: 9443 },
  { id: 9519 },
  { id: 8663 },
  { id: 8765 },
  { id: 9437 },
  { id: 7129 },
  { id: 9436 },
  { id: 9438 },
  { id: 5825 },
  { id: 5032 },
  { id: 9660 },
  { id: 9659 },
  { id: 9655 },
  { id: 9483 },
  { id: 9484 },
  { id: 9487 },
  { id: 9488 },
  { id: 9462 },
  { id: 9491 },
  { id: 9701 },
  { id: 9516 },
  { id: 9459 },
  { id: 9460 },
  { id: 9831 },
  { id: 9828 },
  { id: 9829 },
  { id: 9830 },
  { id: 9518 },
  { id: 9552 },
  { id: 9551 },
  { id: 3168 },
  { id: 3169 },
  { id: 3296 },
];

const productIds = ids.map((row) => row.id);

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
