const { updateProduct } = require("../../functions/products/updateProduct");

require("../../config/config").config("bf");

const prices = [

];

(async () => {
  for (const i of prices) {
    await updateProduct(i["Product ID"], { sale_price: i["Sale Price"] }).catch(
      (err) => {
        console.log(err)
        throw new Error(err);
      }
    );
    console.log(`updated ${i["Product ID"]}...`);
  }
  console.log("done");
})();
