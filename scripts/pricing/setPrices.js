const { updateProduct } = require("../../functions/products/updateProduct");

require("../../config/config").config("bf");

const prices = [
  { "Product ID": 3404, "WOW Sale Price": 22 },
  { "Product ID": 5332, "WOW Sale Price": 26.99 },
  { "Product ID": 5253, "WOW Sale Price": 18.3 },
  { "Product ID": 1772, "WOW Sale Price": 39.99 },
  { "Product ID": 3156, "WOW Sale Price": 24.99 },
  { "Product ID": 3455, "WOW Sale Price": 54 },
  { "Product ID": 3451, "WOW Sale Price": 44 },
  { "Product ID": 222, "WOW Sale Price": 35.99 },
  { "Product ID": 5920, "WOW Sale Price": 34.95 },
  { "Product ID": 6334, "WOW Sale Price": 139 },
  { "Product ID": 5795, "WOW Sale Price": 69.99 },
  { "Product ID": 4312, "WOW Sale Price": 18.99 },
];

(async () => {
  for (const i of prices) {
    await updateProduct(i["Product ID"], {
      sale_price: i["WOW Sale Price"],
    }).catch((err) => {
      console.log(err);
      throw new Error(err);
    });
    console.log(`updated ${i["Product ID"]}...`);
  }
  console.log("done");
})();
